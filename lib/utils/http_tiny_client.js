/**
 * - lib/utils/http_tiny_client.js
 * @author luckydrq(drqzju@gmail.com)
 * @date 2015-08-27
 */

'use strict';

/**
 * 发送Get请求
 */
exports.httpGet = function(url, headers, paramValues, encoding, readTimeoutMs, callback) {
  
};

exports.encodingParams = function(paramValues, encoding) {
  if (!paramValues || paramValues.length === 0) {
    return null;
  }

};

exports.HttpResult = function(code, content) {
  this.code = code;
  this.content = content;
};
