const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config();

const s3 = new S3Client({ region: process.env.AWS_REGION });

const getUploadUrl = async (fileName, contentType, username) => {
    const key = `uploads/${uuidv4()}.mp4`;
    const command = new PutObjectCommand({
        Bucket: process.env.UPLOAD_BUCKET_NAME,
        Key: key,
        ContentType: 'video/mp4'
    })

    const url = await getSignedUrl(s3, command, { expiresIn: 500 }); // 5 min expiry
    return url;
}


module.exports = getUploadUrl;