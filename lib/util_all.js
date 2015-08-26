'use strict';

var moment = require('moment');
var EOL = require('os').EOL;

exports.yyyy_MM_dd_HH_mm_ss = 'yyyy-MM-dd HH:mm:ss';
exports.yyyy_MM_dd_HH_mm_ss_SSS = 'yyyy-MM-dd#HH:mm:ss:SSS';
exports.yyyyMMddHHmmss = 'yyyyMMddHHmmss';
exports.getPid = function() {
  return process.pid;
};
exports.currentStackTrace = function() {
  var stack = [];
  try {
    throw new Error();
  } catch(e) {
    stack = e.stack.split(EOL);
    stack.pop();
  } finally {
    return stack.join(EOL);
  }
};

/**
 * 将offset转化成字符串形式<br>
 * 左补零对齐至20位
 */
exports.offset2FileName = function(offset) {
  offset = String(~~offset);
  var len = offset.length;
  if (len < 20) {
    for (var i = 0, l = 20 - len; i < l; i++) {
      offset = '0' + offset;
    }
  }
  return offset;
};

/**
 * 计算耗时操作，单位ms
 */
exports.computeEclipseTimeMilliseconds = function(beginTime) {
  var now = +new Date();
  return (now - beginTime);
};

exports.isItTimeToDo = function(when) {
  var hours = when.split(';');
  var nowHour = new Date().getHours();
  if (hours.length > 0) {
    for (var i = 0; i < hours.length; i++) {
      var hour = parseInt(hours[i], 10);
      if (hour === nowHour) {
        return true;
      }
    }
  }
  return false;
};

exports.timeMillisToHumanString = function(t) {
  t = t || (+new Date());
  return moment(t).format('YYYYMMDDHHmmssSSS');
};

exports.computNextMorningTimeMillis = function() {
  return +moment().add(1, 'days')
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
    .toDate();
};

exports.computNextMinutesTimeMillis = function() {
  return +moment().add(1, 'minutes')
    .seconds(0)
    .milliseconds(0)
    .toDate();
};

exports.computNextHourTimeMillis = function() {
  return +moment().add(1, 'hours')
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
    .toDate();
};

exports.computNextHalfHourTimeMillis = function() {
  return +moment().add(1, 'hours')
    .minutes(30)
    .seconds(0)
    .milliseconds(0)
    .toDate();
};
