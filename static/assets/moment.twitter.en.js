// 处理发布时间 moment.js
// moment.js locale
moment.updateLocale('zh-cn', {
    meridiem: function (hour, minute, isLowercase) {
        if (hour < 6) {
            return "Before dawn";
        } else if (hour < 9) {
            return "Early morning";
        } else if (hour < 11 && minute < 30) {
            return "Morning";
        } else if (hour < 13 && minute < 30) {
            return "Noon";
        } else if (hour < 18) {
            return "Afternoon";
        } else {
            return "Evening";
        }
    }
});
// moment.js twitter plugin
(function () {
    var day, formats, hour, initialize, minute, second, week;
    second = 1e3;
    minute = 6e4;
    hour = 36e5;
    day = 864e5;
    week = 6048e5;
    year = new Date().getFullYear();
    formats = {
        seconds: {
            short: ' Seconds ago',
            long: ' Seconds ago'
        },
        minutes: {
            short: ' Minutes ago',
            long: ' Minutes ago'
        },
        hours: {
            short: ' Hours ago',
            long: ' Hours ago'
        },
        days: {
            short: ' Days ago',
            long: ' Days ago'
        }
    };

    initialize = function (moment) {
        var twitterFormat;
        twitterFormat = function (format) {
            var diff, num, unit, unitStr;
            diff = Math.abs(this.diff(moment()));
            unit = null;
            num = null;
            if (diff <= second) {
                unit = 'seconds';
                num = 1;
            } else if (diff < minute) {
                unit = 'seconds';
            } else if (diff < hour) {
                unit = 'minutes';
            } else if (diff < day) {
                unit = 'hours';
            } else if (format === 'short') {
                if (diff < week) {
                    unit = 'days';
                } else if (this.year() == year) {
                    return this.format('MMM. DD，HH:mm · a ');
                } else {
                    return this.format('MMM. DD. YYYY，HH:mm · a ');
                }
            } else {
                return this.format('MMM. DD. YYYY，HH:mm · a ');
            }
            if (!(num && unit)) {
                num = moment.duration(diff)[unit]();
            }
            unitStr = unit = formats[unit][format];
            if (format === 'long' && num > 1) {
                unitStr += 's';
            }
            return num + unitStr;
        };
        moment.fn.twitterLong = function () {
            return twitterFormat.call(this, 'long');
        };
        moment.fn.twitter = moment.fn.twitterShort = function () {
            return twitterFormat.call(this, 'short');
        };
        return moment;
    };

    if (typeof define === 'function' && define.amd) {
        define('moment-twitter', ['moment'], function (moment) {
            return this.moment = initialize(moment);
        });
    } else if (typeof module !== 'undefined') {
        module.exports = initialize(require('moment'));
    } else if (typeof window !== "undefined" && window.moment) {
        this.moment = initialize(this.moment);
    }

}).call(this);
