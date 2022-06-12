"use strict";
var common_vendor = require("../vendor.js");
const baseUrl = "https://m.meijiavip.com";
function requestGet(url, params) {
  return new Promise((resolve, reject) => {
    url = baseUrl + `/api` + url.split("/api")[2];
    common_vendor.index.request({
      url,
      method: "GET",
      data: params,
      success: function(res) {
        resolve(res.data);
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}
function requestPost(url, params) {
  return new Promise((resolve, reject) => {
    url = baseUrl + url.split("/api")[1];
    common_vendor.index.request({
      url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: params,
      success: function(res) {
        resolve(res.data);
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}
exports.requestGet = requestGet;
exports.requestPost = requestPost;
