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
