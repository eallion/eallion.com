// // 今日诗词
// function getData() {
//     var xhr = new XMLHttpRequest();
//     // Proxy Jinrishici API
//     xhr.open('get', 'https://api.eallion.com/jinrishici/one.json', true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             var result = JSON.parse(xhr.responseText);
//             var title = document.getElementById('poemTitle');
//             var poemSentence = document.getElementById('poemSentence');
//             var poem_info = document.getElementById('poem_info');
//             title.innerHTML = '《<a href="https://www.google.com/search?q=' + result.data.origin.author + ' ' + result.data.origin.title + '" target="_blank" rel="noopener noreferrer">' + result.data.origin.title + '</a>》：';
//             poemSentence.innerHTML = '「<a href="https://www.google.com/search?q=' + result.data.content + '" target="_blank" rel="noopener noreferrer">' + result.data.content + '</a>」';
//             poem_info.innerHTML = '【' + result.data.origin.dynasty + '】' + result.data.origin.author;
//         }
//     };
//     xhr.send();
// }
// // 每 10 分钟刷新一次 （别这样设置，会被服务器 BAN）
// // setInterval(getData, 1000*600);
// window.onload = getData();

//获取 Memos 总条数
function getTotal() {
    var totalUrl = "https://api.eallion.com/memos/api/memo/stats?creatorId=101";
    fetch(totalUrl)
        .then((res) => res.json())
        .then((resdata) => {
            if (resdata.data) {
                var allnums = resdata.data.length;
                var memosCount = document.getElementById("memosCount");
                memosCount.innerHTML = allnums;
            }
        })
        .catch((err) => {
            // Do something for an error here
        });
}
window.onload = getTotal();

// Memos API
var memo = {
    host: "https://demo.usememos.com/",
    limit: "10",
    creatorId: "101",
    domId: "#memos",
};
if (typeof memos !== "undefined") {
    for (var key in memos) {
        if (memos[key]) {
            memo[key] = memos[key];
        }
    }
}

var limit = memo.limit;
var memosHost = memo.host;
// Memos json self-hosted on Tencent COS + CDN
var localUrl = "https://api.eallion.com/memos/memos.json";
var remoteUrl =
    "https://api.eallion.com/memos/api/memo?creatorId=" +
    memo.creatorId +
    "&rowStatus=NORMAL";
//var remoteUrl = memosHost + "api/memo?creatorId=" + memo.creatorId + "&rowStatus=NORMAL"
var page = 1,
    offset = 10,
    nextLength = 0,
    nextDom = "";
var memoDom = document.querySelector(memo.domId);
var load = '<button class="load-btn button-load">努力加载中……</button>';
if (memoDom) {
    memoDom.insertAdjacentHTML("afterend", load);
    getFirstList(); //首次加载数据
    var btn = document.querySelector("button.button-load");
    btn.addEventListener("click", function () {
        btn.textContent = "努力加载中……";
        updateHTMl(nextDom);
        if (nextLength < limit) {
            //返回数据条数小于限制条数，隐藏
            document.querySelector("button.button-load").remove();
            return;
        }
        getNextList();
    });
}

// 渲染第一页（前 10 条）
function getFirstList() {
    // 网站根目录静态文件 memos.json
    var memoUrl_first = localUrl + "?t=" + Date.parse(new Date());
    //var memoUrl_first = "https://api.eallion.com/memos/api/memo?creatorId=101&rowStatus=NORMAL&limit=1&offset=0";
    fetch(memoUrl_first)
        .then((res) => res.json())
        .then((resdata) => {
            updateHTMl(resdata.data);
            var nowLength = resdata.data.length;
            if (nowLength < limit) {
                //返回数据条数小于 limit 则直接移除“加载更多”按钮，中断预加载
                document.querySelector("button.button-load").remove();
                return;
            }
            page++;
            offset = limit * (page - 1);
            getNextList();
        });
}

//预加载下一页数据
function getNextList() {
    var memoUrl_next = remoteUrl + "&limit=" + limit + "&offset=" + offset;
    fetch(memoUrl_next)
        .then((res) => res.json())
        .then((resdata) => {
            nextDom = resdata.data;
            nextLength = nextDom.length;
            page++;
            offset = limit * (page - 1);
            if (nextLength < 1) {
                //返回数据条数为 0 ，隐藏
                document.querySelector("button.button-load").remove();
                return;
            }
        });
}

// 插入 html
function updateHTMl(data) {
    var memoResult = "", resultAll = "";

    const TAG_REG = /#([^\s#]+)/,
    IMG_REG = /\!\[(.*?)\]\((.*?)\)/g,
    // LINK_REG = /\[(.*?)\]\((.*?)\)/g,
    NETEASE_MUSIC_REG = /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g,
    QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g,
    BILIBILI_REG = /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g,
    YOUTUBE_REG = /<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g
    //  SPOTIFY_REG = /<a\shref="https:\/\/open\.spotify\.com\/(track|album)\/([\s\S]+)".*?>.*<\/a>/g;
    //  QQVIDEO_REG = /<a\shref="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g;
    //  YOUKU_REG = /<a\shref="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g;

    // Marked Options
    marked.setOptions({
        breaks: true,
        smartypants: true,
        langPrefix: "language-",
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight.toString(code, { language }).value;
        },
    });

    // Marked Renderer Open links in New Tab
    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link;
    renderer.link = (href, title, text) => {
        const localLink = href.startsWith(`${location.protocol}//${location.hostname}`);
        const html = linkRenderer.call(renderer, href, title, text);
        return localLink ? html : html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `);
    };

    marked.use({ renderer });

    // Memos Content

    for (var i = 0; i < data.length; i++) {
        var memo_id = data[i].id;
        var memoContREG = data[i].content.replace(TAG_REG, "<span class='tag-span'>#$1</span> ")
            .replace(IMG_REG, '')
        //.replace(LINK_REG, '<a class="primary" href="$2" target="_blank">$1</a>')

        memoContREG = marked.parse(memoContREG)
            // New way to spacing at the end of this file
            //.parse(pangu.spacing(memoContREG))
            .replace(NETEASE_MUSIC_REG, "<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>")
            .replace(QQMUSIC_REG, "<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>")
            .replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")
            //.replace(SPOTIFY_REG, "<div class='spotify-wrapper'><iframe style='border-radius:12px' src='https://open.spotify.com/embed/$1/$2?utm_source=generator&theme=0' width='100%' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe></div>");
            //.replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
            //.replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")

        //解析 content 内 md 格式图片
        var loadUrl = memo.loadUrl;
        var IMG_ARR = data[i].content.match(IMG_REG);
        var IMG_STR = String(IMG_ARR).replace(/[,]/g, '');
        if (IMG_ARR) {
            var memosContIMG = IMG_STR.replace(IMG_REG, '<div class="memos-images"><img loading="lazy" src="$2" data-action="zoom"></div>')
            memoContREG += '<div class="memos-image-wrapper">' + memosContIMG + '</div>'
        }

        // //标签
        // var tagArr = data[i].content.match(TAG_REG);
        // var bbContTag = '';
        // if (tagArr) {
        //     bbContTag = String(tagArr[0]).replace(/[#]/g, '');
        // } else {
        //     bbContTag = '动态';
        // };

        //解析内置资源文件
        if (data[i].resourceList && data[i].resourceList.length > 0) {
            var resourceList = data[i].resourceList;
            var imgUrl = '', resUrl = '', resImgLength = 0;
            for (var j = 0; j < resourceList.length; j++) {
                var restype = resourceList[j].type.slice(0, 5)
                var resexlink = resourceList[j].externalLink
                var resLink = '', fileId = ''
                if (resexlink) {
                    resLink = resexlink
                } else {
                    fileId = resourceList[j].publicId || resourceList[j].filename
                    resLink = memos + 'o/r/' + resourceList[j].id + '/' + fileId
                }
                if (restype == 'image') {
                    imgUrl += '<figure class="gallery-thumbnail"><img class="img thumbnail-image" src="' + resLink + '"/></figure>'
                    resImgLength = resImgLength + 1
                }
                if (restype !== 'image') {
                    resUrl += '<a target="_blank" rel="noreferrer" href="' + resLink + '">' + resourceList[j].filename + '</a>'
                }
            }
            if (imgUrl) {
                var resImgGrid = ""
                if (resImgLength !== 1) { var resImgGrid = "grid grid-" + resImgLength }
                memoContREG += '<div class="resimg ' + resImgGrid + '">' + imgUrl + '</div>'
            }
            if (resUrl) {
                memoContREG += '<p class="datasource">' + resUrl + '</p>'
            }
        }

        var twitterIcon = '<svg viewBox="0 0 24 24" aria-label="认证账号" class="talks__verify"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>'

        memoResult += '<li id="' + memo_id + '" class="timeline"><div class="talks__content"><div class="talks__text"><div class="talks__userinfo"><div>Charles Chin</div><div>' + twitterIcon + '</div><div class="talks__id">@eallion · </div><small class="talks__date"><a href="https://memos.eallion.com/m/' + memo_id + '" target="_blank">' + moment(data[i].createdTs * 1000).twitterLong() + "</a></small></div>" + memoContREG + "<div class='talks_comments'><a class='artalk-div' onclick=\"loadArtalk(\'" + memo_id + "\',event)\"><i class='fas fa-comment-dots fa-fw'></i><span id='btn_memo_" + memo_id + "'>评论</span> (<span id='ArtalkCount' data-page-key='/m/" + memo_id + "'>0</span>)</a></div><div id='memo_" + memo_id + "' class='artalk hidden'></div></div></li>";
    }

    var memoBefore = '<ul class="talks">';
    var memoAfter = "</ul>";
    resultAll = memoBefore + memoResult + memoAfter;
    memoDom.insertAdjacentHTML("beforeend", resultAll);

    // douban
    fetchDB();

    // heti
    //hetiSpacing();

    // highlight.js
    hljs.initHighlighting.called = false;
    hljs.configure({
        ignoreUnescapedHTML: true,
    });
    hljs.highlightAll();

    document.querySelector("button.button-load").textContent = "加载更多";
}

let activeDiv = null;

function loadArtalk(memo_id, event) {
    event.preventDefault();

    const commentDiv = document.getElementById('memo_' + memo_id);
    const commentBtn = document.getElementById('btn_memo_' + memo_id);
    const commentId = document.getElementById(memo_id);

    if (commentDiv.classList.contains('hidden')) {
        // 关闭当前已展开的 div 元素
        if (activeDiv) {
            activeDiv.classList.add('hidden');
            // 修改按钮文本
            const activeBtnId = activeDiv.id.replace('memo_', 'btn_memo_');
            const activeBtn = document.getElementById(activeBtnId);
            activeBtn.innerHTML = '评论';
        }

        commentDiv.classList.remove('hidden');
        commentBtn.innerHTML = '收起评论<i class="fas fa-level-up-alt"></i>';
        activeDiv = commentDiv;

        const artalk = new Artalk({
            el: '#memo_' + memo_id,
            pageKey: '/m/' + memo_id,
            pageTitle: '',
            server: 'https://api.eallion.com/artalk/',
            site: 'memos',
            darkMode: 'auto'
        });

        function setArtalkTheme() {
            const theme = document.body.getAttribute('theme');
            artalk.setDarkMode(theme === 'dark');
        }

        setArtalkTheme();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            setArtalkTheme();
        });

        // 获取 commentId 的位置
        const commentIdPosition = commentId.getBoundingClientRect().top + window.pageYOffset;
        // 计算偏移量
        const offset = commentIdPosition - 3.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        // 将页面滚动到 commentId 的位置加上偏移量
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    } else {
        commentDiv.classList.add('hidden');
        commentBtn.innerHTML = '评论';
        activeDiv = null;
    }
}

//文章内显示豆瓣条目 https://immmmm.com/post-show-douban-item/
function fetchDB() {
    var dbAPI = "https://api.eallion.com/douban/";
    var dbA =
        document.querySelectorAll(
            ".timeline a[href*='douban.com/subject/']:not([rel='noreferrer'])"
        ) || "";
    if (dbA) {
        for (var i = 0; i < dbA.length; i++) {
            _this = dbA[i];
            var dbHref = _this.href;
            var db_reg =
                /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
            var db_type = dbHref.replace(db_reg, "$1");
            var db_id = dbHref.replace(db_reg, "$2").toString();
            if (db_type == "movie") {
                var this_item = "movie" + db_id;
                var url = dbAPI + "movies/" + db_id;
                if (
                    localStorage.getItem(this_item) == null ||
                    localStorage.getItem(this_item) == "undefined"
                ) {
                    fetch(url)
                        .then((res) => res.json())
                        .then((data) => {
                            let fetch_item = "movies" + data.sid;
                            let fetch_href =
                                "https://movie.douban.com/subject/" +
                                data.sid +
                                "/";
                            localStorage.setItem(
                                fetch_item,
                                JSON.stringify(data)
                            );
                            movieShow(fetch_href, fetch_item);
                        });
                } else {
                    movieShow(dbHref, this_item);
                }
            } else if (db_type == "book") {
                var this_item = "book" + db_id;
                var url = dbAPI + "v2/book/id/" + db_id;
                if (
                    localStorage.getItem(this_item) == null ||
                    localStorage.getItem(this_item) == "undefined"
                ) {
                    fetch(url)
                        .then((res) => res.json())
                        .then((data) => {
                            let fetch_item = "book" + data.id;
                            let fetch_href =
                                "https://book.douban.com/subject/" +
                                data.id +
                                "/";
                            localStorage.setItem(
                                fetch_item,
                                JSON.stringify(data)
                            );
                            bookShow(fetch_href, fetch_item);
                        });
                } else {
                    bookShow(dbHref, this_item);
                }
            }
        } // for end
    }
}
function movieShow(fetch_href, fetch_item) {
    var storage = localStorage.getItem(fetch_item);
    var data = JSON.parse(storage);
    var db_star = Math.ceil(data.rating);
    var db_html =
        "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" +
        fetch_href +
        "'>《" +
        data.name +
        "》</a></h4><div class='rating'><div class='rating-star allstar" +
        db_star +
        "'></div><div class='rating-average'>" +
        data.rating +
        "</div></div><time class='post-preview--date'>导演：" +
        data.director +
        " / 类型：" +
        data.genre +
        " / " +
        data.year +
        "</time><section class='post-preview--excerpt'>" +
        data.intro.replace(/\s*/g, "") +
        "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" +
        data.img +
        "></div>";
    var db_div = document.createElement("div");
    var qs_href = ".timeline a[href='" + fetch_href + "']";
    var qs_dom = document.querySelector(qs_href);
    qs_dom.parentNode.replaceChild(db_div, qs_dom);
    db_div.innerHTML = db_html;
}
function bookShow(fetch_href, fetch_item) {
    var storage = localStorage.getItem(fetch_item);
    var data = JSON.parse(storage);
    var db_star = Math.ceil(data.rating.average);
    var db_html =
        "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" +
        fetch_href +
        "'>《" +
        data.title +
        "》</a></h4><div class='rating'><div class='rating-star allstar" +
        db_star +
        "'></div><div class='rating-average'>" +
        data.rating.average +
        "</div></div><time class='post-preview--date'>作者：" +
        data.author +
        " </time><section class='post-preview--excerpt'>" +
        data.summary.replace(/\s*/g, "") +
        "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" +
        data.images.medium +
        "></div>";
    var db_div = document.createElement("div");
    var qs_href = ".timeline a[href='" + fetch_href + "']";
    var qs_dom = document.querySelector(qs_href);
    qs_dom.parentNode.replaceChild(db_div, qs_dom);
    db_div.innerHTML = db_html;
}
// 豆瓣结束

// Memos 总数
document.addEventListener("DOMContentLoaded", () => {
    let albumLimit = 6;
    var memoUrl = "https://api.eallion.com/memos/";
    //var creatorId = 101
    //var galleryUrl = memoUrl+"api/memo?creatorId="+creatorId+"&rowStatus=NORMAL&limit="+albumLimit+"&tag=相册"
    var galleryUrl =
        memoUrl + "api/memo/all?rowStatus=NORMAL&tag=相册&limit=" + albumLimit;
    let nowNum = 0;
    fetch(galleryUrl)
        .then((res) => res.json())
        .then((resdata) => {
            var result = "",
                resultAll = "",
                data = resdata.data;
            for (var i = 0; i < data.length; i++) {
                var galleryTitle = data[i].content.replace("#相册 ", "");
                var id = data[i].id;
                var imgs = galleryTitle.match(/\!\[(.*?)\s*(.*?)\]\((.*?)\)/g);
                //解析 content 内 md 格式图片
                if (imgs) {
                    imgs.forEach((item) => {
                        if (nowNum < albumLimit) {
                            nowNum++;
                            let img = item.replace(/!\[.*?\]\((.*?)\)/g, "$1"),
                                time,
                                title,
                                tmp = item.replace(/!\[(.*?)\]\(.*?\)/g, "$1");
                            if (tmp.indexOf(" ") != -1) {
                                time = tmp.split(" ")[0];
                                title = tmp.split(" ")[1];
                            } else title = tmp;
                            result += `<div class="memos-photo"><img class="photo-img" loading='lazy' decoding="async" src="${img}" data-action="zoom">`;
                            title
                                ? (result += `<a href="https://memos.eallion.com/m/${id}" target="_blank" rel="noreferrer noopener nofollow"><span class="photo-title">${title}</span></a>`)
                                : "";
                            time
                                ? (result += `<span class="photo-time">${time}</span>`)
                                : "";
                            result += `</div>`;
                        }
                    });
                }
            }

            //解析内置资源文件

            // // 自用 Memos 取消解析内置资源文件，图片一律使用图床，以保证数据库的整洁。
            // if (data[i].resourceList && data[i].resourceList.length > 0) {
            //     var resourceList = data[i].resourceList;
            //     for (var j = 0; j < resourceList.length; j++) {
            //         var galleryTime = new Date(
            //             resourceList[j].createdTs * 1000
            //         ).toLocaleString();
            //         var restype = resourceList[j].type.slice(0, 5);
            //         var resexlink = resourceList[j].externalLink;
            //         var resLink = "";
            //         if (resexlink) {
            //             resLink = resexlink;
            //         } else {
            //             resLink =
            //                 memoUrl +
            //                 "o/r/" +
            //                 resourceList[j].id +
            //                 "/" +
            //                 resourceList[j].filename;
            //         }
            //         if (restype == "image" && nowNum <= albumLimit) {
            //             nowNum++;
            //             result +=
            //                 '<div class="memos-photo"><img class="photo-img" loading="lazy" decoding="async" src="' +
            //                 resLink +
            //                 '"/><span class="photo-title">' +
            //                 galleryTitle +
            //                 '</span><span class="photo-time">' +
            //                 galleryTime +
            //                 "</span></div>";
            //         }
            //     }
            // }

            var galleryDom = document.querySelector("#album");
            var galleryBefore = `<div class="memos-photo-wrapper">`;
            var galleryAfter = `</div>`;
            resultAll = galleryBefore + result + galleryAfter;
            galleryDom.innerHTML = resultAll;

            // 相对时间
            window.Lately && Lately.init({ target: ".photo-time" });
        });
});
// Memos 总数结束

// Memos editor
// var memosDom = document.querySelector(memosData.dom);
// var editIcon = '<button class="load-memos-editor outline p-1"><i class="iconfont iconedit-square"></i></button>';
var memosDom = document.querySelector("#memos");
var editIcon = document.querySelector(".editIcon");

var editorCont = '<div class="memos-editor animate__animated animate__fadeIn d-none col-12"><div class="memos-editor-body mb-3 p-3"><div class="memos-editor-inner animate__animated animate__fadeIn"><div class="memos-editor-content"><textarea class="memos-editor-inputer text-sm" rows="1" placeholder="任何想法……"></textarea></div><div class="memos-editor-tools pt-3"><div class="d-flex"><div class="button outline action-btn tag-btn mr-2"><i class="fas fa-hashtag fa-sm"></i></div><div class="button outline action-btn todo-btn mr-2"><i class="fas fa-list fa-sm"></i></div><div class="button outline action-btn code-btn mr-2"><i class="fas fa-code fa-sm"></i></div><div class="button outline action-btn mr-2 link-btn"><i class="fas fa-link fa-sm"></i></div><div class="button outline action-btn image-btn" onclick="this.lastElementChild.click()"><i class="fas fa-images fa-sm"></i><input class="memos-upload-image-input d-none" type="file" accept="image/*"></div></div><div class="d-flex flex-fill"><div class="memos-tag-list d-none mt-2 animate__animated animate__fadeIn"></div></div></div><div class="memos-editor-footer border-t pt-3 mt-3"><div class="editor-selector mr-2"><select class="select-memos-value outline px-2 py-1"><option value="PUBLIC">所有人可见</option><option value="PROTECTED">仅登录可见</option><option value="PRIVATE">仅自己可见</option></select></div><div class="editor-submit d-flex flex-fill justify-content-end"><button class="primary submit-memos-btn px-3 py-1">记下</button></div></div></div><div class="memos-editor-option animate__animated animate__fadeIn"><input name="memos-api-url" class="memos-open-api-input input-text flex-fill mr-3 px-2 py-1" type="text" value="" maxlength="120" placeholder="输入 OpenAPI （仅保存在本地 localStorage）"><div class="memos-open-api-submit"><button class="primary submit-openapi-btn px-3 py-1">保存</button></div></div></div></div>';
memosDom.insertAdjacentHTML('afterbegin', editorCont);

var memosEditorInner = document.querySelector(".memos-editor-inner");
var memosEditorOption = document.querySelector(".memos-editor-option");

var taglistBtn = document.querySelector(".tag-btn");
var todoBtn = document.querySelector(".todo-btn");
var todoBtn = document.querySelector(".todo-btn");
var codeBtn = document.querySelector(".code-btn");
var linkBtn = document.querySelector(".link-btn");
var loadEditorBtn = document.querySelector(".load-memos-editor");
var submitApiBtn = document.querySelector(".submit-openapi-btn");
var submitMemoBtn = document.querySelector(".submit-memos-btn");
var memosVisibilitySelect = document.querySelector(".select-memos-value");
var memosTextarea = document.querySelector(".memos-editor-inputer");
var openApiInput = document.querySelector(".memos-open-api-input");
var uploadImageInput = document.querySelector(".memos-upload-image-input");

document.addEventListener("DOMContentLoaded", () => {
    getEditIcon();
});

function getEditIcon() {
    var memosContent = '', memosVisibility = '', memosResource = [];
    var memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    var memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    var getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
    var isHide = getEditor === "hide";
    memosTextarea.addEventListener('input', (e) => {
        memosTextarea.style.height = 'inherit';
        memosTextarea.style.height = e.target.scrollHeight + 'px';
    });

    if (getEditor !== null) {
        document.querySelector(".memos-editor").classList.toggle("d-none", isHide);
        getEditor == "show" ? hasMemosOpenId() : ''
    };

    loadEditorBtn.addEventListener("click", function () {
        getEditor != "show" ? hasMemosOpenId() : ''
        document.querySelector(".memos-editor").classList.toggle("d-none");
        window.localStorage && window.localStorage.setItem("memos-editor-display", document.querySelector(".memos-editor").classList.contains("d-none") ? "hide" : "show");
        getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
    });

    taglistBtn.addEventListener("click", function () {
        if (memosOpenId) {
            document.querySelector(".memos-tag-list").classList.toggle("d-none");
        }
    });

    todoBtn.addEventListener("click", function () {
        if (memosOpenId) {
            let memoTodo = "- [ ] ";
            memosTextarea.value += memoTodo
        }
    });

    codeBtn.addEventListener("click", function () {
        if (memosOpenId) {
            let memoCode = "```\n\n```";
            let textareaH = memosTextarea.clientHeight;
            memosTextarea.value += memoCode;
            memosTextarea.style.height = textareaH * 3 + 'px';
        }
    });

    linkBtn.addEventListener("click", function () {
        if (memosOpenId) {
            let memoLink = "[]()";
            memosTextarea.value += memoLink;
        }
    });

    uploadImageInput.addEventListener('change', () => {
        let filesData = uploadImageInput.files[0];
        if (uploadImageInput.files.length !== 0) {
            uploadImage(filesData);
        }
    })

    async function uploadImage(data) {
        const imageData = new FormData();
        const blobUrl = memosPath + "/api/resource/blob?openId=" + memosOpenId;
        imageData.append('file', data, data.name)
        const resp = await fetch(blobUrl, {
            method: "POST",
            body: imageData
        })
        const res = await resp.json().then(res => {
            if (res.data.id) {
                cocoMessage.success(
                    '上传成功',
                    () => {
                        memosResource.push(res.data.id);
                        window.localStorage && window.localStorage.setItem("memos-resource-list", JSON.stringify(memosResource));
                    })
            }
        })
    }

    submitApiBtn.addEventListener("click", function () {
        getMemosData(openApiInput.value)
    });

    submitMemoBtn.addEventListener("click", function () {
        memosContent = memosTextarea.value;
        memosVisibility = memosVisibilitySelect.value;
        memosResource = window.localStorage && JSON.parse(window.localStorage.getItem("memos-resource-list"));
        let hasContent = memosContent.length !== 0;
        if (memosOpenId && hasContent) {
            let memoUrl = memosPath + "/api/memo?openId=" + memosOpenId;
            let memoBody = { content: memosContent, visibility: memosVisibility, resourceIdList: memosResource }
            fetch(memoUrl, {
                method: 'post',
                body: JSON.stringify(memoBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                if (res.status == 200) {
                    cocoMessage.success(
                        '发送成功',
                        () => {
                            location.reload();
                        })
                }
            })
        } else {
            cocoMessage.info('内容不能为空');
        }
    });

    function hasMemosOpenId() {
        if (!memosOpenId) {
            memosEditorInner.classList.add("d-none");
            cocoMessage.info('请设置 Memos Open API');
        } else {
            memosEditorOption.classList.add("d-none");
            cocoMessage.success('准备就绪');
            let tagUrl = memosPath + "/api/tag?openId=" + memosOpenId;
            let response = fetch(tagUrl).then(response => response.json()).then(resdata => {
                return resdata.data
            }).then(response => {
                let taglist = "";
                response.map((t) => {
                    taglist += '<div class="memos-tag d-flex text-xs mt-2 mr-2"><a class="d-flex px-2 justify-content-center" onclick="setMemoTag(this)">#' + t + '</a></div>'
                })
                document.querySelector(".memos-tag-list").insertAdjacentHTML('beforeend', taglist);
            }).catch(err => cocoMessage.error('Memos Open API 有误，请重新输入!'));
        }
    }

    function getMemosData(e) {
        let apiReg = /openId=([^&]*)/, urlReg = /(.+?)(?:\/api)/;
        fetch(e).then(res => {
            if (res.status == 200) {
                let apiRes = e.match(apiReg), urlRes = e.match(urlReg)[1];
                memosOpenId = apiRes[1];
                memosPath = urlRes;
                window.localStorage && window.localStorage.setItem("memos-access-path", urlRes);
                window.localStorage && window.localStorage.setItem("memos-access-token", memosOpenId);
                cocoMessage.success(
                    '保存成功',
                    () => {
                        memosEditorOption.classList.add("d-none");
                        memosEditorInner.classList.remove("d-none");
                        memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
                        memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
                        hasMemosOpenId()
                    })
            } else {
                cocoMessage.error('出错了，再检查一下吧!')
            }
        })
            .catch(err => { cocoMessage.error('网络错误') });
    }
}

function setMemoTag(e) {
    let memoTag = e.textContent + " "
    memosTextarea.value += memoTag
}
// Memos Editor End

// heti
function hetiSpacing() {
    // console.assert(document.readyState === 'complete')

    // Make sure it runs **after** dom ready
    new Heti('.heti').autoSpacing()
}
