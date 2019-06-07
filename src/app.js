import 'babel-polyfill'

import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import log from 'winston'
import expressWinston from 'express-winston'

import bookController from './controllers/book'

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use(expressWinston.logger({
  winstonInstance: log,
  expressFormat: true,
  meta: false,
}))

app.use('/', bookController)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send()
})

app.listen(3333, () => {
  console.log(`Server running on port 3333!`)
})
