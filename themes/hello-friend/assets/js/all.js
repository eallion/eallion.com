jQuery(document).ready(function ($) {
    $("photos img").each(function () {
        var _a = $("<a></a>").attr("href", this.src);
        $(this).wrap("<div class='photo'></div>").wrap(_a);
    })
    isImgLoad(function () {
        var photos = document.querySelector('photos');
        if (photos) {
            waterfall(photos);
        }
        $(window).resize(function () {
            if (photos) {
                waterfall(photos);
            }
        });
    });
    var t_img;
    var isLoad = true;

    function isImgLoad(callback) {
        $('photos img').each(function () {
            if (this.height === 0) {
                isLoad = false;
                return false;
            }
        });
        if (isLoad) {
            clearTimeout(t_img);
            callback();
        } else {
            isLoad = true;
            t_img = setTimeout(function () {
                isImgLoad(callback);
            }, 500);
        }
    }
});
jQuery(document).ready(function ($) {
    //灯箱
    $(".post-content img:not(.avatar)").each(function () {
        var _b = $("<a></a>").attr("href", this.src);
        $(this).wrap(_b);
    })
    $(".post-content a[rel!=link]:has(img:not(.non-box))").slimbox();
    //相对时间
    //$.lately({ 'target': '.post-date' });
    //文章 toc 固定
    var nav = $(".tocify");
    if (nav.length > 0) {
        nav.removeClass("hide");
        var navTop = $(".post-content").offset().top;
        var w = $(window).width() / 2 + 400;
        nav.css("left", w);
        nav.css("top", navTop);
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > navTop) {
                nav.css({
                    "top": 0,
                    "position": "fixed"
                });
            } else {
                nav.css({
                    "top": navTop,
                    "position": "absolute"
                });
            };
        });
    }
    //外链新窗口
    var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    var location_href = window.location.href.replace(parse_url, '$3');
    $('.post-content a:not(:has(img)),.author-name a,.links-item a,a.read-more').hover(function () {
        var this_href = $(this).attr('href');
        var replace_href = this_href.replace(parse_url, '$3');
        if (this_href != replace_href && location_href != replace_href) {
            $(this).attr({
                target: "_blank",
                rel: "noopener noreferrer"
            });
        }
    });
    //豆瓣图书电影条目
    $(".post-content a[href*='douban.com/subject/']").each(function () {
        var _this = $(this);
        var str = _this.attr("href");
        var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
        if (db_reg.test(str)) {
            var db_type = str.replace(db_reg, "$1");
            var db_id = str.replace(db_reg, "$2").toString();
            var db_api = "https://bm.weajs.com/api/";
            if (db_type == 'movie') {
                var ls_item = 'movie' + db_id;
                var url = db_api + "movies/" + db_id + "/";
                if (localStorage.getItem(ls_item) == null || localStorage.getItem(ls_item) == 'undefined') {
                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: "json",
                        success: function (data) {
                            localStorage.setItem(ls_item, JSON.stringify(data));
                            moiveShow(_this, ls_item)
                        }
                    });
                } else {
                    moiveShow(_this, ls_item)
                }
            } else if (db_type == 'book') {
                var ls_item = 'book' + db_id;
                var url = db_api + "books/" + db_id;
                if (localStorage.getItem(ls_item) == null || localStorage.getItem(ls_item) == 'undefined') {
                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            localStorage.setItem('book' + db_id, JSON.stringify(data));
                            bookShow(_this, ls_item)
                        }
                    });
                } else {
                    bookShow(_this, ls_item)
                }
            }
        }
    });

    function moiveShow(_this, ls_item) {
        var storage = localStorage.getItem(ls_item);
        var data = JSON.parse(storage);
        var str = _this.attr("href");
        //console.log(data)
        var db_star = Math.ceil(data.rating);
        $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "' rel='noopener noreferrer'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.directors + " / 类型：" + data.genres + " / " + data.pubdate + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro + "</section></div></div><img loading='lazy' class='post-preview--image' src=" + data.cover + "></div>").replaceAll(_this);
    }

    function bookShow(_this, ls_item) {
        var storage = localStorage.getItem(ls_item);
        var data = JSON.parse(storage);
        var str = _this.attr("href");
        ///console.log(data)
        var db_star = Math.ceil(data.rating);
        $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "' rel='noopener noreferrer'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro + "</section></div></div><img loading='lazy' class='post-preview--image' src=" + data.cover + "></div>").replaceAll(_this);
    }
});
// 回到顶部
$('.to-top').toTop({
    //options with default values
    autohide: true,
    offset: 420,
    speed: 500,
    position: true,
    right: 15,
    bottom: 30
});
// 首页调用嘀咕 JSON 版
$(document).ready(function () {
    if ($("#index-talk").length > 0) {
        jsonUrl = "https://6561-eallion-8gkunp4re49bae66-1251347414.tcb.qcloud.la/json/talks.json"
        $.getJSON(jsonUrl + "?t=" + Date.parse(new Date()), function (res) {
            var bberCount = res.count;
            var talksHtml = ''
            $.each(res.data, function (i, item) {
                d = new Date(item.date)
                date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
                dataTime = '<span class="datatime">' + date + '</span>'
                talksHtml += '<li class="item item-' + (i + 1) + '">' + dataTime + '： <a href="https://eallion.com/talks/" target="_blank" rel="noopener noreferrer">' + urlToLink(item.content) + '</a></li>'
            });
            $('#index-talk').append('<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: -0.125em;" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M19 20a7 7 0 1 0 0-14a7 7 0 0 0 0 14ZM33 8s2.25 4.5 0 10m7-14s4.5 8.1 0 18M4 40.8V42h30v-1.2c0-4.48 0-6.72-.872-8.432a8 8 0 0 0-3.496-3.496C27.92 28 25.68 28 21.2 28h-4.4c-4.48 0-6.72 0-8.432.872a8 8 0 0 0-3.496 3.496C4 34.08 4 36.32 4 40.8Z"/></svg> <ul class="talk-list">' + talksHtml + '</ul>')
            Lately({
                'target': '.datatime'
            });
        });

        function urlToLink(str) {
            var re = /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|jfif|gif))\S+/g;
            var re_forpic = /\bhttps?:[^:<>"]*\/([^:<>"]*)(\.(jpe?g)|(png)|(bmp)|(jfif)|(webp))/g;
            str = str.replace(re, function (website) {
                return '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: -0.125em;" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z"/><path fill="currentColor" d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"/></svg>';
            });
            str = str.replace(re_forpic, function (imgurl) {
                return '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: -0.125em;" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71l-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0z"/></svg>';
            });
            //去掉 Share 标签
            var re_share = /(\#share)|(\#Share)/g;
            str = str.replace(re_share, '');
            return str;
        }

        function Roll() {
            var list_li = $('.talk-list li'),
                cur_li = list_li.first(),
                last_li = list_li.last();
            last_li.after(cur_li);
        };
        // 设置滚动间隔时间
        // 简单版本
        // setInterval(Roll, 1000);

        // 鼠标移入暂时滚动版本
        var timer = null;

        function startSetInterval() {
            timer = setInterval(Roll, 3000);
        }
        // start function on page load
        startSetInterval();

        // hover behaviour
        $('#index-talk').hover(function () {
            clearInterval(timer);
        }, function () {
            startSetInterval();
        });

        //点击关闭嘀咕 Widget
        $('button').click(function () {
            $(this).parents('#index-talk').remove();
        });
    }
});

// Prism
Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
    'tabs-to-spaces': 2,
    'indent': 0,
    /*
    'remove-initial-line-feed': false,
    'break-lines': 80,
    'spaces-to-tabs': 4*/
});

(function () {

    if (typeof Prism === 'undefined' || typeof document === 'undefined') {
        return;
    }

    if (!Prism.plugins.toolbar) {
        console.warn('Show Languages plugin loaded before Toolbar plugin.');

        return;
    }

    /* eslint-disable */

    // The languages map is built automatically with gulp
    var Languages = /*languages_placeholder[*/ {
        "none": "Plain text",
        "plain": "Plain text",
        "plaintext": "Plain text",
        "text": "Plain text",
        "txt": "Plain text",
        "html": "HTML",
        "xml": "XML",
        "svg": "SVG",
        "mathml": "MathML",
        "ssml": "SSML",
        "rss": "RSS",
        "css": "CSS",
        "clike": "C-like",
        "js": "JavaScript",
        "abap": "ABAP",
        "abnf": "ABNF",
        "al": "AL",
        "antlr4": "ANTLR4",
        "g4": "ANTLR4",
        "apacheconf": "Apache Configuration",
        "apl": "APL",
        "aql": "AQL",
        "ino": "Arduino",
        "arff": "ARFF",
        "armasm": "ARM Assembly",
        "arm-asm": "ARM Assembly",
        "art": "Arturo",
        "asciidoc": "AsciiDoc",
        "adoc": "AsciiDoc",
        "aspnet": "ASP.NET (C#)",
        "asm6502": "6502 Assembly",
        "asmatmel": "Atmel AVR Assembly",
        "autohotkey": "AutoHotkey",
        "autoit": "AutoIt",
        "avisynth": "AviSynth",
        "avs": "AviSynth",
        "avro-idl": "Avro IDL",
        "avdl": "Avro IDL",
        "awk": "AWK",
        "gawk": "GAWK",
        "basic": "BASIC",
        "bbcode": "BBcode",
        "bnf": "BNF",
        "rbnf": "RBNF",
        "bsl": "BSL (1C:Enterprise)",
        "oscript": "OneScript",
        "csharp": "C#",
        "cs": "C#",
        "dotnet": "C#",
        "cpp": "C++",
        "cfscript": "CFScript",
        "cfc": "CFScript",
        "cil": "CIL",
        "cmake": "CMake",
        "cobol": "COBOL",
        "coffee": "CoffeeScript",
        "conc": "Concurnas",
        "csp": "Content-Security-Policy",
        "css-extras": "CSS Extras",
        "csv": "CSV",
        "cue": "CUE",
        "dataweave": "DataWeave",
        "dax": "DAX",
        "django": "Django/Jinja2",
        "jinja2": "Django/Jinja2",
        "dns-zone-file": "DNS zone file",
        "dns-zone": "DNS zone file",
        "dockerfile": "Docker",
        "dot": "DOT (Graphviz)",
        "gv": "DOT (Graphviz)",
        "ebnf": "EBNF",
        "editorconfig": "EditorConfig",
        "ejs": "EJS",
        "etlua": "Embedded Lua templating",
        "erb": "ERB",
        "excel-formula": "Excel Formula",
        "xlsx": "Excel Formula",
        "xls": "Excel Formula",
        "fsharp": "F#",
        "firestore-security-rules": "Firestore security rules",
        "ftl": "FreeMarker Template Language",
        "gml": "GameMaker Language",
        "gamemakerlanguage": "GameMaker Language",
        "gap": "GAP (CAS)",
        "gcode": "G-code",
        "gdscript": "GDScript",
        "gedcom": "GEDCOM",
        "gettext": "gettext",
        "po": "gettext",
        "glsl": "GLSL",
        "gn": "GN",
        "gni": "GN",
        "linker-script": "GNU Linker Script",
        "ld": "GNU Linker Script",
        "go-module": "Go module",
        "go-mod": "Go module",
        "graphql": "GraphQL",
        "hbs": "Handlebars",
        "hs": "Haskell",
        "hcl": "HCL",
        "hlsl": "HLSL",
        "http": "HTTP",
        "hpkp": "HTTP Public-Key-Pins",
        "hsts": "HTTP Strict-Transport-Security",
        "ichigojam": "IchigoJam",
        "icu-message-format": "ICU Message Format",
        "idr": "Idris",
        "ignore": ".ignore",
        "gitignore": ".gitignore",
        "hgignore": ".hgignore",
        "npmignore": ".npmignore",
        "inform7": "Inform 7",
        "javadoc": "JavaDoc",
        "javadoclike": "JavaDoc-like",
        "javastacktrace": "Java stack trace",
        "jq": "JQ",
        "jsdoc": "JSDoc",
        "js-extras": "JS Extras",
        "json": "JSON",
        "webmanifest": "Web App Manifest",
        "json5": "JSON5",
        "jsonp": "JSONP",
        "jsstacktrace": "JS stack trace",
        "js-templates": "JS Templates",
        "keepalived": "Keepalived Configure",
        "kts": "Kotlin Script",
        "kt": "Kotlin",
        "kumir": "KuMir (КуМир)",
        "kum": "KuMir (КуМир)",
        "latex": "LaTeX",
        "tex": "TeX",
        "context": "ConTeXt",
        "lilypond": "LilyPond",
        "ly": "LilyPond",
        "emacs": "Lisp",
        "elisp": "Lisp",
        "emacs-lisp": "Lisp",
        "llvm": "LLVM IR",
        "log": "Log file",
        "lolcode": "LOLCODE",
        "magma": "Magma (CAS)",
        "md": "Markdown",
        "markup-templating": "Markup templating",
        "matlab": "MATLAB",
        "maxscript": "MAXScript",
        "mel": "MEL",
        "mongodb": "MongoDB",
        "moon": "MoonScript",
        "n1ql": "N1QL",
        "n4js": "N4JS",
        "n4jsd": "N4JS",
        "nand2tetris-hdl": "Nand To Tetris HDL",
        "naniscript": "Naninovel Script",
        "nani": "Naninovel Script",
        "nasm": "NASM",
        "neon": "NEON",
        "nginx": "nginx",
        "nsis": "NSIS",
        "objectivec": "Objective-C",
        "objc": "Objective-C",
        "ocaml": "OCaml",
        "opencl": "OpenCL",
        "openqasm": "OpenQasm",
        "qasm": "OpenQasm",
        "parigp": "PARI/GP",
        "objectpascal": "Object Pascal",
        "psl": "PATROL Scripting Language",
        "pcaxis": "PC-Axis",
        "px": "PC-Axis",
        "peoplecode": "PeopleCode",
        "pcode": "PeopleCode",
        "php": "PHP",
        "phpdoc": "PHPDoc",
        "php-extras": "PHP Extras",
        "plant-uml": "PlantUML",
        "plantuml": "PlantUML",
        "plsql": "PL/SQL",
        "powerquery": "PowerQuery",
        "pq": "PowerQuery",
        "mscript": "PowerQuery",
        "powershell": "PowerShell",
        "promql": "PromQL",
        "properties": ".properties",
        "protobuf": "Protocol Buffers",
        "purebasic": "PureBasic",
        "pbfasm": "PureBasic",
        "purs": "PureScript",
        "py": "Python",
        "qsharp": "Q#",
        "qs": "Q#",
        "q": "Q (kdb+ database)",
        "qml": "QML",
        "rkt": "Racket",
        "cshtml": "Razor C#",
        "razor": "Razor C#",
        "jsx": "React JSX",
        "tsx": "React TSX",
        "renpy": "Ren'py",
        "rpy": "Ren'py",
        "rest": "reST (reStructuredText)",
        "robotframework": "Robot Framework",
        "robot": "Robot Framework",
        "rb": "Ruby",
        "sas": "SAS",
        "sass": "Sass (Sass)",
        "scss": "Sass (Scss)",
        "shell-session": "Shell session",
        "sh-session": "Shell session",
        "shellsession": "Shell session",
        "sml": "SML",
        "smlnj": "SML/NJ",
        "solidity": "Solidity (Ethereum)",
        "sol": "Solidity (Ethereum)",
        "solution-file": "Solution file",
        "sln": "Solution file",
        "soy": "Soy (Closure Template)",
        "sparql": "SPARQL",
        "rq": "SPARQL",
        "splunk-spl": "Splunk SPL",
        "sqf": "SQF: Status Quo Function (Arma 3)",
        "sql": "SQL",
        "stata": "Stata Ado",
        "iecst": "Structured Text (IEC 61131-3)",
        "supercollider": "SuperCollider",
        "sclang": "SuperCollider",
        "systemd": "Systemd configuration file",
        "t4-templating": "T4 templating",
        "t4-cs": "T4 Text Templates (C#)",
        "t4": "T4 Text Templates (C#)",
        "t4-vb": "T4 Text Templates (VB)",
        "tap": "TAP",
        "tt2": "Template Toolkit 2",
        "toml": "TOML",
        "trickle": "trickle",
        "troy": "troy",
        "trig": "TriG",
        "ts": "TypeScript",
        "tsconfig": "TSConfig",
        "uscript": "UnrealScript",
        "uc": "UnrealScript",
        "uorazor": "UO Razor Script",
        "uri": "URI",
        "url": "URL",
        "vbnet": "VB.Net",
        "vhdl": "VHDL",
        "vim": "vim",
        "visual-basic": "Visual Basic",
        "vba": "VBA",
        "vb": "Visual Basic",
        "wasm": "WebAssembly",
        "web-idl": "Web IDL",
        "webidl": "Web IDL",
        "wiki": "Wiki markup",
        "wolfram": "Wolfram language",
        "nb": "Mathematica Notebook",
        "wl": "Wolfram language",
        "xeoracube": "XeoraCube",
        "xml-doc": "XML doc (.net)",
        "xojo": "Xojo (REALbasic)",
        "xquery": "XQuery",
        "yaml": "YAML",
        "yml": "YAML",
        "yang": "YANG"
    } /*]*/ ;

}());

$("code").addClass("language-none match-braces");

// theme main js
const container = document.querySelector(".container");
const menu = document.querySelector(".menu");
const mobileMenuTrigger = document.querySelector(".menu-trigger");
const desktopMenu = document.querySelector(".menu__inner--desktop");
const desktopMenuTrigger = document.querySelector(".menu__sub-inner-more-trigger");
const menuMore = document.querySelector(".menu__sub-inner-more");
const mobileQuery = getComputedStyle(document.body).getPropertyValue("--phoneWidth");
const isMobile = () => window.matchMedia(mobileQuery).matches;
const isMobileMenu = () => {
    mobileMenuTrigger && mobileMenuTrigger.classList.toggle("hidden", !isMobile());
    menu && menu.classList.toggle("hidden", isMobile());
    menuMore && menuMore.classList.toggle("hidden", !isMobile());
};

// Common

menu && menu.addEventListener("click", e => e.stopPropagation());
menuMore && menuMore.addEventListener("click", e => e.stopPropagation());

isMobileMenu();

document.body.addEventListener("click", () => {
    if (!isMobile() && menuMore && !menuMore.classList.contains("hidden")) {
        menuMore.classList.add("hidden");
    } else if (isMobile() && !menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
    }
});

window.addEventListener("resize", isMobileMenu);

// Mobile menu
mobileMenuTrigger &&
    mobileMenuTrigger.addEventListener("click", e => {
        e.stopPropagation();
        menu && menu.classList.toggle("hidden");
    });

// Desktop menu
desktopMenuTrigger &&
    desktopMenuTrigger.addEventListener("click", e => {
        e.stopPropagation();
        menuMore && menuMore.classList.toggle("hidden");

        if (
            menuMore &&
            menuMore.getBoundingClientRect().right > container.getBoundingClientRect().right
        ) {
            menuMore.style.left = "auto";
            menuMore.style.right = 0;
        }
    });

/*
// Theme original Toggle theme
const getTheme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
const isDark = getTheme === "dark";
// MediaQueryList object
const useDark = window.matchMedia("(prefers-color-scheme: dark)");

if (getTheme !== null) {
    document.body.classList.toggle("dark-theme", isDark);
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    window.localStorage &&
        window.localStorage.setItem(
            "theme",
            document.body.classList.contains("dark-theme") ? "dark" : "light",
        );
});
*/

//color components/schema eureka
function getcolorscheme() {
    let storageColorScheme = localStorage.getItem("lightDarkMode")
    let element = document.getElementById('lightDarkMode');
    let targetDiv = document.getElementById('lightDarkOptions');
    let targets = targetDiv.getElementsByTagName('span');
    let screen = document.getElementById('is-open');

    element.addEventListener('click', () => {
        targetDiv.classList.toggle('hidden')
        screen.classList.toggle('hidden')
    })

    for (let target of targets) {
        target.addEventListener('click', () => {
            let targetName = target.getAttribute("name")
            let icon = switchMode(targetName)
            let old_icon = element.firstElementChild.getAttribute("data-icon")
            element.firstElementChild.innerHTML=icon

            localStorage.setItem("lightDarkMode", targetName)

            targetDiv.classList.toggle('hidden')
            screen.classList.toggle('hidden')

            let event = new Event('themeChanged');
            document.dispatchEvent(event);
        })
    }
    screen.addEventListener('click', () => {
        targetDiv.classList.toggle('hidden')
        screen.classList.toggle('hidden')
    })
}

function switchMode(mode) {
    let icon = ''
    switch (mode) {
        case 'Light':
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener('change', switchDarkMode)
            icon = '<path fill="currentColor" d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10Z"></path><path fill="currentColor" fill-rule="evenodd" d="M12 1a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1ZM3.293 3.293a1 1 0 0 1 1.414 0l1.5 1.5a1 1 0 0 1-1.414 1.414l-1.5-1.5a1 1 0 0 1 0-1.414Zm17.414 0a1 1 0 0 1 0 1.414l-1.5 1.5a1 1 0 1 1-1.414-1.414l1.5-1.5a1 1 0 0 1 1.414 0ZM1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm19 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM6.207 17.793a1 1 0 0 1 0 1.414l-1.5 1.5a1 1 0 0 1-1.414-1.414l1.5-1.5a1 1 0 0 1 1.414 0Zm11.586 0a1 1 0 0 1 1.414 0l1.5 1.5a1 1 0 0 1-1.414 1.414l-1.5-1.5a1 1 0 0 1 0-1.414ZM12 20a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path>'
            document.body.classList.remove('dark')
            break
        case 'Dark':
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener('change', switchDarkMode)
            icon = '<path fill="currentColor" d="M20.958 15.325c.204-.486-.379-.9-.868-.684a7.684 7.684 0 0 1-3.101.648c-4.185 0-7.577-3.324-7.577-7.425a7.28 7.28 0 0 1 1.134-3.91c.284-.448-.057-1.068-.577-.936C5.96 4.041 3 7.613 3 11.862C3 16.909 7.175 21 12.326 21c3.9 0 7.24-2.345 8.632-5.675Z"></path><path fill="currentColor" d="M15.611 3.103c-.53-.354-1.162.278-.809.808l.63.945a2.332 2.332 0 0 1 0 2.588l-.63.945c-.353.53.28 1.162.81.808l.944-.63a2.332 2.332 0 0 1 2.588 0l.945.63c.53.354 1.162-.278.808-.808l-.63-.945a2.332 2.332 0 0 1 0-2.588l.63-.945c.354-.53-.278-1.162-.809-.808l-.944.63a2.332 2.332 0 0 1-2.588 0l-.945-.63Z"></path>'
            document.body.classList.add('dark')
            break
        case 'Auto':
            icon = '<path fill="currentColor" d="M12 2C6.579 2 2 6.58 2 12s4.579 10 10 10s10-4.58 10-10S17.421 2 12 2zm0 17V5c3.829 0 7 3.169 7 7c0 3.828-3.171 7-7 7z"></path>'
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
            switchDarkMode(isDarkMode)
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', switchDarkMode)
            break
    }
    return icon
}

function switchDarkMode(e) {
    if (e.matches) {
        document.body.classList.add('dark')
    } else {
        document.body.classList.remove('dark')
    }
}
