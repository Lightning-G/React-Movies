const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.error("❌ No token provided");
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("❌ JWT Verification Error:", err);
            return res.status(403).json({ error: "Invalid token" });
        }

        console.log("✅ Decoded Token:", user); // Log the decoded token

        if (!user.id) {
            console.error("❌ Missing user ID in token payload:", user);
            return res.status(400).json({ error: "User ID not found in token" });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
