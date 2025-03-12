import { CategoriesDTO } from '../DTOs/categoriesDTO.js';
import { categoriesRepository } from '../repositories/categories-repo.js';

export const createCategoryController = async (req, res) => {
    try {
        const categoryDTO = new CategoriesDTO(req.body);
        categoryDTO.validate();
        console.log('Creating new category with data:', categoryDTO);
        const category = await categoriesRepository.createCategory(categoryDTO);
        console.log('Category created:', category.title);
        res.status(201).json({ status: 'success', category });
    } catch (error) {
        console.error('Error in createCategoryController:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryDTO = new CategoriesDTO(req.body);
        categoryDTO.validate();
        console.log('Updating category with data:', categoryDTO);
        const category = await categoriesRepository.updateCategory(id, categoryDTO);
        console.log('Category updated:', category.title);
        res.status(200).json({ status: 'success', category });
    } catch (error) {
        console.error('Error in updateCategoryController:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
};

export const getCategoryController = async (req, res) => {
    try {
        const { category } = req.params;
        console.log('Getting category with slug:', category);
        
        const categoryData = await categoriesRepository.getCategoryBySlug(category);
        console.log('Category found:', categoryData ? 'Yes' : 'No');
        
        if (!categoryData) {
            console.log('Category not found for slug:', category);
            return res.status(404).json({ 
                status: 'fail', 
                message: `Category not found: ${category}` 
            });
        }
        
        console.log('Successfully retrieved category:', categoryData.title);
        res.status(200).json({ status: 'success', category: categoryData });
    } catch (error) {
        console.error('Error in getCategoryController:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
};

export const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Getting category with id:', id);
        
        const category = await categoriesRepository.getCategoryById(id);
        console.log('Category found:', category ? 'Yes' : 'No');
        
        if (!category) {
            console.log('Category not found for id:', id);
            return res.status(404).json({ 
                status: 'fail', 
                message: `Category not found with id: ${id}` 
            });
        }
        
        console.log('Successfully retrieved category:', category.title);
        res.status(200).json({ status: 'success', category });
    } catch (error) {
        console.error('Error in getCategoryByIdController:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
};

export const getAllCategoriesController = async (req, res) => {
    try {
        console.log('Getting all categories');
        const categories = await categoriesRepository.getAllCategories();
        console.log('Categories found:', categories.length);
        res.status(200).json({ status: 'success', categories });
    } catch (error) {
        console.error('Error in getAllCategoriesController:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting category with id:', id);
        const category = await categoriesRepository.deleteCategory(id);
        console.log('Category deleted:', category.title);
        res.status(200).json({ status: 'success', category });
    } catch (error) {
        console.error('Error in deleteCategoryController:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
};