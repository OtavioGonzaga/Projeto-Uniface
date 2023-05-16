import express from "express"
import {engine} from "./helpers/engine"
const app = express()
require('dotenv').config()
app.get('/', async (req, res) => {
    const person = {
        name: 'Otavio Luiz Gonzaga',
        age: 16,
        gen: 'male'
    }
    res.send(await engine('./src/views/index.html', person))
})
const port = process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))