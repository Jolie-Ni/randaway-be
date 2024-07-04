"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    region: 'us-east-1',
    credentials: new aws_sdk_1.default.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECURITY_ACCESS_KEY
    })
});
const dynamoDB = new aws_sdk_1.default.DynamoDB.DocumentClient();
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// connect to aws dynamoDB and display a list of db entries per instagram user
app.get('/locations/:instagramId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instagramId = req.params.instagramId;
    console.log('instagramId: ' + instagramId);
    const params = {
        TableName: 'instagram_message',
        FilterExpression: '#instagramId = :instagramId',
        ExpressionAttributeNames: {
            '#instagramId': 'instagram_id'
        },
        ExpressionAttributeValues: {
            ':instagramId': instagramId
        }
    };
    try {
        const data = yield dynamoDB.scan(params).promise();
        if (data.Items) {
            res.json(data.Items);
        }
        else {
            console.log('No locations found for ' + instagramId);
            res.json([]);
        }
    }
    catch (error) {
        console.error('Error reading from DynamoDB', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
