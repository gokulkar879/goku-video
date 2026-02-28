const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { 
    DynamoDBDocumentClient, 
    PutCommand, 
    GetCommand, 
    QueryCommand
} = require("@aws-sdk/lib-dynamodb");
require('dotenv').config();

// Initialize DynamoDB Client
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.VIDEO_TABLE;
const USER_ID_INDEX = process.env.DDB_USER_ID_INDEX || 'userId-index';

/**
 * Write/Create a video record in DynamoDB
 * @param {Object} video - The video object to write (must include partition key and sort key if applicable)
 * @returns {Promise<Object>} - DynamoDB response
 */
const putVideo = async (video) => {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: video
    });
    
    const response = await docClient.send(command);
    return response;
};

/**
 * Read/Get a single video by primary key
 * @param {string} pk - Partition key value
 * @param {string} sk - Sort key value (optional, if table has sort key)
 * @returns {Promise<Object|null>} - The video or null if not found
 */
const getVideo = async (pk, sk = null) => {
    const key = { pk };
    if (sk) {
        key.sk = sk;
    }
    
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: key
    });
    
    const response = await docClient.send(command);
    return response.Item || null;
};

/**
 * Query videos by partition key
 * @param {string} pk - Partition key value
 * @param {string} skPrefix - Optional sort key prefix for begins_with condition
 * @returns {Promise<Array>} - Array of videos
 */
const queryVideos = async (pk, skPrefix = null) => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
            ":pk": pk
        }
    };
    
    if (skPrefix) {
        params.KeyConditionExpression += " AND begins_with(sk, :sk)";
        params.ExpressionAttributeValues[":sk"] = skPrefix;
    }
    
    const command = new QueryCommand(params);
    const response = await docClient.send(command);
    return response.Items || [];
};

/**
 * Get videos by userId using Global Secondary Index
 * @param {string} userId - The userId to query
 * @returns {Promise<Array>} - Array of videos for the user
 */
const getVideosByUserId = async (userId) => {
    const command = new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: USER_ID_INDEX,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId
        }
    });
    
    const response = await docClient.send(command);
    return response.Items || [];
};

module.exports = {
    putVideo,
    getVideo,
    queryVideos,
    getVideosByUserId
};