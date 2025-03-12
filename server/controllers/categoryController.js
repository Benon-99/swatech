import prisma from '../prisma/client.js';

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        res.json({ categories });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to fetch categories'
        });
    }
};
