import prisma from "../prisma/client.js";
import { AboutRepository } from "../repositories/about-repo.js";
import { AboutDTO } from "../DTOs/aboutDTO.js";



export const getHome = async (req, res) => {
    try {
        const home = await prisma.home.findMany({
            where: {
                id: 1
            }
        });

        console.log('Raw DB Data:', home[0]);

        // Ensure content is always an array
        if (home[0]?.aboutUs?.content) {
            home[0].aboutUs.content = Array.isArray(home[0].aboutUs.content) 
                ? home[0].aboutUs.content 
                : [home[0].aboutUs.content];
        }

        // Ensure features is always an array
        if (home[0]?.features) {
            home[0].features = Array.isArray(about[0].features) 
                ? home[0].features 
                : [home[0].features];
        }

        // Ensure aboutUs exists
        if (!home[0].aboutUs) {
            home[0].aboutUs = {};
        }

        

        if (home[0]?.stats) {
            home[0].stats = Array.isArray(home[0].stats) 
                ? home[0].stats 
                : [home[0].stats];
        }
        console.log('Processed Data:', home[0]);

        res.json({ home});
    } catch (error) {
        console.error('Error getting about:', error);
        res.status(500).json({ error: 'Failed to get about section' });
    }
};

export const updateAbout = async (req, res) => {
  try {
    const { id } = req.query;
    const { aboutUs } = req.body;
    const about = JSON.parse(aboutUs);
    const image = req.file?.filename;
    // console.log("\n\n\n\n\n\n\n\nwdwdwdw : ",.title +"\n\n\n\n\n\n\n");

    const updateData = {
      ...about,
      ...(image && { image }),
    };

        const updatedAbout = await prisma.home.update({
            where: { id: parseInt(id) },
            data:{ aboutUs : updateData}
        });
        // console.log("wdwdwdw",updateData);
        res.json({ 
            message: 'About section updated successfully', 
            data: updatedAbout 
        });
    } catch (error) {
        console.error('Error updating about section:', error);
        res.status(500).json({ error: 'Failed to update about section' });
    }
};

export const createAboutUs = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.img = req.file.filename;
        }
        const aboutDto = new AboutDTO(data);
        const about = await AboutRepository.createAbout(aboutDto);
        res.status(200).json({ status: 'success', about });
    } catch (error) {
        console.error('Error creating about section:', error);
        res.status(500).json({ status: 'fail', message: error.message });
    }
}

export const updateAboutUs = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.img = req.file.filename;
        }
        const aboutDto = new AboutDTO(data);
        const about = await AboutRepository.updateAbout(aboutDto);
        res.status(200).json({ status: 'success', about });
    } catch (error) {
        console.error('Error updating about section:', error);
        res.status(500).json({ status: 'fail', message: error.message });
    }
}

export const deleteAboutUs = async (req , res)=> {
    try {
        const { id } = req.body; // Should receive ID instead of full DTO
        await AboutRepository.deleteAbout(id);
        res.status(200).json({ status: 'success', message: 'About section deleted successfully' });
        
    } catch (error) {
        console.error('Error creating about section:', error);
        res.status(500).json({ status: 'fail', message: error.message });
    }
}

export const getAboutUs = async (req , res)=> {
    try {
        const about = await AboutRepository.getAbout(1);
        res.status(200).json({ status: 'success', about });
        
    } catch (error) {
        console.error('Error creating about section:', error);
        res.status(500).json({ status: 'fail', message: error.message });
    }
}