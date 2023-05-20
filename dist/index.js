"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _expresshandlebars = require('express-handlebars'); var exphbs = _interopRequireWildcard(_expresshandlebars);
var _engine = require('./helpers/engine');
const app = _express2.default.call(void 0, )
require('dotenv').config()
app.use((req, res, next) => {
    next()
})
app.use(_express2.default.urlencoded({extended: true}))
app.use(_express2.default.json())
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(_express2.default.static('./public'))
app.get('/', async (req, res) => {
    const person = {
        name: false
    }
    res.send(await _engine.engine.call(void 0, 'views/index.html', person))
})
const port = process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))