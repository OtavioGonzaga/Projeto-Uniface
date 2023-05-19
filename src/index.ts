import express from "express"
import {engine} from "./helpers/engine"
const app = express()
require('dotenv').config()
app.get('/', async (req, res) => {
    const person = [{
            name: 'Camila',
            age: 18,
            gen: 'female'
        },
        {
            name: 'Otavio',
            age: 16,
            gen: 'male'
        },
        {
            name: 'CAVALO',
            age: 34,
            gen: 'male'
        }
    ]
    res.send(await engine('views/index.html', person))
})
const port = process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))