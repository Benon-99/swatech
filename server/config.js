export const config = {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key', // In production, always use environment variable
    jwtExpiresIn: '24h',
    port: process.env.PORT || 3000,
    // Add other configuration values as needed
};
