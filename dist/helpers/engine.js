"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
function replaceKeys (partHtml, object) {
    for (let key in object) {
        partHtml = partHtml.replace(`~~${key}~~`, object[key])
    }
    return partHtml
}
function condition (partHtml, object) {
    if (!object[partHtml.slice(partHtml.indexOf('~~if(') + 5, partHtml.indexOf(')~~'))]) {
        partHtml = partHtml.replace(partHtml.slice(partHtml.indexOf('~~if('), partHtml.indexOf('~~/if~~') + 7), '')
        return partHtml
    }
    return ''
}
 async function engine (path, item) {
    let html = await _fs2.default.promises.readFile(path, 'utf-8')
    if (!Array.isArray(item)) {
        replaceKeys(html, item)
    } else {
        if (html.includes('~~forEach~~')) {
            let allExprs = html.slice(html.indexOf('~~forEach~~'), html.indexOf('~~/forEach') + 12)
            let exprsContent  = html.slice(html.indexOf('~~forEach~~') + 11, html.indexOf('~~/forEach~~'))
            let eachOne = ''
            item.forEach(e => {
                eachOne += replaceKeys(exprsContent, e)
            })
            html = html.replace(allExprs, eachOne)
        }
    }
    for (let index = true; index == true; html = html.replace(/~~if.*?~~/, condition(html, item))) {
        if (!/~~if.*?~~/.test(html)) {
            index = false
        }
    }
    html = html.replace(/~~.*?~~/g, "")
    return html
} exports.engine = engine;