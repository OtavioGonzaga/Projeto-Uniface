"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _engine = require('./helpers/engine');
const app = _express2.default.call(void 0, )
require('dotenv').config()
app.get('/', async (req, res) => {
    const person = {
        name: 'Otavio Luiz Gonzaga',
        age: 16,
        gen: 'male'
    }
    res.send(await _engine.engine.call(void 0, './src/views/index.html', person))
})
const port = process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))