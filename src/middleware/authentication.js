const jwt = require('jsonwebtoken'); // Ensure you've installed jsonwebtoken

const checkAuthentication = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers['authorization'];

    // Check if the token exists
    if (!token) {
        // return res.status(401).json({ message: 'Access denied. No token provided.' });
        return next();
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
        
        console.log('Decoded Token:', decoded); // Add this line
        // Attach the user info from the token to the request object
        req.user = decoded;

        console.log(`Decoded user: ${req.user}`);

        // Proceed to the next middleware or route handler
        next();
    } catch (ex) {
        console.log('Token verification failed:', ex); // Add this line
        // Handle invalid or expired token
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = checkAuthentication;