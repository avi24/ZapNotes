const jwt = require('jsonwebtoken'); // Ensure you've installed jsonwebtoken

const checkAuthentication = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization');

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
        // return next();
    }

    try {
        // Verify the token using the secret key
        // const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        console.log('Decoded Token:', decoded); // Add this line
        // Attach the user info from the token to the request object
        req.userId = decoded.userId;

        console.log(`Decoded user: ${req.userId}`);

        // Proceed to the next middleware or route handler
        next();
    } catch (ex) {
        console.log('Token verification failed:', ex); // Add this line
        // Handle invalid or expired token
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = checkAuthentication;