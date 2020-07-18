import express from 'express'
import { ExtendedRequest } from './definitions/api'
const router = express.Router()

var token = process.env.TOKEN || 'token'
var received_updates : object[]= []



router.get('/', function(req, res) {
  console.log(req.headers)
  res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>')
})

router.get(['/facebook', '/instagram'], function(req, res) {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge'])
  } else {
    res.sendStatus(400)
  }
})

router.post('/facebook', function(req: ExtendedRequest, res: any) {
  console.log('Facebook request body:', req.body)
  const checkxhub : Boolean = req.isXHubValid()
  if (!checkxhub) {
    console.log('Warning - request header X-Hub-Signature not present or invalid')
    res.sendStatus(401)
    return
  }

  console.log('request header X-Hub-Signature validated')
  // Process the Facebook updates here
  received_updates.unshift(req.body)
  res.sendStatus(200)
})

router.post('/instagram', function(req, res) {
  console.log('Instagram request body:')
  console.log(req.body)
  // Process the Instagram updates here
  received_updates.unshift(req.body)
  res.sendStatus(200)
})

export default router

