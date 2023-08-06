// // 今日诗词
// var gushici = document.getElementById('gushici');
// var xhr = new XMLHttpRequest();
// xhr.open('get', 'https://api.eallion.com/jinrishici/one.json', true);
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         var result = JSON.parse(xhr.responseText);
//         var poem_info = document.getElementById('poem_info');
//         gushici.innerHTML = '「<a href="https://www.google.com/search?q=' + result.data.content + '" target="_blank" rel="noopener noreferrer">' + result.data.content + '</a>」';
//         poem_info.innerHTML = '<a href="https://www.google.com/search?q=' + result.data.origin.author + ' ' + result.data.origin.title + '" target="_blank" rel="noopener noreferrer">' + '【' + result.data.origin.dynasty + '】' + result.data.origin.author + '《' + result.data.origin.title + '》' + '</a>';
//     }
// };

// if (!gushici) {
//     // console.log(error)
// } else {
//     xhr.send();
// }

// 首页嘀咕

// 相对时间插件 2.5.2 https://tokinx.github.io/lately/

(() => {
    window.Lately = new function () {
        this.lang = {
            second: "秒",
            minute: "分钟",
            hour: "小时",
            day: "天",
            month: "个月",
            year: "年",
            ago: "前",
            error: "NaN"
        };
        const format = (date) => {
            date = new Date(_val(date));
            const floor = (num, _lang) => Math.floor(num) + _lang,
                obj = new function () {
                    this.second = (Date.now() - date.getTime()) / 1000;
                    this.minute = this.second / 60;
                    this.hour = this.minute / 60;
                    this.day = this.hour / 24;
                    this.month = this.day / 30;
                    this.year = this.month / 12
                },
                key = Object.keys(obj).reverse().find(_ => obj[_] >= 1);
            return (key ? floor(obj[key], this.lang[key]) : this.lang.error) + this.lang.ago;
        },
            _val = (date) => {
                date = new Date(date && (typeof date === 'number' ? date : date.replace(/-/g, '/').replace('T', ' ')));
                return isNaN(date.getTime()) ? false : date.getTime();
            };
        return {
            init: ({ target = "time", lang } = {}) => {
                if (lang) this.lang = lang;
                for (let el of document.querySelectorAll(target)) {
                    const date = _val(el.dateTime) || _val(el.title) || _val(el.innerHTML) || 0;
                    if (!date) return;
                    el.title = new Date(date).toLocaleString();
                    el.innerHTML = format(date);
                }
            },
            format
        }
    }
})();

let jsonUrl = "https://api.eallion.com/memos/memos.json" + "?t=" + Date.parse(new Date());

if (document.querySelector('#ticker')) {
    fetch(jsonUrl)
        .then(res => res.json())
        .then(resdata => {
            var result = '';
            var data = resdata;
            for (var i = 0; i < data.length; i++) {
                var tickerTime = new Date(data[i].createdTs * 1000).toLocaleString();
                var tickerContent = data[i].content;
                const escapeHtml = (unsafe) => {
                    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
                };
                var newtickerContent = escapeHtml(tickerContent)
                    .replace(/```([\s\S]*?)```[\s]*/g, ' <code>$1</code> ') //全局匹配代码块
                    .replace(/`([\s\S ]*?)`[\s]*/g, ' <code>$1</code> ') //全局匹配内联代码块
                    .replace(/\!\[[\s\S]*?\]\(([\s\S]*?)\)/g, "$1") //全局匹配图片
                    .replace(/\[[\s\S]*?\]\(([\s\S]*?)\)/g, "$1") //全局匹配连接
                    .replace(/<video [^>]*src=['"](.+?[^'"]\.(mp4|webm|ogv)+)[^>]*>/g, "$1"); //全局匹配连接
                result += `<li class="item"><span class="datetime">${tickerTime}</span>：<a href="https://eallion.com/memos/">${newtickerContent}</a></li>`;
            }
            var tickerDom = document.querySelector('#ticker');
            var tickerBefore = `<i class='fab fa-twitter'></i><div class="ticker-wrap"><ul class="ticker-list">`;
            var tickerAfter = `</ul></div>`;
            resultAll = tickerBefore + result + tickerAfter;
            tickerDom.innerHTML = resultAll;

            // 相对时间： https://tokinx.github.io/lately/
            window.Lately && Lately.init({
                target: '.datetime'
            });
        });

    setInterval(function () {
        var tickerWrap = document.querySelector(".ticker-list");
        var tickerItem = tickerWrap.querySelectorAll(".item");
        for (var i = 0; i < tickerItem.length; i++) {
            setTimeout(function () {
                tickerWrap.appendChild(tickerItem[0]);
            }, 2000);
        }
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
    const matchingSummary = document.querySelector(".ai-explanation-content");

    if (matchingSummary) {
        new TypeIt("#ai-explanation", {
            strings: matchingSummary.textContent,
            speed: 30,
            lifeLike: true,
            waitUntilVisible: true,
        }).go();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // listen to any DOM change and automatically perform spacing via MutationObserver()
    pangu.autoSpacingPage();
});
