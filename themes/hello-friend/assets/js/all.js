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

/**
 * Lately.js - Native JavaScript, only 800Byte but simple and easy to use Timeago plugin
 *
 * @name Lately.js
 * @version 2.0.1
 * @author Tokin (Tokinx)
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * https://tokinx.github.io/lately/
 *
 * Copyright (c) 2017, Biji.IO
 */
 ; (function (global, undefined) {
    "use strict"
    let _global;
    let Lately = (option) => {
        let target = option.target || ".time";
        let lang = option.lang || {
            'second': '秒',
            'minute': '分钟',
            'hour': '小时',
            'day': '天',
            'month': '个月',
            'year': '年',
            'ago': '前',
            'error': 'NaN',
        };
        let _count = (date) => {
            date = new Date(date);
            let second = (new Date().getTime() - date.getTime()) / 1000,
                minute = second / 60,
                hour = minute / 60,
                day = hour / 24,
                month = day / 30,
                year = month / 12,
                floor = (num, _lang) => Math.floor(num) + _lang,
                result = '';
            if (year >= 1) result = floor(year, lang.year);
            else if (month >= 1) result = floor(month, lang.month);
            else if (day >= 1) result = floor(day, lang.day);
            else if (hour >= 1) result = floor(hour, lang.hour);
            else if (minute >= 1) result = floor(minute, lang.minute);
            else if (second >= 1) result = floor(second, lang.second);
            else result = lang.error;
            return result + lang.ago;
        }
        for (let contain of document.querySelectorAll(target)) {
            let date = '',
                date_time = contain.dateTime,
                title = contain.title,
                html = contain.innerHTML;
            if (date_time ? !isNaN(new Date(date_time = (date_time.replace(/(.*)[a-z](.*)\+(.*)/gi, "$1 $2")).replace(/-/g, "/"))) : false) date = date_time;
            else if (title ? !isNaN(new Date(title = title.replace(/-/g, "/"))) : false) date = title;
            else if (html ? !isNaN(new Date(html = html.replace(/-/g, "/"))) : false) date = html;
            else return;
            contain.title = date;
            contain.innerHTML = _count(date);
        }
    }

    _global = (function () { return this || (0, eval)('this'); }());
    !('Lately' in _global) && (_global.Lately = Lately);
}());
jQuery(document).ready(function ($) {
    //灯箱 (2022 年 4 月 24 日改为 fancybox)
    $(".post-content img:not(.avatar)").each(function () {
        var _b = $("<a></a>").attr({
            "href": this.src,
            "data-fancybox": "gallery"
        });
        $(this).wrap(_b);
    })
    // $(".post-content a[rel!=link]:has(img:not(.non-box))").slimbox();

    var selector = ".post-content a[rel!=link]:has(img:not(.non-box))";
    $('[data-fancybox="gallery"]').fancybox({
        selector: selector,
        loop: false,
        arrows: false,
        buttons: [
            //"zoom",
            //"share",
            //"slideShow",
            //"fullScreen",
            //"download",
            //"thumbs",
            "close"
        ],
        infobar: false,
        ideScrollbar: true,
        lang: "zh",
        i18n: {
            zh: {
                CLOSE: "关闭",
                NEXT: "下一张",
                PREV: "上一张",
                ERROR: "不能加载图片，<br/>请稍后再试。",
                PLAY_START: "播放幻灯片",
                PLAY_STOP: "暂停幻灯片",
                FULL_SCREEN: "全屏",
                THUMBS: "缩略图",
                DOWNLOAD: "下载",
                SHARE: "分享",
                ZOOM: "缩放"
            }
        }
    });
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
            $('#index-talk').append('<ul class="talk-list">' + talksHtml + '</ul>')
            Lately({
                'target': '.datatime'
            });
        });

        function urlToLink(str) {
            var re = /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|jfif|gif))\S+/g;
            var re_forpic = /\bhttps?:[^:<>"]*\/([^:<>"]*)(\.(jpe?g)|(png)|(bmp)|(jfif)|(webp))/g;
            str = str.replace(re, function (website) {
                return '🔗';
            });
            str = str.replace(re_forpic, function (imgurl) {
                return '🌅';
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
            timer = setInterval(Roll, 9000000);
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
            let old_icon = element.firstElementChild.getAttribute("xlink:href")
            element.firstElementChild.setAttribute("xlink:href", icon)
            element.firstElementChild.classList.add('icon')

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
            icon = '#icon-sun'
            document.body.classList.remove('dark')
            break
        case 'Dark':
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener('change', switchDarkMode)
            icon = '#icon-moon'
            document.body.classList.add('dark')
            break
        case 'Auto':
            icon = '#icon-dark'
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
/**
 *  Plugin Name: jQuery toTop for smoothly Scroll back to Top
 *  Plugin URL: https://github.com/mmkjony/jQuery.toTop
 *  Version: 1.1
 *  Author: MMK Jony
 *  Author URL: https://github.com/mmkjony
 *  License: Licensed under MIT
 **/

 (function( $ ){
    'use strict';

    $.fn.toTop = function(opt){

        //variables
        var elem = this;
        var win = $(window);
        var doc = $('html, body');

        //Extended Options
        var options = $.extend({
            autohide: true,
            offset: 420,
            speed: 500,
            position: true,
            right: 15,
            bottom: 30
        }, opt);

        elem.css({
            'cursor': 'pointer'
        });

        if(options.autohide){
            elem.css('display', 'none');
        }

        if(options.position){
            elem.css({
                'position': 'fixed',
                'right': options.right,
                'bottom': options.bottom,
            });
        }

        elem.click(function(){
            doc.animate({scrollTop: 0}, options.speed);
        });

        win.scroll(function(){
            var scrolling = win.scrollTop();

            if(options.autohide){
                if(scrolling > options.offset){
                    elem.fadeIn(options.speed);
                }
                else elem.fadeOut(options.speed);
            }

        });

    };

}( jQuery ));

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
