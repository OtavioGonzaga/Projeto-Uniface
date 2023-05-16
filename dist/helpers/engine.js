"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
 async function engine(path, obj) {
    let html = await _fs2.default.promises.readFile(path, 'utf-8')
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            html = html.replace(`~~${key}~~`, obj[key])
        }
    }
    return html
} exports.engine = engine;