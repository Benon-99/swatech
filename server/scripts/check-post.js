import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const post = await prisma.post.findUnique({
            where: { 
                slug: 'how-digital-transformation-is-shaping-the-future-of-business-in-syria'
            },
            include: {
                author: true,
                category: true
            }
        });
        console.log('Post found:', post ? 'Yes' : 'No');
        console.log(JSON.stringify(post, null, 2));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
