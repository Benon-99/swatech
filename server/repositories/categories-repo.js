import prisma from '../prisma/client.js';

class CategoriesRepository {
    async createCategory(categoryDTO) {
        try {
            return await prisma.categories.create({
                data: {
                    category: categoryDTO.category,
                    title: categoryDTO.title,
                    mainDescription: categoryDTO.mainDescription,
                    overviewTitle: categoryDTO.overviewTitle,
                    overviewContent: categoryDTO.overviewContent,
                    offeringsTitle: categoryDTO.offeringsTitle,
                    offeringsContent: categoryDTO.offeringsContent,
                    services: categoryDTO.services
                }
            });
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    }

    async updateCategory(id, categoryDTO) {
        if (!id) throw new Error('ID is required for updating a category');
        
        try {
            const categoryId = parseInt(id);
            if (isNaN(categoryId)) throw new Error('Invalid category ID format');

            return await prisma.categories.update({
                where: { id: categoryId },
                data: {
                    category: categoryDTO.category,
                    title: categoryDTO.title,
                    mainDescription: categoryDTO.mainDescription,
                    overviewTitle: categoryDTO.overviewTitle,
                    overviewContent: categoryDTO.overviewContent,
                    offeringsTitle: categoryDTO.offeringsTitle,
                    offeringsContent: categoryDTO.offeringsContent,
                    services: categoryDTO.services
                }
            });
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    }

    async getCategoryById(id) {
        if (!id) throw new Error('ID is required to fetch a category');
        
        try {
            const categoryId = parseInt(id);
            if (isNaN(categoryId)) throw new Error('Invalid category ID format');

            const category = await prisma.categories.findUnique({
                where: { id: categoryId }
            });

            if (!category) {
                throw new Error('Category not found');
            }

            return category;
        } catch (error) {
            console.error('Error getting category by ID:', error);
            throw error;
        }
    }

    async getCategoryBySlug(categorySlug) {
        if (!categorySlug) throw new Error('Category slug is required');

        try {
            const category = await prisma.categories.findUnique({
                where: { category: categorySlug }
            });

            if (!category) {
                return null;
            }

            return category;
        } catch (error) {
            console.error('Error getting category by slug:', error);
            throw error;
        }
    }

    async getAllCategories() {
        try {
            return await prisma.categories.findMany({
                orderBy: {
                    category: 'asc'
                }
            });
        } catch (error) {
            console.error('Error getting all categories:', error);
            throw error;
        }
    }

    async deleteCategory(id) {
        if (!id) throw new Error('ID is required to delete a category');
        
        try {
            const categoryId = parseInt(id);
            if (isNaN(categoryId)) throw new Error('Invalid category ID format');

            const category = await prisma.categories.findUnique({
                where: { id: categoryId }
            });

            if (!category) {
                throw new Error('Category not found');
            }

            return await prisma.categories.delete({
                where: { id: categoryId }
            });
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
}

// Create a single instance of the repository
const categoriesRepository = new CategoriesRepository();

// Export the instance
export { categoriesRepository };