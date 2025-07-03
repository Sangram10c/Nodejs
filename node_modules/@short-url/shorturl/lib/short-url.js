"use strict";

var fetchUrl = require("fetch").fetchUrl;

var API_URL = "https://short-url.asia/api/";
var PUBLIC_KEY = "vnfhu9O2zaiq";
var PREMIUM_TYPE = "REDIRECTYPE";

module.exports.ShortUrl = ShortUrl;
module.exports.makeShortUrl = makeShortUrl;

function ShortUrl(key) {
  this.apiUrl = API_URL;
  this.key = key || PUBLIC_KEY;
}

ShortUrl.prototype.make = function (url, options, callback) {
  if (url === null || url === undefined) {
    throw new Error("url not defined");
  }

  url = encodeURI(url);
  options = options || {};

  var headers = options.headers || {};
  var params = { key: this.key, url: url };

  if (options.custom) {
    params.custom = options.custom;
  }

  if (options.premium) {
    params.type = PREMIUM_TYPE;
  }

  var query = "";

  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      query += query ? `&${key}=${params[key]}` : `?${key}=${params[key]}`;
    }
  }

  var fullURL = this.apiUrl + query;

  return fetchUrl(fullURL, { headers }, function (error, meta, body) {
    if (error) {
      return callback(error.message || error, null);
    }

    var data = JSON.parse(body.toString());

    if (data.error != 0) {
      return callback(data.msg || data, null);
    }

    return callback(null, data.short);
  });
};

function makeShortUrl(url, options, callback) {
  options = options || {};

  var shortUrl = new ShortUrl(options.key || null);

  return new Promise(function (resolve, reject) {
    shortUrl.make(url, options, function (error, data) {
      if (callback) {
        callback(error, data);
      }

      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });
}
