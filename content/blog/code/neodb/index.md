---
authors:
- eallion
categories:
- 代码
date: 2023-07-11 15:27:23
draft: false
series:
- NeoDB
seriesNavigation: true
series_weight: 1
slug: neodb
summary: 将豆瓣观影数据迁移至 NeoDB 并静态化部署，通过 API 获取数据后本地存储为 JSON 文件，利用 Hugo 生成静态页面，结合自定义 CSS
  和 JS 实现排序功能，并通过 GitHub Actions 自动化更新数据。SaaS 服务不可靠，自建方案更可控！
tags:
- hugo
- blog
- neodb
- movie
title: NeoDB API 创建观影页面
---
### 前言

几个月之前在 [长毛象联邦宇宙](https://mastodon.social/@eallion/110383954479048514) 里问过 NeoDB 官方有没有 API，得到肯定回答后，我就着手计划把观影页面的 API 搬到 NeoDB 了。前几天豆瓣的图片挂掉之后，加快了这一进程。
感谢豆瓣以前提供的无偿服务。不过这也印证了 [SaaS 服务不可信](https://memos.eallion.com/m/5733) 的观点。

有很多吐槽，但是算了，直接开始写备忘录。
我没有使用通过 API 获取动态数据的方式，而是把数据都下载到本地。静态化后性能会更好。

### 1. 注册 NeoDB 账号

注册 NeoDB 账号前，需要注册一个 Mastodon 长毛象宇宙的账号，有很多实例可以注册。然后用 Mastodon 账号就可以登录 NeoDB 了。最新的 NeoDB 似乎已经可以绑定邮箱登录了。
注册 Mastodon 和 NeoDB 这些都是小事情，暂时略过，默认任何人都会了。
比如我就注册在 [mastodon.social](https://mastodon.social/@eallion) ，我以前还自建过 Mastodon，不过没必要。

### 2. 生成 NeoDB 的 Token

参考：《[NeoDB 获取 Access Token](https://eallion.com/neodb_token)》一文。

### 3. 标记影音

3.1 在 [NeoDB](https://neodb.social/) 标记：

- https://neodb.social/discover/

3.2 在 NeoDB [数据](https://neodb.social/account/data) 设置里导入其他平台标记的数据：

- https://neodb.social/account/data

### 4. 下载 NeoDB 数据

因为 NeoDB 限制分页，需要按页数下载，不能一次下载所有数据。
就写了个 Shell Script 脚本下载：

注意替换 `QuhZZpr8bE711111111111X2OPaSRKU` 即 `Access Token` 。

```bash
#! /bin/sh

curl -X 'GET' 'https://neodb.social/api/me/shelf/complete?category=movie&page=1' \
    -H 'accept: application/json' \
    -H 'Authorization: Bearer QuhZZpr8bE711111111111X2OPaSRKU' > movie1.json

curl -X 'GET' 'https://neodb.social/api/me/shelf/complete?category=tv&page=1' \
    -H 'accept: application/json' \
    -H 'Authorization: Bearer QuhZZpr8bE711111111111X2OPaSRKU' > tv1.json

pages=$(jq '.pages' movie1.json)
tv_pages=$(jq '.pages' tv1.json)

# 下载 Movie 分类
# 循环下载文件，因为 page 1 已经下载过了，从 2 开始
for ((i=2; i<=$pages; i++)); do
  url="https://neodb.social/api/me/shelf/complete?category=movie&page=$i"
  filename="movie$i.json"

# 下载文件并保存为对应的文件名
curl -X 'GET' "$url" \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer QuhZZpr8bE711111111111X2OPaSRKU' > "$filename"
done

# 下载 TV 分类
for ((i=2; i<=$tv_pages; i++)); do
    tv_url="https://neodb.social/api/me/shelf/complete?category=tv&page=$i"
    tv_filename="tv$i.json"

curl -X 'GET' "$tv_url" \
    -H 'accept: application/json' \
    -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > "$tv_filename"
done

# 把所有数据合并成一个文件
jq -c -s '{data: map(.data[]) | unique | sort_by(.created_time) | reverse, pages: map(.pages)[0], count: map(.count)[0]}' *.json > movie.json
```

然后就会得到一个包含所有标记数据的文件——`movie.json` 。

把 `movie.json` 文件复制到目录 `data/neodb/movie.json` 。

![](/assets/images/posts/2023/07/movie_json.png)

### 5. 新建 movie.html 模板

在 Hugo 根目录或者主题目录 `layouts/_default` 新建一个 <i class="fab fa-github fa-fw"></i>[movie.html](https://github.com/eallion/eallion.com/blob/9c7fdeb341056e8ae0f3822f3d5077a946711a3b/layouts/_default/movie.html) 模板。
如果不知道模板长什么样，可以复制正在使用的主题下其他 Page 在用的模板，然后改下名字。
核心代码：

```html
<!-- 其他代码 -->

<!-- 引入 Style 。注意路径，放在 static 目录-->
<link rel="stylesheet" href="/movie.css">

<!-- 获取本地 Json 数据 -->
{{ $movies := getJSON "data/neodb/movie.json" }}

<div class="yourContent">

    <div class="sort-by-items">
        <a href="javascript:void 0;" class="sort-by-item active" data-order="time"><i
                class="fas fa-sort-amount-down"></i> 观影时间排序</a>
        <a href="javascript:void 0;" class="sort-by-item" data-order="rating"><i
                class="fas fa-sort-numeric-down-alt"></i> 评分排序</a>
        <a href="javascript:void 0;" class="sort-by-item" data-order="count"><i class="fas fa-sort-alpha-down-alt"></i>
            评分人数排序</a>
    </div>

        <div class="movie">

            {{ range $movies.data }}
            {{ $title := .item.display_title }}
            {{ $rating := .item.rating }}
            {{ $movie_url := .item.url }}
            {{ $cover := .item.cover_image_url }}
            {{ $cover_name := path.Base $cover }}
            {{ $cate_movie := "movie" }}
            {{ $cate_tv := "tv" }}

            <div class="movies sorting" data-marked="{{ .created_time }}" data-year='{{  dateFormat "2006-01-02 15:04:05" .created_time }}' data-star="{{ .rating_grade }}" data-rating="{{ .item.rating }}" data-count="{{ .item.rating_count }}">
                    <div class="cover">
                        <div class="cover__container">
                            {{ range .item.external_resources }}
                                {{ if (in .url "douban") }}
                                    <a href="{{ .url }}" target="_blank" rel="noreferrer noopener nofollow"><img alt="{{ $title }}" class="lazy" loading="lazy" data-src="/assets/images/posts/neodb/{{ $cover_name }}"></a>
                                {{ end }}
                            {{ end }}
                        </div>
                    </div>
                    <div class="title">
                        {{ $hasDouban := false }}
                        {{ range .item.external_resources }}
                            {{ if (in .url "douban") }}
                                {{ $hasDouban = true }}
                                <a href="{{ .url }}" target="_blank" rel="noreferrer noopener nofollow">
                                    {{ $title }}
                                </a>
                                {{ end }}
                            {{ end }}

                            {{ if not $hasDouban }}
                                <a href="https://neodb.social{{ $movie_url }}" target="_blank" rel="noreferrer noopener nofollow">
                                    {{ $title }}
                                </a>
                            {{ end }}

                    </div>
                    <div class="rating">

                        {{ range $star := (seq 0 2 8) }}
                        {{ if gt $rating $star }}
                        <span class="rating_star">
                            <svg viewBox="0 0 24 24" width="24" height="24" class="stars">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path fill="currentColor" d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z">
                                </path>
                            </svg>
                        </span>
                        {{ else }}
                        <span class="rating_star">
                            <svg viewBox="0 0 24 24" width="24" height="24" class="stars white">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path fill="currentcolor" d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"></path>
                            </svg>
                        </span>
                        {{ end }}
                        <span class="rating_star">{{ $rating }}</span>
                    <div class="rating_count hidden">
                        <span>
                            <svg viewBox="0 0 24 24" width="24" height="24" class="stars">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path fill="currentColor" d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z">
                                </path>
                            </svg>
                        </span>
                        <span><a href="https://neodb.social{{ $movie_url }}" target="_blank" rel="noreferrer noopener nofollow">{{ .item.rating_count }} {{ T `movie_count_text` }}</a></span>
                    </div>
                    <div class="referrer">
                        {{ if eq .item.category $cate_movie }}
                        <i class="fas fa-film fa-fw"></i>
                        {{ else if eq .item.category $cate_tv }}
                        <i class="fas fa-tv fa-xs"></i>
                        {{ end }}
                        <span class="neodb">
                            <a href="https://neodb.social{{ $movie_url }}" target="_blank" rel="noreferrer noopener nofollow">
                                <img src="/assets/images/movie/neodbsocial.jpg" loading="lazy" alt="NeoDB">
                            </a>
                        </span>

                        {{ range .item.external_resources }}
                            {{ $parsedURL := urls.Parse .url }}
                            {{ $host := $parsedURL.Hostname }}
                            {{ $title := .title }}
                                <span class="external-resource">
                                    <a href="{{ .url }}" target="_blank" rel="noreferrer noopener nofollow">
                                        <img src="/assets/images/movie/{{ $host }}.png" loading="lazy" alt="{{ $title }}">
                                    </a>
                                </span>
                        {{ end }}

                        <!-- <span class="rottentomatoes">
                            <a href="http://www.google.com/search?hl=en&q={{ $title }}+rotten+tomatoes&btnI=I" target="_blank" rel="noreferrer noopener nofollow">
                                <img src="/assets/images/movie/www.rottentomatoes.com.png" loading="lazy" alt="NeoDB">
                            </a>
                        </span> -->
                    </div>
            </div>
            {{ end }}

        </div>

    </div>
</article>

<script type="text/javascript" src="/assets/lazyload.iife.min.js?v=17.8.3"></script>
<script type="text/javascript" src="/assets/movie.min.js?v=2023.07.11"></script>

<script>
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
</script>

<!-- 其他代码 -->
```

### 6. CSS 样式

这是一些必要的 CSS，只会影响到观影页面，没有侵入性。
可把 CSS 放入 Hugo 的 `static` 目录

```css
.movie {
    display: grid;
    width: 100%;
    gap: 10px;
    margin-top: 1rem;
}

@media (min-width: 1000px) {
    .movie {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
}

@media only screen and (max-width: 1000px) {

    .movie {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

@media only screen and (max-width: 680px) {
    .movie {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 359px) {
    .movie {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

.movie .cover {
    position: relative;
    border-radius: 0.25rem;
    width: 100%;
    height: 100%;
}

.movie .cover .cover__container {
    position: relative;
    border-radius: 0.25rem;
    background-image: linear-gradient(to bottom, #ddd, #f5f5f5);
    overflow: hidden;
    padding-top: 177.78%; /* 9:16 竖屏宽高比的容器 */
    padding-top: 133.33%; /* 3:4 宽高比的容器 */
    padding-top: 150%; /* 豆瓣常见的宽高比的容器 */
}

.movie .cover .cover__container img {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    -o-object-fit: cover;
    object-fit: cover;
    transition: all 0.6s ease;
}

.movie .cover .cover__container img:hover {
    transform: scale(1.1);
}

.movie .movies {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    margin-bottom: 2rem;
}

.movie .title {
    margin-top: 0.25rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 0.5rem;
}

.movie .title,
.movie .rating,
.movie .referrer {
    margin-right: auto;
}

.movie .rating {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 0.875rem;
}

.movie .rating span:last-child {
    margin-right: 0.5rem;
}

.movie .rating .stars {
    margin-right: 1px;
    width: 0.875rem;
    height: 0.875rem;
    color: #fccd59;
}

.movie .rating .stars.white {
    color: #eee;
}

.movie .movies .referrer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    gap: 5px;
}

.movie .movies .referrer img {
    width: 1rem;
    height: 1rem;
    opacity: 0.7;
}

.movie .movies .referrer img:hover {
    opacity: 0.95;
    transition: all 0.6s ease;
}

.sort-by-items {
    text-align: left;
}

.rating_count {
    display: flex;
    text-align: left;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
}

.rating_star.hidden,
.rating_count.hidden {
    display: none;
}

.sort-by-item.active {
    background: rgba(85,85,85,.1);
}

.sort-by-item {
    padding: 0 5px;
}

```

### 7. JS 代码

其实可以不需要 JS。所有数据都通过脚本和 Hugo 程序处理好了。这一段 JS 主要是用于排序。

```js
function search(e) {
    // 隐藏所有 .sorting 元素
    document.querySelectorAll('.sorting').forEach(item => item.classList.add('hide'));

    // 移除之前处于活动状态的 .dvtjjf 元素
    document.querySelector(`.dvtjjf.active[data-search="${e.target.dataset.search}"]`)?.classList.remove('active');

    if (e.target.dataset.value) {
        // 将当前点击的 .dvtjjf 元素设为活动状态
        e.target.classList.add('active');
    }

    // 构建属性选择器数组
    const searchItems = document.querySelectorAll('.dvtjjf.active');
    const attributes = Array.from(searchItems, searchItem => {
        const property = `data-${searchItem.dataset.search}`;
        const logic = searchItem.dataset.method === 'contain' ? '*' : '^';
        const value = searchItem.dataset.method === 'contain' ? `${searchItem.dataset.value}` : searchItem.dataset.value;
        return `[${property}${logic}='${value}']`;
    });

    // 构建选择器字符串
    const selector = `.sorting${attributes.join('')}`;

    // 显示匹配选择器的元素
    document.querySelectorAll(selector).forEach(item => item.classList.remove('hide'));
}

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('sc-gtsrHT')) {
        e.preventDefault();
        search(e);
    }
});

function sort(e) {
    const sortBy = e.target.dataset.order;
    const style = document.createElement('style');
    style.classList.add('sort-order-style');

    // 移除之前的排序样式
    document.querySelector('style.sort-order-style')?.remove();

    // 移除之前处于活动状态的 .sort-by-item 元素
    document.querySelector('.sort-by-item.active')?.classList.remove('active');

    // 将当前点击的 .sort-by-item 元素设为活动状态
    e.target.classList.add('active');

    if (sortBy === 'rating') {
        const movies = Array.from(document.querySelectorAll('.sorting'));

        // 根据评分进行排序
        movies.sort((movieA, movieB) => {
            const ratingA = parseFloat(movieA.dataset.rating) || 0;
            const ratingB = parseFloat(movieB.dataset.rating) || 0;
            if (ratingA === ratingB) {
                return 0;
            }
            return ratingA > ratingB ? -1 : 1;
        });

        // 生成排序样式表
        const stylesheet = movies.map((movie, idx) => `.sorting[data-rating="${movie.dataset.rating}"] { order: ${idx}; }`).join('\r\n');
        style.innerHTML = stylesheet;
        document.body.appendChild(style);
    } else if (sortBy === 'count') {
        const movies = Array.from(document.querySelectorAll('.sorting'));

        // 根据评分人数进行排序
        movies.sort((movieA, movieB) => {
            const countA = parseInt(movieA.dataset.count) || 0;
            const countB = parseInt(movieB.dataset.count) || 0;
            if (countA === countB) {
                return 0;
            }
            return countA > countB ? -1 : 1;
        });

        // 生成排序样式表
        const stylesheet = movies.map((movie, idx) => `.sorting[data-count="${movie.dataset.count}"] { order: ${idx}; }`).join('\r\n');
        style.innerHTML = stylesheet;
        document.body.appendChild(style);
    }
}

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('sort-by-item')) {
        e.preventDefault();
        sort(e);
    }
});

```

### 8. 附加 GitHub Actions

GitHub Actions 处理 Json 数据的好处是不用每次都手动下载更新，而且 Access Token 可以保存在 GitHub 仓库的 Secrets Setting 里。

![](/assets/images/posts/2023/07/secrets.png)

然后填入前面步骤得到的 Access Token

- `Name *`：`NEODB_ACCESS_TOKEN`
- `Secret *`：`QuhZZpr111111111111111110X2OPaSRKU`

![](/assets/images/posts/2023/07/secret.png)

下面是具体的 GitHub Actions <i class="fab fa-github fa-fw"></i>[neodb.yml](https://github.com/eallion/eallion.com/blob/9c7fdeb341056e8ae0f3822f3d5077a946711a3b/.github/workflows/neodb.yml) 代码。不需要用到的步骤直接删除即可。

```bash
# .github/workflows/douban.yml
name: Sync NeoDB Data
on:
  schedule:
  - cron: "0 17 * * *"
#  watch:
#    types: [started]

  workflow_dispatch:

jobs:
  douban:
    name: Sync NeoDB Data
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    # 检查是否安装了 JQ
    - name: Check JQ
      run: |
        if ! command -v jq &> /dev/null; then
          echo "jq is not installed. Installing..."
          sudo apt-get update
          sudo apt-get install -y jq
        else
          echo "jq is already installed."
        fi
        # 把当前目录保存到环境变量中
        echo "WORK_DIR=$(pwd)" >> $GITHUB_ENV

    # 获取本地现有文件的标记数
    - name: Get Current Count
      run: |
        CURRENT_COUNT() {
          jq '.count' data/neodb/movie.json
        }
        echo "CURRENT_COUNT=$(CURRENT_COUNT)" >> $GITHUB_ENV

    - name: Get NeoDB JSON and Count
      run: |
        curl -X 'GET' \
        'https://neodb.social/api/me/shelf/complete?category=movie&page=1' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > movie1.json

        # 获取 NeoDB 上电影的标记数
        MOVIE_COUNT() {
          jq '.count' movie1.json
        }
        echo "MOVIE_COUNT=$(MOVIE_COUNT)" >> $GITHUB_ENV

        curl -X 'GET' \
        'https://neodb.social/api/me/shelf/complete?category=tv&page=1' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > tv1.json

        # 获取 NeoDB 上电视剧的标记数
        TV_COUNT() {
          jq '.count' tv1.json
        }

        REMOTE_COUNT=$(($(MOVIE_COUNT) + $(TV_COUNT)))
        echo "REMOTE_COUNT=$REMOTE_COUNT" >> $GITHUB_ENV

    # 对比本地的标记数和远程标记数，相等就跳过，不相等就下载新数据
    - name: Count Compare
      run: |
        if [ "${{ env.REMOTE_COUNT }}" = "${{ env.CURRENT_COUNT }}" ]; then
          echo "Variables are equal. Skipping the next steps."
          exit 0
        else
          echo "Variables are not equal. Running the next steps."
        fi

    # 下载所有数据
    - name: Get All NeoDB Count
      if: ${{ env.REMOTE_COUNT != env.CURRENT_COUNT }}
      run: |
        #从 json 中提取 pages 字段的值
        pages=$(jq '.pages' movie1.json)
        tv_pages=$(jq '.pages' tv1.json)

        # 个人使用，新建 WorkDIR ，排除 vercel.json 和 package.json 等
        mkdir neodb
        cd neodb

        # 下载 Movie 分类
        for ((i=1; i<=$pages; i++)); do
          url="https://neodb.social/api/me/shelf/complete?category=movie&page=$i"
          filename="movie$i.json"

        # 下载文件并保存为对应的文件名
        curl -X 'GET' "$url" \
          -H 'accept: application/json' \
          -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > "$filename"
        done

        # 下载 TV 分类
        for ((i=1; i<=$tv_pages; i++)); do
          tv_url="https://neodb.social/api/me/shelf/complete?category=tv&page=$i"
          tv_filename="tv$i.json"

          curl -X 'GET' "$tv_url" \
            -H 'accept: application/json' \
            -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > "$tv_filename"
          done

        # 把所有数据合并成一个文件
        jq -c -s '{data: map(.data[]) | unique | sort_by(.created_time) | reverse, pages: map(.pages)[0], count: map(.count)[0]}' *.json > movie.json

        # 更新 NeoDB 数据
        cp -f movie.json ${{ env.WORK_DIR }}/data/neodb/

    - name: Download NeoDB Cover
      run: |
        # 检查 movie 目录是否存在，如果不存在则创建
        if [ ! -d "movie" ]; then
          mkdir movie
        fi

        # 读取本地的 movie.json 文件内容
        json=$(cat data/neodb/movie.json)

        # 提取图片 URL
        image_urls=$(echo "$json" | jq -r '.data[].item.cover_image_url')

        # 遍历图片 URL 并下载图片
        for url in $image_urls; do
          filename=$(basename "$url")
          filepath="data/neodb/cover/$filename"
          # 检查文件是否已存在
          if [ -f "$filepath" ]; then
            echo "Skipping $filename - File already exists"
          else
            # 使用 curl 命令下载图片
            curl -o "$filepath" "$url"
            echo "Downloaded $filename"
            echo "REMOTE_COUNT=''" >> $GITHUB_ENV
          fi
        done

    # 把修改后的数据提交到 GitHub 仓库
    - name: Git Add and Commit
      if: ${{ env.REMOTE_COUNT != env.CURRENT_COUNT }}
      uses: EndBug/add-and-commit@v9
      with:
        message: 'chore(data): update neodb data'
        add: './data/neodb'

    # 调用另外的 GitHub Actions 构建 Hugo
    - name: Build Hugo and Deploy
      if: ${{ env.REMOTE_COUNT != env.CURRENT_COUNT }}
      uses: peter-evans/repository-dispatch@v2
      with:
          event-type: "Build Hugo and Deploy"

    # 把海报上传到腾讯云
    - name: Upload Cover to Tencent COS
      if: ${{ env.REMOTE_COUNT != env.CURRENT_COUNT }}
      uses: zkqiang/tencent-cos-action@v0.1.0
      with:
        args: upload -rs ./data/neodb/cover/ /images/neodb/
        secret_id: ${{ secrets.SECRET_COS_ID }}
        secret_key: ${{ secrets.SECRET_COS_KEY }}
        bucket: ${{ secrets.COS_CDN_BUCKET }}
        region: ap-shanghai

```