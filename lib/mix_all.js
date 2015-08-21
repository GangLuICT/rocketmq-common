/**
 * @author luckydrq(drqzju@gmail.com)
 * @date 2015-08-19
 */

'use strict';

var fs = require('fs');
var path = require('path');
var os = require('os');
var System = require('nsystem');
var mkdirp = require('mkdirp');

exports.ROCKETMQ_HOME_ENV = 'ROCKETMQ_HOME';
exports.ROCKETMQ_HOME_PROPERTY = 'rocketmq.home.dir';
exports.NAMESRV_ADDR_ENV = 'NAMESRV_ADDR';
exports.NAMESRV_ADDR_PROPERTY = 'rocketmq.namesrv.addr';
exports.MESSAGE_COMPRESS_LEVEL = 'rocketmq.message.compressLevel';
exports.WS_DOMAIN_NAME = System.getProperty('rocketmq.namesrv.domain', 'jmenv.tbsite.net');
exports.WS_DOMAIN_SUBGROUP = System.getProperty('rocketmq.namesrv.domain.subgroup', 'nsaddr');
// http://jmenv.tbsite.net:8080/rocketmq/nsaddr
exports.WS_ADDR = 'http://' + exports.WS_DOMAIN_NAME + ':8080/rocketmq/' + exports.WS_DOMAIN_SUBGROUP;
exports.DEFAULT_TOPIC = 'TBW102';
exports.BENCHMARK_TOPIC = 'BenchmarkTest';
exports.DEFAULT_PRODUCER_GROUP = 'DEFAULT_PRODUCER';
exports.DEFAULT_CONSUMER_GROUP = 'DEFAULT_CONSUMER';
exports.TOOLS_CONSUMER_GROUP = 'TOOLS_CONSUMER';
exports.FILTERSRV_CONSUMER_GROUP = 'FILTERSRV_CONSUMER';
exports.MONITOR_CONSUMER_GROUP = '__MONITOR_CONSUMER';
exports.CLIENT_INNER_PRODUCER_GROUP = 'CLIENT_INNER_PRODUCER';
exports.SELF_TEST_PRODUCER_GROUP = 'SELF_TEST_P_GROUP';
exports.SELF_TEST_CONSUMER_GROUP = 'SELF_TEST_C_GROUP';
exports.SELF_TEST_TOPIC = 'SELF_TEST_TOPIC';
exports.OFFSET_MOVED_EVENT = 'OFFSET_MOVED_EVENT';
exports.ONS_HTTP_PROXY_GROUP = 'CID_ONS-HTTP-PROXY';

exports.LocalInetAddrs = getLocalInetAddress();
exports.localhost = getLocalHost();
exports.DEFAULT_CHARSET = 'utf-8';
exports.MASTER_ID = 0;
exports.CURRENT_JVM_PID = process.pid;
// 为每个Consumer Group建立一个默认的Topic，前缀 + GroupName，用来保存处理失败需要重试的消息
exports.RETRY_GROUP_TOPIC_PREFIX = '%RETRY%';
// 为每个Consumer Group建立一个默认的Topic，前缀 + GroupName，用来保存重试多次都失败，接下来不再重试的消息
exports.DLQ_GROUP_TOPIC_PREFIX = '%DLQ%';

exports.getRetryTopic = function(consumerGroup) {
  return exports.RETRY_GROUP_TOPIC_PREFIX + consumerGroup;
};

exports.getDLQTopic = function(consumerGroup) {
  return exports.DLQ_GROUP_TOPIC_PREFIX + consumerGroup;
};

exports.getPID = function() {
  return process.pid;
};

exports.createBrokerId = function(ip, port) {

};

/**
 * 安全地写文件
 */
exports.string2File = function(str, fileName) {
  // 先写入临时文件
  var tmpFile = fileName + '.tmp';
  exports.string2FileNotSafe(str, tmpFile);

  // 备份之前的文件
  var bakFile = fileName + '.bak';
  var prevContent = exports.file2String(fileName);
  if (prevContent) {
    exports.string2FileNotSafe(prevContent, bakFile);
  }

  // 删除正式文件
  fs.unlinkSync(fileName);

  // 临时文件改为正式文件
  fs.renameSync(tmpFile, fileName);
};

exports.string2FileNotSafe = function(str, fileName) {
  var parentDir = path.dirname(fileName);
  if (!fs.existsSync(parentDir)) {
    mkdirp.sync(parentDir, parseInt('0755', 8));
  }
  fs.writeFileSync(fileName, str, { encoding: 'utf-8' });
};

exports.file2String = function(fileName) {
  return fs.readFileSync(fileName, { encoding: 'utf-8' });
};


function getLocalHost() {
  var result = getLocalInetAddress();
  for (var i = 0; i < result.length; i++) {
    var ip = result[i];
    // 只查IPv4
    if (ip.split('.').length === 4) {
      if (ip !== '127.0.0.1') {
        return ip;
      }
    }
  }
  return '127.0.0.1';
}

function getLocalInetAddress() {
  var localAddresses = [];
  var getNetworkInterfaces = os.networkInterfaces || os.getNetworkInterfaces;
  var inetInterfaces = getNetworkInterfaces();

  Object.keys(inetInterfaces).forEach(function(key) {
    var addrs = inetInterfaces[key];
    addrs.forEach(function(addr) {
      if (addr.family === 'IPv6') {
        localAddresses.push(getAddress(addr) + '%' + key);
      } else {
        localAddresses.push(getAddress(addr));
      }
    });
  });
  return localAddresses;
}

function getAddress(addr) {
  var address = addr.address;
  var family = addr.family;

  // IPv6 进行长度补足
  // `::1` => `0:0:0:0:0:0:0:1`
  if (family === 'IPv6') {
    address = address.split(':');
    var totalLength = 8;
    var validLength = address.filter(function(s) {
      return s !== '';
    }).length;
    var leftLength = totalLength - validLength;

    var tempArr = [];
    for (var i = 0; i < address.length; i++) {
      var part = address[i];
      if (part === '' && leftLength > 0) {
        // 出现第一个空串就全部用0补足
        tempArr.push(duplicate('0', leftLength, ':'));
        leftLength = 0;
      } else if (part !== '') {
        tempArr.push(part);
      }
    }
    address = tempArr.join(':');
  }
  return address;
}

function duplicate(s, num, sep) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(s);
  }
  return arr.join(sep || '');
}
