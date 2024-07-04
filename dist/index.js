"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// connect to aws dynamoDB and display a list of db entries
app.get('/locations', (req, res) => {
    res.send('this endpoint will return a list of locations parsed from instagram posts');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
