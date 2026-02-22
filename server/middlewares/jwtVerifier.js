const { CognitoJwtVerifier } = require('aws-jwt-verify')
require('dotenv').config();

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access", // or "access"
  clientId: process.env.COGNITO_CLIENT_ID,
});

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    console.log(token);

    // This performs all security checks: signature, expiration, issuer, audience
    const payload = await verifier.verify(token);
    req.user = payload; // Attach user info (sub, email, etc.) to request
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = checkAuth;