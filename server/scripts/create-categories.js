import prisma from '../prisma/client.js';

async function createDefaultCategories() {
    const defaultCategories = [
        { name: 'Technology' },
        { name: 'News' },
        { name: 'Tutorial' },
        { name: 'Opinion' }
    ];

    try {
        for (const category of defaultCategories) {
            await prisma.category.upsert({
                where: { name: category.name },
                update: {},
                create: category
            });
        }
        
        const categories = await prisma.category.findMany();
        console.log('Categories created:', categories);
    } catch (error) {
        console.error('Error creating categories:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createDefaultCategories();
