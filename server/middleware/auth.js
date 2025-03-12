import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({
                status: 'error',
                message: 'Server configuration error'
            });
        }

        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required'
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Invalid or expired token'
                });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error in authenticateToken middleware:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

export { authenticateToken };