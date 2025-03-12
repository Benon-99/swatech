import prisma from '../prisma/client.js';

export const updateFeatures = async (req, res) => {
    try {
        const { id } = req.query;
        const { features } = req.body;



        console.log("\n\n\n\n\n\n\n advantages: " , features , '\n\n\n\n\n\n\n')
        
        
        
        
        if (!features || !Array.isArray(features)) {
            return res.status(400).json({ error: 'Invalid features data. It must be an array.' });
        }

        // Ensure the `advantages` field has the correct structure
        const updatedHome = await prisma.home.update({
            where: { id: parseInt(id) },
            data: {
                advantages:features,
            },
        });

        res.json({ message: 'Advantages section updated successfully', data: updatedHome });
    } catch (error) {
        console.error('Error updating advantages section:', error);
        res.status(500).json({ error: 'Failed to update advantages section' });
    }
};
