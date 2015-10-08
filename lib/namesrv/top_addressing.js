/**
 * - lib/namesrv/top_addressing.js
 * @author luckydrq(drqzju@gmail.com)
 * @date 2015-08-27
 */

'use strict';

var HttpTinyClient = require('../utils/http_tiny_client');

module.exports = TopAddressing;

/**
 * 寻址服务
 */
function TopAddressing(wsAddr) {
  this.wsAddr = wsAddr;
  this.nsAddr = null;
}

var proto = TopAddressing.prototype;

proto.fetchNSAddr = function(verbose, timeoutMills) {
  if (arguments.length === 0) {
    verbose = true;
    timeoutMills = 3000;
  }
  
};

TopAddressing.clearNewLine = function(str) {
  var newString = str.trim();
  var index = newString.indexOf('\r');
  if (index !== -1) {
    return newString.slice(0, index);
  }

  index = newString.indexOf('\n');
  if (index !== -1) {
    return newString.slice(0, index);
  }

  return newString;
};
