exports.getCurrentYear = function() { return (new Date()).getFullYear() }

exports.extractFileNameFromAbsPath = function (path) {
  return path.split('/').slice(-1)[0].split('.').slice(0,1)[0]
}
