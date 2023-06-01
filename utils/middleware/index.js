const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("private.key");
const publicKey = fs.readFileSync("public.key");

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      // Verify and decode the JWT token
      jwt.verify(
        token,
        publicKey,
        { algorithms: ["RS256"] },
        (err, decoded) => {
          if (err) {
            // Token verification failed
            console.error("Token verification failed:", err.message);
            throw new Error(err);
          } else {
            // Token verification successful
            console.log("Decoded token:", decoded);
            next()
          }
        }
      );
    }
    else {
        throw new Error('Authorization headers not correct.')
    }
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: "Authorization failed.", err: err.message });
  }
}

module.exports = {
  verifyToken,
  privateKey,
  publicKey,
};
