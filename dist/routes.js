"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var token = process.env.TOKEN || 'token';
var received_updates = [];
router.get('/', function (req, res) {
    console.log(req.headers);
    res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});
router.get(['/facebook', '/instagram'], function (req, res) {
    if (req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == token) {
        res.send(req.query['hub.challenge']);
    }
    else {
        res.sendStatus(400);
    }
});
router.post('/facebook', function (req, res) {
    console.log('Facebook request body:', req.body);
    var checkxhub = req.isXHubValid();
    if (!checkxhub) {
        console.log('Warning - request header X-Hub-Signature not present or invalid');
        res.sendStatus(401);
        return;
    }
    console.log('request header X-Hub-Signature validated');
    received_updates.unshift(req.body);
    res.sendStatus(200);
});
router.post('/instagram', function (req, res) {
    console.log('Instagram request body:');
    console.log(req.body);
    received_updates.unshift(req.body);
    res.sendStatus(200);
});
exports.default = router;
