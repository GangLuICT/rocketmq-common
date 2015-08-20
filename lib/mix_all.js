/**
 * @author luckydrq(drqzju@gmail.com)
 * @date 2015-08-19
 */

'use strict';

var os = require('os');
var System = require('nsystem');

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

console.log(getLocalInetAddress())

function getLocalInetAddress() {
  var localAddresses = [];
  var getNetworkInterfaces = os.getNetworkInterfaces || os.networkInterfaces;
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
