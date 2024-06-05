// middleware/roleMiddleware.js
const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.user_type !== role) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

export default authorize;
