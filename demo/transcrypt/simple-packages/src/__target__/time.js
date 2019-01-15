"use strict";
exports.__esModule = true;
// Transcrypt'ed from Python, 2019-01-15 11:01:47
var org_transcrypt___runtime___js_1 = require("./org.transcrypt.__runtime__.js");
var __name__ = 'time';
try {
    var __language = window.navigator.language;
}
catch (__except0__) {
    var __language = 'en-US';
}
exports.__debugGetLanguage = function () {
    return __language;
};
exports.__adapt__ = function (request) {
    __language = request.headers['accept-language'].py_split(',')[0];
};
exports.__date = new Date(0);
exports.__now = new Date();
exports.__weekdays = [];
exports.__weekdays_long = [];
exports.__d = new Date(1467662339080);
for (var i = 0; i < 7; i++) {
    for (var _i = 0, _a = org_transcrypt___runtime___js_1.tuple([org_transcrypt___runtime___js_1.tuple([exports.__weekdays, 'short']), org_transcrypt___runtime___js_1.tuple([exports.__weekdays_long, 'long'])]); _i < _a.length; _i++) {
        var _b = _a[_i], l = _b[0], s = _b[1];
        l.append(exports.__d.toLocaleString(__language, org_transcrypt___runtime___js_1.dict({ 'weekday': s })).lower());
    }
    exports.__d.setDate(exports.__d.getDate() + 1);
}
exports.__months = [];
exports.__months_long = [];
var __d = new Date(946681200000.0);
for (var i = 0; i < 12; i++) {
    for (var _c = 0, _d = org_transcrypt___runtime___js_1.tuple([org_transcrypt___runtime___js_1.tuple([exports.__months, 'short']), org_transcrypt___runtime___js_1.tuple([exports.__months_long, 'long'])]); _c < _d.length; _c++) {
        var _e = _d[_c], l = _e[0], s = _e[1];
        l.append(exports.__d.toLocaleString(__language, org_transcrypt___runtime___js_1.dict({ 'month': s })).lower());
    }
    exports.__d.setMonth(exports.__d.getMonth() + 1);
}
exports.__lu = org_transcrypt___runtime___js_1.dict({ 'Y': 0, 'm': 1, 'd': 2, 'H': 3, 'M': 4, 'S': 5 });
exports._lsplit = function (s, sep, maxsplit) {
    if (maxsplit == 0) {
        return [s];
    }
    var py_split = s.py_split(sep);
    if (!(maxsplit)) {
        return py_split;
    }
    var ret = py_split.slice(0, maxsplit, 1);
    if (org_transcrypt___runtime___js_1.len(ret) == org_transcrypt___runtime___js_1.len(py_split)) {
        return ret;
    }
    ret.append(sep.join(py_split.__getslice__(maxsplit, null, 1)));
    return ret;
};
exports._local_time_tuple = function (jd) {
    var res = org_transcrypt___runtime___js_1.tuple([jd.getFullYear(), jd.getMonth() + 1, jd.getDate(), jd.getHours(), jd.getMinutes(), jd.getSeconds(), (jd.getDay() > 0 ? jd.getDay() - 1 : 6), exports._day_of_year(jd, true), exports._daylight_in_effect(jd), jd.getMilliseconds()]);
    return res;
};
exports._utc_time_tuple = function (jd) {
    var res = org_transcrypt___runtime___js_1.tuple([jd.getUTCFullYear(), jd.getUTCMonth() + 1, jd.getUTCDate(), jd.getUTCHours(), jd.getUTCMinutes(), jd.getUTCSeconds(), jd.getUTCDay() - 1, exports._day_of_year(jd, false), 0, jd.getUTCMilliseconds()]);
    return res;
};
exports._day_of_year = function (jd, local) {
    var day_offs = 0;
    if (jd.getHours() + (jd.getTimezoneOffset() * 60) / 3600 < 0) {
        var day_offs = -(1);
    }
    var was = jd.getTime();
    var cur = jd.setHours(23);
    jd.setUTCDate(1);
    jd.setUTCMonth(0);
    jd.setUTCHours(0);
    jd.setUTCMinutes(0);
    jd.setUTCSeconds(0);
    var res = org_transcrypt___runtime___js_1.round((cur - jd) / 86400000);
    if (!(local)) {
        res += day_offs;
    }
    if (res == 0) {
        var res = 365;
        jd.setTime(jd.getTime() - 86400);
        var last_year = jd.getUTCFullYear();
        if (exports._is_leap(last_year)) {
            var res = 366;
        }
    }
    jd.setTime(was);
    return res;
};
exports._is_leap = function (year) {
    return org_transcrypt___runtime___js_1.__mod__(year, 4) == 0 && (org_transcrypt___runtime___js_1.__mod__(year, 100) != 0 || org_transcrypt___runtime___js_1.__mod__(year, 400) == 0);
};
exports.__jan_jun_tz = function (t, func) {
    var was = t.getTime();
    t.setDate(1);
    var res = [];
    for (var _i = 0, _a = org_transcrypt___runtime___js_1.tuple([0, 6]); _i < _a.length; _i++) {
        var m = _a[_i];
        t.setMonth(m);
        if (!(func)) {
            res.append(t.getTimezoneOffset());
        }
        else {
            res.append(func(t));
        }
    }
    t.setTime(was);
    return res;
};
exports._daylight = function (t) {
    var jj = exports.__jan_jun_tz(t);
    if (jj[0] != jj[1]) {
        return 1;
    }
    return 0;
};
exports._daylight_in_effect = function (t) {
    var jj = exports.__jan_jun_tz(t);
    if (org_transcrypt___runtime___js_1.min(jj[0], jj[1]) == t.getTimezoneOffset()) {
        return 1;
    }
    return 0;
};
exports._timezone = function (t) {
    var jj = exports.__jan_jun_tz(t);
    return org_transcrypt___runtime___js_1.max(jj[0], jj[1]);
};
exports.__tzn = function (t) {
    try {
        return org_transcrypt___runtime___js_1.str(t).py_split('(')[1].py_split(')')[0];
    }
    catch (__except0__) {
        return 'n.a.';
    }
};
exports._tzname = function (t) {
    var cn = exports.__tzn(t);
    var ret = [cn, cn];
    var jj = exports.__jan_jun_tz(t, exports.__tzn);
    var ind = 0;
    if (!(exports._daylight_in_effect(t))) {
        var ind = 1;
    }
    for (var _i = 0, jj_1 = jj; _i < jj_1.length; _i++) {
        var i = jj_1[_i];
        if (i != cn) {
            ret[ind] = i;
        }
    }
    return org_transcrypt___runtime___js_1.tuple(ret);
};
exports.altzone = exports.__now.getTimezoneOffset();
if (!(exports._daylight_in_effect(exports.__now))) {
    var _jj = exports.__jan_jun_tz(exports.__now);
    var altzone = (exports.altzone == _jj[1] ? _jj[0] : _jj[1]);
}
var altzone = exports.altzone * 60;
exports.timezone = exports._timezone(exports.__now) * 60;
exports.daylight = exports._daylight(exports.__now);
exports.tzname = exports._tzname(exports.__now);
exports.time = function () {
    return Date.now() / 1000;
};
exports.asctime = function (t) {
    return exports.strftime('%a %b %d %H:%M:%S %Y', t);
};
exports.mktime = function (t) {
    var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5], 0);
    return (d - 0) / 1000;
};
exports.ctime = function (seconds) {
    if (!(seconds)) {
        var seconds = exports.time();
    }
    return exports.asctime(exports.localtime(seconds));
};
exports.localtime = function (seconds) {
    if (!(seconds)) {
        var seconds = exports.time();
    }
    return exports.gmtime(seconds, true);
};
exports.gmtime = function (seconds, localtime) {
    if (!(seconds)) {
        var seconds = exports.time();
    }
    var millis = seconds * 1000;
    exports.__date.setTime(millis);
    if (localtime) {
        var t = exports._local_time_tuple(exports.__date);
    }
    else {
        var t = exports._utc_time_tuple(exports.__date);
    }
    return t.__getslice__(0, 9, 1);
};
exports.strptime = function (string, format) {
    if (!(format)) {
        var format = '%a %b %d %H:%M:%S %Y';
    }
    var __left0__ = org_transcrypt___runtime___js_1.tuple([string, format]);
    var ts = __left0__[0];
    var fmt = __left0__[1];
    var get_next = function (fmt) {
        var get_sep = function (fmt) {
            var res = [];
            if (!(fmt)) {
                return org_transcrypt___runtime___js_1.tuple(['', '']);
            }
            for (var i = 0; i < org_transcrypt___runtime___js_1.len(fmt) - 1; i++) {
                var c = fmt[i];
                if (c == '%') {
                    break;
                }
                res.append(c);
            }
            return org_transcrypt___runtime___js_1.tuple([''.join(res), fmt.__getslice__(i, null, 1)]);
        };
        var __left0__ = org_transcrypt___runtime___js_1.tuple([null, null, null]);
        var d = __left0__[0];
        var sep = __left0__[1];
        var f = __left0__[2];
        if (fmt) {
            if (fmt[0] == '%') {
                var d = fmt[1];
                var __left0__ = get_sep(fmt.__getslice__(2, null, 1));
                var sep = __left0__[0];
                var f = __left0__[1];
            }
            else {
                var __left0__ = get_sep(fmt);
                var sep = __left0__[0];
                var f = __left0__[1];
            }
        }
        return org_transcrypt___runtime___js_1.tuple([d, sep, f]);
    };
    var dir_val = org_transcrypt___runtime___js_1.dict({});
    while (ts) {
        var __left0__ = get_next(fmt);
        var d = __left0__[0];
        var sep = __left0__[1];
        var fmt = __left0__[2];
        if (sep == '') {
            var lv = null;
            if (d) {
                var l = -(1);
                if (d == 'Y') {
                    var l = 4;
                }
                else if (d == 'a') {
                    var l = org_transcrypt___runtime___js_1.len(exports.__weekdays[0]);
                }
                else if (d == 'A') {
                    var l = org_transcrypt___runtime___js_1.len(exports.__weekdays_long[0]);
                }
                else if (d == 'b') {
                    var l = org_transcrypt___runtime___js_1.len(exports.__months[0]);
                }
                else if (org_transcrypt___runtime___js_1.__in__(d, org_transcrypt___runtime___js_1.tuple(['d', 'm', 'H', 'M', 'S']))) {
                    var l = 2;
                }
                if (l > -(1)) {
                    var lv = [ts.__getslice__(0, l, 1), ts.__getslice__(l, null, 1)];
                }
            }
            if (!(lv)) {
                var lv = [ts, ''];
            }
        }
        else {
            var lv = exports._lsplit(ts, sep, 1);
        }
        if (d == null) {
            var ts = lv[1];
            continue;
        }
        var __left0__ = org_transcrypt___runtime___js_1.tuple([lv[1], lv[0]]);
        var ts = __left0__[0];
        dir_val[d] = __left0__[1];
        if (fmt == '') {
            break;
        }
    }
    var t = [1900, 1, 1, 0, 0, 0, 0, 1, -(1)];
    var ignore_keys = [];
    var have_weekday = false;
    for (var _i = 0, _a = dir_val.py_items(); _i < _a.length; _i++) {
        var _b = _a[_i], d = _b[0], v = _b[1];
        if (org_transcrypt___runtime___js_1.__in__(d, ignore_keys)) {
            continue;
        }
        if (d == 'p') {
            continue;
        }
        if (org_transcrypt___runtime___js_1.__in__(d, exports.__lu.py_keys())) {
            t[exports.__lu[d]] = org_transcrypt___runtime___js_1.int(v);
            continue;
        }
        if (org_transcrypt___runtime___js_1.__in__(d, org_transcrypt___runtime___js_1.tuple(['a', 'A', 'b', 'B']))) {
            var v = v.lower();
        }
        if (d == 'm') {
            ignore_keys.append('b');
            ignore_keys.append('B');
        }
        if (d == 'a') {
            if (!(org_transcrypt___runtime___js_1.__in__(v, exports.__weekdays))) {
                var __except0__ = org_transcrypt___runtime___js_1.ValueError('Weekday unknown in your locale');
                __except0__.__cause__ = null;
                throw __except0__;
            }
            var have_weekday = true;
            t[6] = exports.__weekdays.index(v);
        }
        else if (d == 'A') {
            if (!(org_transcrypt___runtime___js_1.__in__(v, exports.__weekdays_long))) {
                var __except0__ = org_transcrypt___runtime___js_1.ValueError('Weekday unknown in your locale');
                __except0__.__cause__ = null;
                throw __except0__;
            }
            var have_weekday = true;
            t[6] = exports.__weekdays_long.index(v);
        }
        else if (d == 'b') {
            if (!(org_transcrypt___runtime___js_1.__in__(v, exports.__months))) {
                var __except0__ = org_transcrypt___runtime___js_1.ValueError('Month unknown in your locale');
                __except0__.__cause__ = null;
                throw __except0__;
            }
            t[1] = exports.__months.index(v) + 1;
        }
        else if (d == 'B') {
            if (!(org_transcrypt___runtime___js_1.__in__(v, exports.__months_long))) {
                var __except0__ = org_transcrypt___runtime___js_1.ValueError('Month unknown in your locale');
                __except0__.__cause__ = null;
                throw __except0__;
            }
            t[1] = exports.__months_long.index(v) + 1;
        }
        else if (d == 'I') {
            var ampm = dir_val['p'] || 'am';
            var ampm = ampm.lower();
            var v = org_transcrypt___runtime___js_1.int(v);
            if (v == 12) {
                var v = 0;
            }
            else if (v > 12) {
                var __except0__ = org_transcrypt___runtime___js_1.ValueError(((("time data '" + string) + "' does not match format '") + format) + "'");
                __except0__.__cause__ = null;
                throw __except0__;
            }
            if (ampm == 'pm') {
                v += 12;
            }
            t[exports.__lu['H']] = v;
        }
        else if (d == 'y') {
            t[0] = 2000 + org_transcrypt___runtime___js_1.int(v);
        }
        else if (d == 'Z') {
            if (org_transcrypt___runtime___js_1.__in__(v.lower(), ['gmt', 'utc'])) {
                t[-(1)] = 0;
            }
        }
    }
    var __date = new Date(0);
    __date.setUTCFullYear(t[0]);
    __date.setUTCMonth(t[1] - 1);
    __date.setUTCDate(t[2]);
    __date.setUTCHours(t[3]);
    t[7] = exports._day_of_year(__date, true);
    if (!(have_weekday)) {
        t[6] = __date.getUTCDay() - 1;
    }
    return t;
};
exports.strftime = function (format, t) {
    var zf2 = function (v) {
        if (v < 10) {
            return '0' + org_transcrypt___runtime___js_1.str(v);
        }
        return v;
    };
    if (!(t)) {
        var t = exports.localtime();
    }
    var f = format;
    for (var _i = 0, _a = exports.__lu.py_keys(); _i < _a.length; _i++) {
        var d = _a[_i];
        var k = '%' + d;
        if (!(org_transcrypt___runtime___js_1.__in__(k, f))) {
            continue;
        }
        var v = zf2(t[exports.__lu[d]]);
        var f = f.py_replace(k, v);
    }
    for (var _b = 0, _c = org_transcrypt___runtime___js_1.tuple([org_transcrypt___runtime___js_1.tuple(['b', exports.__months, 1]), org_transcrypt___runtime___js_1.tuple(['B', exports.__months_long, 1]), org_transcrypt___runtime___js_1.tuple(['a', exports.__weekdays, 6]), org_transcrypt___runtime___js_1.tuple(['A', exports.__weekdays_long, 6])]); _b < _c.length; _b++) {
        var _d = _c[_b], d = _d[0], l = _d[1], pos = _d[2];
        var p = t[pos];
        if (pos == 1) {
            var p = p - 1;
        }
        var v = l[p].capitalize();
        var f = f.py_replace('%' + d, v);
    }
    if (org_transcrypt___runtime___js_1.__in__('%p', f)) {
        if (t[3] > 11) {
            var ap = 'PM';
        }
        else {
            var ap = 'AM';
        }
        var f = f.py_replace('%p', ap);
    }
    if (org_transcrypt___runtime___js_1.__in__('%y', f)) {
        var f = f.py_replace('%y', org_transcrypt___runtime___js_1.str(t[0]).__getslice__(-(2), null, 1));
    }
    if (org_transcrypt___runtime___js_1.__in__('%I', f)) {
        var v = t[3];
        if (v == 0) {
            var v = 12;
        }
        else if (v > 12) {
            var v = v - 12;
        }
        var f = f.py_replace('%I', zf2(v));
    }
    return f;
};
//# sourceMappingURL=time.map
