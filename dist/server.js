"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_x_hub_1 = __importDefault(require("express-x-hub"));
var routes_1 = __importDefault(require("./routes"));
var path_1 = __importDefault(require("path"));
var port = process.env.PORT || 5000;
var app = express_1.default();
app.use(express_x_hub_1.default({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(body_parser_1.default.json());
app.use('/public', express_1.default.static(path_1.default.resolve(__dirname, 'public')));
app.use(routes_1.default);
app.listen(port, function () { return console.log("server is running"); });
