import express, { Request, Response } from 'express';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECURITY_ACCESS_KEY!
    })
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


// connect to aws dynamoDB and display a list of db entries per instagram user
app.get('/locations/:instagramId', async (req: Request, res: Response) => {
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
        const data = await dynamoDB.scan(params).promise();
        if (data.Items) {
            res.json(data.Items);
        } else {
            console.log('No locations found for ' + instagramId)
            res.json([])
        }
    } catch (error) {
        console.error('Error reading from DynamoDB', error);
        res.status(500).send('Internal Server Error');
    }
    
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
