import prisma from '../prisma/client.js';

async function createAdminUser() {
    try {
        const admin = await prisma.user.upsert({
            where: { email: 'admin@example.com' },
            update: {},
            create: {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123', // In production, this should be hashed
                role: 'ADMIN'
            }
        });
        console.log('Admin user created:', admin);
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();
