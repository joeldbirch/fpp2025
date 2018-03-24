const {URL} = require('url')

exports.getCurrentYear = function() { return (new Date()).getFullYear() }

exports.extractFileNameFromAbsPath = function (path) {
  return path.split('/').slice(-1)[0].split('.').slice(0,1)[0]
}

exports.getSidebarData = function(pageSidebarIds, sidebarNodes) {
  let sidebarData = sidebarNodes.filter(({node}) => {
    let sidebarIds = pageSidebarIds || []
    return sidebarIds.indexOf(node.wordpress_id) > -1
  }).map(({node}) => node)

  sidebarData.forEach(node => console.log(node.wordpress_id))
  console.log("\n")

  return sidebarData
}

exports.getPath = function(link) {
  let path = new URL(link)
  return path.href.replace(path.origin, '')
}

exports.sortByObjProp = function(ordered, objects, property) {
  return ordered.map(
    id => objects.find(
      item => item[property] === id
    )
  )
}
