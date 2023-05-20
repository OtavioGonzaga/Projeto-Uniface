import express from "express"
// import * as hbs from "express-handlebars"
import {engine} from "./helpers/engine"
const app = express()
require('dotenv').config()
// app.use((req, res, next) => {
//     next()
// })
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())
// app.engine('handlebars', hbs.engine({defaultLayout: 'main'}))
// app.set('view engine', 'handlebars')
// app.use(express.static('./public'))
app.get('/', async (req, res) => {
    const person = [{
        name: 'Otavio',
        adm: true
    },
    {
        name: 'Camila',
        adm: false
    }]
    res.send(await engine('views/index.html', person))
})
const port = process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))