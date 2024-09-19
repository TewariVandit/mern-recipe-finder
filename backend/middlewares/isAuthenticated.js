import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

        if (!token) {
            return res.status(401).json({ message: "User not authenticated", success: false });
        }

        const decoded = jwt.verify(token, 'your_secure_secret'); // Use the same secret key
        req.userId = decoded.userId; // Attach user ID to request

        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("Error in authentication middleware:", error.message);
        return res.status(401).json({ message: "Invalid token", success: false });
    }
};

export default isAuthenticated;
