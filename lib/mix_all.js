/**
 * @author luckydrq(drqzju@gmail.com)
 * @date 2015-08-19
 */

'use strict';

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

