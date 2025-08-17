---
authors:
- eallion
categories:
- 代码
date: 2024-04-30 06:36:07
draft: false
slug: blog-heatmap
summary: 通过纯 CSS 和 JS 实现博客热力图，适配移动端并动态生成年度日历小方块，根据文章字数显示不同色深的色块，支持 Tooltip 展示文章标题、日期和字数统计，采用
  GitHub 风格的配色方案并兼容深色模式！
tags:
- code
- github
- heatmap
- contributions
title: CSS 和 JS 实现博客热力图
---

![](/assets/images/posts/2024/04/30heatmap_screenshot.png "效果截图")

> 查看实时效果： 👉[统计页](https://www.eallion.com/stats)

### TL;DR

太长不看，直接看代码 👇

1. [引入 style.css](#style)
2. [创建 HTML 容器](#html)
3. [引入 heatmap.js](#heatmapjs)

### 前言

五六年前就在 Typecho 上折腾过热力图，以前用 jQuery 折腾挺方便的。
但期间有些博客主题中没有合适的地方放热力图，就放弃了。
最近博客热力图又有热度了，刚好我这个主题可以放在首页，又折腾上了。
期间尝试了几个版本，网上也有非常多类似的库：

- [ECharts.js](https://echarts.apache.org/examples/zh/editor.html?c=calendar-heatmap)
- [Heat.js](https://github.com/williamtroup/Heat.js) （没上线就放弃了）
- [contributions-calendar](https://github.com/bohdaq/contributions-calendar)
- [d3.js](https://github.com/d3/d3) + [Cal-Heatmap.js](https://cal-heatmap.com/docs/showcase#github-profile-contribution-like)

优缺点：

- ECharts.js 不方便控制细节，不方便适配移动端，资源文件比较大；
- Heat.js 在测试的时候发现了 Cal-Heatmap.js 了；
- Cal-Heatmap.js 是专门做热力图的，但需要引用多个库和插件。

从 Koobai 大佬发布《[HUGO 折腾随记之热力图 / 段落导航](https://koobai.com/hugo_suiji/)》时，我就说要折腾一个纯 CSS 版的热力图，一直推迟到今天才完成。期间折腾 [Twitter Year Progress](https://twitter.com/year_progress) 时，完成了绘制年度日历小方块，直接用上了。

### 一、JS 构建热力图

#### 1. 准备博客数据

在 Hugo 构建时，获取最近一年的文章数据：

```js
// 获取最近一年的文章数据
{{ $pages := where .Site.RegularPages "Date" ">" (now.AddDate -1 0 0) }}
{{ $pages := $pages.Reverse }}
    var blogInfo = {
        "pages": [
            {{ range $index, $element := $pages }}
                {
                    "title": "{{ replace (replace .Title "《" "〈") "》" "〉" }}",
                    "date": "{{ .Date.Format "2006-01-02" }}",
                    "year": "{{ .Date.Format "2006" }}",
                    "month": "{{ .Date.Format "01" }}",
                    "day": "{{ .Date.Format "02" }}",
                    "word_count": "{{ .WordCount }}"
                }{{ if ne (add $index 1) (len $pages) }},{{ end }}
                {{ end }}
        ]
};
// console.log(blogInfo)
```

这段 JS 会获取到如下示例数据，并存入 `blogInfo` 中，如果需要 `slug`、`summary` 或其他数据，按上面的代码依样画葫芦：

```json
{
    "pages": [
        {
            "title": "CSS 和 JS 实现博客热力图",
            "date": "2024-04-30",
            "year": "2024",
            "month": "04",
            "day": "30",
            "word_count": "685"
        }
    ]
}
```

#### 2. 渲染月份

`let monthNames = ['Jan', 'Feb', 'Mar']` 中显示的月份数可以自定义。适配了移动端，常规移动设备显示 6 个月的数据，对于过小的设备，如：iPhone SE / Pixel 4 只显示 5 个月的数据。

```js
let currentDate = new Date();
currentDate.setFullYear(currentDate.getFullYear() - 1);

let startDate;

let monthDiv = document.querySelector('.month');
let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

if (window.innerWidth <= 375 ) { // iPhone SE
    numMonths = 5;
} else if (window.innerWidth < 768 ) { // iPad Mini
    numMonths = 6;
} else {
    numMonths = 12;
}

let startMonthIndex = (currentDate.getMonth() - (numMonths - 1) + 12) % 12;
for (let i = startMonthIndex; i < startMonthIndex + numMonths; i++) {
    let monthSpan = document.createElement('span');
    let monthIndex = i % 12;
    monthSpan.textContent = monthNames[monthIndex];
    monthDiv.appendChild(monthSpan);
}
```

动态生成的月份显示在 `<div class="month">` 中，所以不管是 TailwindCSS 还是传统 CSS，`month` 这个 class 不能去掉。

```html
<div class="month heatmap_month"> <!-- 👈 必须要有 [month] -->
    <span>Nov</span>
    <span>Dec</span>
    <span>Jan</span>
    <span>Feb</span>
    <span>Mar</span>
    <span>Apr</span>
</div>
```

#### 3. startDate 之：起始日期从星期一开始渲染

如果单纯地从今天往前渲染 52 个周（一年）的小方块，很简单。不过这样渲染的数据有一个不符合常识的问题，即一年前的今天，并不一定是 `星期一`，所以在选择热力图的开始日期的时候，需要考虑以 `去年今天` 所在星期的 `星期一` 作为起始点。

```js
function getWeekDay(date) {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
}
```

#### 4. endDate 之：如果结束日期 `今天` 超出日历范围

结合第 3 点，如果 `今天` 的星期数比 `去年今天` 的星期数小，则会导致渲染 52 个周（一年）的小方块之后，`今天`及`今天之后的本周`内容渲染不了了，所以需要判断今天的星期数，并追加到年度日历小方块中。

```js
const startDate = getStartDate();
const endDate = new Date();
const weekDay = getWeekDay(startDate);

let currentWeek = createWeek();
container.appendChild(currentWeek);

let currentDate = startDate;
let i = 0;

while (currentDate <= endDate) {
    if (i % 7 === 0 && i !== 0) {
        currentWeek = createWeek();
        container.appendChild(currentWeek);
    }
    i++;
    currentDate.setDate(currentDate.getDate() + 1);
}
```

#### 5. 渲染小方块及 Tooltip

每个小方块以 `count` 字数显示不同色深的色块，即 CSS `heatmap_day_level_num` 的样式，`count` 按 `1-1000` `1000-2000` `2000-3000` `3000+` 分为 4 个 level 截断。

我的博客中还渲染了 `count` `post` `title` `date` 4 数据用于 Tooltip。

- `count` data-count 当天文章字数，多篇文章会合并计算
- `post` data-post 当天文章数量
- `title` data-title 当天文章的标题
- `date` data-date 当天的日期 `Jan 2, 2006` en-US 格式

当鼠标经过小方块时，以 `data-title=""` `data-count=""` `data-post=""` `data-date=""` 几个属性的值创建一个当日的 `<div class="tooltip">` 标签。

```js
function createDay(date, title, count, post) {
    const day = document.createElement("div");

    day.className = "heatmap_day";

    day.setAttribute("data-title", title);
    day.setAttribute("data-count", count);
    day.setAttribute("data-post", post);
    day.setAttribute("data-date", date);

    day.addEventListener("mouseenter", function () {
        const tooltip = document.createElement("div");
        tooltip.className = "heatmap_tooltip";

        let tooltipContent = "";

        if (post && parseInt(post, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_post">' + '共 ' + post + ' 篇' + '</span>';
        }

        if (count && parseInt(count, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_count">' + ' ' + count + ' 字；' + '</span>';
        }

        if (title && parseInt(title, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_title">' + title + '</span>';
        }

        if (date) {
            tooltipContent += '<span class="heatmap_tooltip_date">' + date + '</span>';
        }

        tooltip.innerHTML = tooltipContent;
        day.appendChild(tooltip);
    });

    day.addEventListener("mouseleave", function () {
        const tooltip = day.querySelector(".heatmap_tooltip");
        if (tooltip) {
            day.removeChild(tooltip);
        }
    });

    if (count == 0) {
        day.classList.add("heatmap_day_level_0");
    } else if (count > 0 && count < 1000) {
        day.classList.add("heatmap_day_level_1");
    } else if (count >= 1000 && count < 2000) {
        day.classList.add("heatmap_day_level_2");
    } else if (count >= 2000 && count < 3000) {
        day.classList.add("heatmap_day_level_3");
    } else {
        day.classList.add("heatmap_day_level_4");
    }

    return day;
}
```

### 二、完整的 heatmap.js {#heatmapjs}

前面的分解是只一些需要注意的细节，下面是完整的 JS：

```js
// 获取最近一年的文章数据
{{ $pages := where .Site.RegularPages "Date" ">" (now.AddDate -1 0 0) }}
{{ $pages := $pages.Reverse }}
var blogInfo = {
    "pages": [
        {{ range $index, $element := $pages }}
            {
                "title": "{{ replace (replace .Title "《" "〈") "》" "〉" }}",
                "date": "{{ .Date.Format "2006-01-02" }}",
                "year": "{{ .Date.Format "2006" }}",
                "month": "{{ .Date.Format "01" }}",
                "day": "{{ .Date.Format "02" }}",
                "word_count": "{{ .WordCount }}"
            }{{ if ne (add $index 1) (len $pages) }},{{ end }}
            {{ end }}
    ]
};
// console.log(blogInfo)

let currentDate = new Date();
currentDate.setFullYear(currentDate.getFullYear() - 1);

let startDate;

let monthDiv = document.querySelector('.month');
let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

if (window.innerWidth < 768) {
    numMonths = 6;
} else {
    numMonths = 12;
}

let startMonthIndex = (currentDate.getMonth() - (numMonths - 1) + 12) % 12;
for (let i = startMonthIndex; i < startMonthIndex + numMonths; i++) {
    let monthSpan = document.createElement('span');
    let monthIndex = i % 12;
    monthSpan.textContent = monthNames[monthIndex];
    monthDiv.appendChild(monthSpan);
}

function getStartDate() {
    const today = new Date();

    if (window.innerWidth < 768) {
        numMonths = 6;
    } else {
        numMonths = 12;
    }

    const startDate = new Date(today.getFullYear(), today.getMonth() - numMonths + 1, 1, today.getHours(), today.getMinutes(), today.getSeconds());

    while (startDate.getDay() !== 1) {
        startDate.setDate(startDate.getDate() + 1);
    }

    return startDate;
}

function getWeekDay(date) {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
}

function createDay(date, title, count, post) {
    const day = document.createElement("div");

    day.className = "heatmap_day";

    day.setAttribute("data-title", title);
    day.setAttribute("data-count", count);
    day.setAttribute("data-post", post);
    day.setAttribute("data-date", date);

    day.addEventListener("mouseenter", function () {
        const tooltip = document.createElement("div");
        tooltip.className = "heatmap_tooltip";

        let tooltipContent = "";

        if (post && parseInt(post, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_post">' + '共 ' + post + ' 篇' + '</span>';
        }

        if (count && parseInt(count, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_count">' + ' ' + count + ' 字；' + '</span>';
        }

        if (title && parseInt(title, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_title">《' + title + '》</span>';
        }

        if (date) {
            tooltipContent += '<span class="heatmap_tooltip_date">' + date + '</span>';
        }

        tooltip.innerHTML = tooltipContent;
        day.appendChild(tooltip);
    });

    day.addEventListener("mouseleave", function () {
        const tooltip = day.querySelector(".heatmap_tooltip");
        if (tooltip) {
            day.removeChild(tooltip);
        }
    });

    if (count == 0 ) {
        day.classList.add("heatmap_day_level_0");
    } else if (count > 0 && count < 1000) {
        day.classList.add("heatmap_day_level_1");
    } else if (count >= 1000 && count < 2000) {
        day.classList.add("heatmap_day_level_2");
    } else if (count >= 2000 && count < 3000) {
        day.classList.add("heatmap_day_level_3");
    } else {
        day.classList.add("heatmap_day_level_4");
    }

    return day;
}

function createWeek() {
    const week = document.createElement('div');
    week.className = 'heatmap_week';
    return week;
}

function createHeatmap() {
    const container = document.getElementById('heatmap');
    const startDate = getStartDate();
    const endDate = new Date();
    const weekDay = getWeekDay(startDate);

    let currentWeek = createWeek();
    container.appendChild(currentWeek);

    let currentDate = startDate;
    let i = 0;

    while (currentDate <= endDate) {
        if (i % 7 === 0 && i !== 0) {
            currentWeek = createWeek();
            container.appendChild(currentWeek);
        }

        const dateString = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth()+1)).slice(-2)}-${("0" + (currentDate.getDate())).slice(-2)}`;

        const articleDataList = blogInfo.pages.filter(page => page.date === dateString);

        if (articleDataList.length > 0) {
            const titles = articleDataList.map(data => data.title);
            const title = titles.map(t => `${t}`).join('<br />');

            let count = 0;
            let post = articleDataList.length;

            articleDataList.forEach(data => {
                count += parseInt(data.word_count, 10);
            });

            const formattedDate = formatDate(currentDate);
            const day = createDay(formattedDate, title, count, post);
            currentWeek.appendChild(day);
        } else {
            const formattedDate = formatDate(currentDate);
            const day = createDay(formattedDate, '', '0', '0');
            currentWeek.appendChild(day);
        }

        i++;
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

createHeatmap();
```

### 三、HTML DIV 容器 {#html}

准备 HTML 容器，用于渲染 Heatmap，我博客用的是 TailwindCSS，为了写文章，已转成传统 CSS 样式，相当于用 CSS 重新实现了一遍。
全部使用 Flex 排版，为了适配移动端，用 JS 检测屏幕宽度动态生成月份和年度日历小方块。做了 2 个截断，一是个 iPhone SE 的 375 宽度和 iPad Mini 的 768 宽度，宽度截断在后面的 JS 中可以看到。

```html
<div class="heatmap_container"> <!-- 全部用 Flex 排版 -->
    <div class="heatmap_content">
        <div class="heatmap_week">
            <span>Mon</span>
            <span>&nbsp;</span> <!-- 不需要显示的星期用空格表示 -->
            <span>Wed</span>
            <span>&nbsp;</span>
            <span>Fri</span>
            <span>&nbsp;</span>
            <span>Sun</span>
        </div>
        <div class="heatmap_main">
            <div class="month heatmap_month">
                <!-- js 检测屏幕宽度动态生成月份 -->
            </div>
            <div id="heatmap" class="heatmap">
                <!-- js 检测屏幕宽度动态生成年度日历小方块 -->
            </div>
        </div>
    </div>
    <div class="heatmap_footer">
        <div class="heatmap_less">Less</div>
        <div class="heatmap_level">
            <span class="heatmap_level_item heatmap_level_0"></span>
            <span class="heatmap_level_item heatmap_level_1"></span>
            <span class="heatmap_level_item heatmap_level_2"></span>
            <span class="heatmap_level_item heatmap_level_3"></span>
            <span class="heatmap_level_item heatmap_level_4"></span>
        </div>
        <div class="heatmap_more">More</div>
    </div>
</div>
```

### 四、传统 style.css {#style}

CSS 样式仿照的是 GitHub 的配色，Dark mode 是 GitHub Dimmed 的配色。

```css
:root {
    /* GitHub Light Color */
    --ht-main: #334155;
    --ht-day-bg: #ebedf0;
    --ht-tooltip: #24292f;
    --ht-tooltip-bg: #fff;
    --ht-lv-0: #ebedf0;
    --ht-lv-1: #9be9a8;
    --ht-lv-2: #40c463;
    --ht-lv-3: #30a14e;
    --ht-lv-4: #216e39;
}

[data-theme="dark"] {
    /* GitHub Dark Dimmed Color */
    --ht-main: #94a3b8;
    --ht-day-bg: #161b22;
    --ht-tooltip: #24292f;
    --ht-tooltip-bg: #fff;
    --ht-lv-0: #161b22;
    --ht-lv-1: #0e4429;
    --ht-lv-2: #006d32;
    --ht-lv-3: #26a641;
    --ht-lv-4: #39d353;
}

.heatmap_container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 10px;
    line-height: 12px;
    color: var(--ht-main);
}

.heatmap_content {
    display: flex;
    flex-direction: row;
    align-items: flex-end
}

.heatmap_week {
    display: flex;
    margin-top: 0.25rem;
    margin-right: 0.25rem;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right
}

.heatmap_main {
    display: flex;
    flex-direction: column
}

.heatmap_month {
    display: flex;
    margin-top: 0.25rem;
    margin-right: 0.25rem;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    text-align: right;
}

.heatmap {
    display: flex;
    flex-direction: row;
    height: 84px;
}

.heatmap_footer {
    display: flex;
    margin-top: 0.5rem;
    align-items: center
}

.heatmap_level {
    display: flex;
    gap: 2px;
    margin: 0 0.25rem;
    flex-direction: row;
    align-items: center;
    width: max-content;
    height: 10px
}

.heatmap_level_item {
    display: block;
    border-radius: 0.125rem;
    width: 10px;
    height: 10px;
}

.heatmap_level_0 {
    background: var(--ht-lv-0);
}

.heatmap_level_1 {
    background: var(--ht-lv-1);
}

.heatmap_level_2 {
    background: var(--ht-lv-2);
}

.heatmap_level_3 {
    background: var(--ht-lv-3);
}

.heatmap_level_4 {
    background: var(--ht-lv-4);
}

.heatmap_week {
    display: flex;
    flex-direction: column;
}

.heatmap_day {
    width: 10px;
    height: 10px;
    background-color: var(--ht-day-bg);
    margin: 1px;
    border-radius: 2px;
    display: inline-block;
    position: relative;
}

.heatmap_tooltip {
    position: absolute;
    bottom: 12px;
    left: 50%;
    width: max-content;
    color: var(--ht-tooltip);
    background-color: var(--ht-tooltip-bg);
    font-size: 12px;
    line-height: 16px;
    padding: 8px;
    border-radius: 3px;
    white-space: pre-wrap;
    opacity: 1;
    transition: 0.3s;
    z-index: 1000;
    text-align: right;
    transform: translateX(-50%);
}

.heatmap_tooltip_count,
.heatmap_tooltip_post {
    display: inline-block;
}

.heatmap_tooltip_title,
.heatmap_tooltip_date {
    display: block;
}

.heatmap_tooltip_date {
    margin: 0 0.25rem;
}

.heatmap_day_level_0 {
    background-color: var(--ht-lv-0);
}

.heatmap_day_level_1 {
    background-color: var(--ht-lv-1);
}

.heatmap_day_level_2 {
    background-color: var(--ht-lv-2);
}

.heatmap_day_level_3 {
    background-color: var(--ht-lv-3);
}

.heatmap_day_level_4 {
    background-color: var(--ht-lv-4);
}
```

### 五、TailwindCSS 样式

```html
<div class="flex flex-col items-end text-[10px] leading-[12px] text-neutral-700 dark:text-neutral-400">
    <div class="flex flex-row items-end">
        <div class="flex flex-col justify-end items-end mr-1 mt-1 text-right">
            <span>Mon</span>
            <span>&nbsp;</span>
            <span>Wed</span>
            <span>&nbsp;</span>
            <span>Fri</span>
            <span>&nbsp;</span>
            <span>Sun</span>
        </div>
        <div class="heatmap flex flex-col">
            <div class="month mb-1 flex justify-around">
            </div>
            <div class="h-[84px]">
                <div id="heatmap" class="flex flex-row"></div>
            </div>
        </div>
    </div>
    <div class="flex mt-2 items-center">
        <span class="">Less</span>
        <div class="flex flex-row items-center gap-[2px] w-max h-[10px] mx-1">
            <span class="block w-[10px] h-[10px] rounded-sm bg-[#ebedf0] dark:bg-[#161b22]"></span>
            <span class="block w-[10px] h-[10px] rounded-sm bg-[#9be9a8] dark:bg-[#0e4429]"></span>
            <span class="block w-[10px] h-[10px] rounded-sm bg-[#40c463] dark:bg-[#006d32]"></span>
            <span class="block w-[10px] h-[10px] rounded-sm bg-[#30a14e] dark:bg-[#26a641]"></span>
            <span class="block w-[10px] h-[10px] rounded-sm bg-[#216e39] dark:bg-[#39d353]"></span>
        </div>
        <span class="">More</span>
    </div>
</div>
```
