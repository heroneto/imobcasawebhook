import express from 'express'
import bodyParser from 'body-parser'
import xhub from 'express-x-hub'
import routes from './routes'
import path from 'path'
const port = process.env.PORT || 5000
const app = express()

app.use(xhub({algorithm: 'sha1', secret: process.env.APP_SECRET}))
app.use(bodyParser.json())


app.use('/public', express.static(path.resolve(__dirname,'public')))
app.use(routes)




app.listen(port, () => console.log("server is running"))