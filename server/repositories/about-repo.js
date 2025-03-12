import { PrismaClient } from '@prisma/client';
import { AboutDTO } from '../DTOs/aboutDTO.js';

const prisma = new PrismaClient();

export class AboutRepository {
     static async createAbout(aboutDTO) {
        try {
            const newAbout = await prisma.about.create({
                data: {
                    title: aboutDTO.title,
                    subtitle: aboutDTO.subtitle,
                    description: aboutDTO.description,
                    mission: aboutDTO.mission,
                    vision: aboutDTO.vision,
                    img: aboutDTO.img,
                },
            });

            if (aboutDTO.values && aboutDTO.values.length > 0) {
                const valueEntries = aboutDTO.values.map(value => ({
                    icon: value.icon,
                    title: value.title,
                    text: value.text,
                    aboutId: newAbout.id,
                }));

                await prisma.aboutValue.createMany({
                    data: valueEntries,
                });
            }

            if (aboutDTO.stats && aboutDTO.stats.length > 0) {
                const statEntries = aboutDTO.stats.map(stat => ({
                    number: stat.number,
                    label: stat.label,
                    aboutId: newAbout.id,
                }));

                await prisma.aboutStat.createMany({
                    data: statEntries,
                });
            }

            const createdAbout = await prisma.about.findUnique({
                where: { id: newAbout.id },
                include: {
                    values: true,
                    stats: true,
                },
            });

            return new AboutDTO(createdAbout);
        } catch (error) {
            throw error;
        }
    }

    static async updateAbout(aboutDTO) {
        try {
            const updatedAbout = await prisma.about.update({
                where: {
                    id: aboutDTO.id,
                },
                data: {
                    title: aboutDTO.title,
                    subtitle: aboutDTO.subtitle,
                    description: aboutDTO.description,
                    mission: aboutDTO.mission,
                    vision: aboutDTO.vision,
                    img: aboutDTO.img,
                },
            });

            // Handle values update
            if (aboutDTO.values && aboutDTO.values.length > 0) {
                // Delete existing values
                await prisma.aboutValue.deleteMany({
                    where: {
                        aboutId: aboutDTO.id,
                    },
                });

                // Create new values
                const valueEntries = aboutDTO.values.map(value => ({
                    icon: value.icon,
                    title: value.title,
                    text: value.text,
                    aboutId: aboutDTO.id,
                }));

                await prisma.aboutValue.createMany({
                    data: valueEntries,
                });
            }

            // Handle stats update
            if (aboutDTO.stats && aboutDTO.stats.length > 0) {
                // Delete existing stats
                await prisma.aboutStat.deleteMany({
                    where: {
                        aboutId: aboutDTO.id,
                    },
                });

                // Create new stats
                const statEntries = aboutDTO.stats.map(stat => ({
                    number: stat.number,
                    label: stat.label,
                    aboutId: aboutDTO.id,
                }));

                await prisma.aboutStat.createMany({
                    data: statEntries,
                });
            }

            const finalAbout = await prisma.about.findUnique({
                where: { id: aboutDTO.id },
                include: {
                    values: true,
                    stats: true,
                },
            });

            return new AboutDTO(finalAbout);
        } catch (error) {
            throw error;
        }
    }

    static async getAbout(id) {
        try {
            const about = await prisma.about.findUnique({
                where: { id },
                include: {
                    values: true,
                    stats: true,
                },
            });
            
            if (!about) return null;
            return new AboutDTO(about);
        } catch (error) {
            throw error;
        }
    }

    static async deleteAbout(id) {
        try {
            // Delete related values and stats first
            await prisma.aboutValue.deleteMany({
                where: { aboutId: id },
            });

            await prisma.aboutStat.deleteMany({
                where: { aboutId: id },
            });

            // Then delete the about record
            await prisma.about.delete({
                where: { id },
            });
        } catch (error) {
            throw error;
        }
    }
}