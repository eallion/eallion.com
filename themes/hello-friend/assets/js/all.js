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
            $('#index-talk').append('<span class="iconify-inline" data-icon="icon-park-outline:people-speak"></span> <ul class="talk-list">' + talksHtml + '</ul>')
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
                return '<span class=emoji>🖼︎</span>';
            });
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

    /* eslint-enable */

    Prism.plugins.toolbar.registerButton('show-language', function (env) {
        var pre = env.element.parentNode;
        if (!pre || !/pre/i.test(pre.nodeName)) {
            return;
        }

        /**
         * Tries to guess the name of a language given its id.
         *
         * @param {string} id The language id.
         * @returns {string}
         */
        function guessTitle(id) {
            if (!id) {
                return id;
            }
            return (id.substring(0, 1).toUpperCase() + id.substring(1)).replace(/s(?=cript)/, 'S');
        }

        var language = pre.getAttribute('data-language') || Languages[env.language] || guessTitle(env.language);

        if (!language) {
            return;
        }
        var element = document.createElement('span');
        element.textContent = language;

        return element;
    });

}());

$( "code" ).addClass( "language-none match-braces" );
