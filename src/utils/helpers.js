const { URL } = require("url");

exports.getCurrentYear = function() {
  return new Date().getFullYear();
};

exports.extractFileNameFromAbsPath = function(path) {
  return path
    .split("/")
    .slice(-1)[0]
    .split(".")
    .slice(0, 1)[0];
};

exports.getSidebarData = function(pageSidebarIds, sidebarNodes) {
  let sidebarData = sidebarNodes
    .filter(({ node }) => {
      let sidebarIds = pageSidebarIds || [];
      return sidebarIds.indexOf(node.wordpress_id) > -1;
    })
    .map(({ node }) => node);
  return sidebarData;
};

exports.getPath = function(link) {
  let path = new URL(link);
  return path.href.replace(path.origin, "");
};

exports.sortByObjProp = function(ordered, objects, property) {
  ordered = ordered || [];
  return ordered.map(id => objects.find(item => item[property] === id));
};

exports.expires_in_days = function(days) {
  let now = new Date();
  let time = now.getTime();
  let expireTime = time + 1000 * 60 * 60 * 24 * days;
  now.setTime(expireTime);
  return now.toGMTString();
};

exports.commonStartOfWords = function(list) {
  return list.join(" ").match(/^([^\s]*)[^\s]*(?: \1[^\s]*)*$/)[1];
};

exports.setAttrs = function(el, attrs) {
  Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
};

exports.removeAttrs = function(el, attrs) {
  attrs.forEach(attr => el.removeAttribute(attr));
};

exports.isBrowser = typeof window !== "undefined";
exports.isDevelopment = process.env.NODE_ENV === "development";
