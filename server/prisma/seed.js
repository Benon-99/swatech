import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create categories
  //   await prisma.category.createMany({
  //     data: [
  //       { id: 1, name: "HR Management" },
  //       { id: 2, name: "Technology" },
  //       { id: 3, name: "Digital Innovation" },
  //     ],
  //   });

  //   // Create blog posts
  //   await prisma.post.createMany({
  //     data: [
  //       {
  //         title: "5 Key Strategies for Effective HR Management in 2024",
  //         content: "Sample content for HR Management post...",
  //         slug: "5-key-strategies-for-effective-hr-management-in-2024",
  //         date: new Date("2024-08-20"),
  //         categoryId: 1,
  //         image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
  //         published: true,
  //         authorId: 1,
  //       },
  //       {
  //         title: "The Role of Cybersecurity in Modern Business",
  //         slug: "the-role-of-cybersecurity-in-modern-business",
  //         date: new Date("2024-08-20"),
  //         categoryId: 2,
  //         image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
  //         published: true,
  //         authorId: 1,
  //       },
  //       {
  //         title: "How Digital Transformation is Shaping the Future of Business in Syria",
  //         slug: "how-digital-transformation-is-shaping-the-future-of-business-in-syria",
  //         date: new Date("2024-08-20"),
  //         categoryId: 3,
  //         image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
  //         published: true,
  //         authorId: 1,
  //       },
  //     ],
  //   });

  //   // Update posts with full content
  //   await prisma.post.update({
  //     where: { slug: "5-key-strategies-for-effective-hr-management-in-2024" },
  //     data: {
  //       content: `
  // **1. Embrace Digital HR Solutions**
  // - Implement comprehensive HR management systems.
  // - Automate payroll processing, performance tracking, and recruitment platforms.
  // - Ensure better decision-making with integrated tools.

  // **2. Focus on Employee Well-being**
  // - Adopt flexible work arrangements.
  // - Provide mental health support and wellness programs.
  // - Foster a supportive work environment.

  // **3. Develop Strong Learning & Development Programs**
  // - Personalize learning paths and training initiatives.
  // - Offer leadership development and cross-functional training.

  // **4. Enhance Performance Management**
  // - Create a feedback-driven, development-focused approach.
  // - Align performance management with organizational goals.

  // **5. Prioritize Diversity, Equity, and Inclusion**
  // - Build DEI strategies to attract talent and foster innovation.

  // Looking ahead, HR managers must adapt to changing dynamics to build resilient and engaged workforces.`
  //     },
  //   });

  //   await prisma.post.update({
  //     where: { slug: "the-role-of-cybersecurity-in-modern-business" },
  //     data: {
  //       content: `
  // **1. The Growing Importance of Cybersecurity**
  // - Increase in cyberattacks and sophisticated threats.
  // - Rising costs of data breaches and regulatory requirements.

  // **2. Essential Security Measures**
  // - **Network Security**: Firewalls, monitoring, and audits.
  // - **Data Protection**: Encryption and access controls.
  // - **Employee Training**: Phishing prevention and incident response.

  // **3. Impact on Business Operations**
  // - Improve customer trust and compliance.
  // - Enhance operational efficiency and risk management.

  // Looking ahead, businesses must prepare for AI-powered solutions, zero-trust architecture, and IoT security considerations.`
  //     },
  //   });

  //   await prisma.post.update({
  //     where: { slug: "how-digital-transformation-is-shaping-the-future-of-business-in-syria" },
  //     data: {
  //       content: `
  // **1. The Digital Revolution in Syria**
  // - Adoption of modern technologies and operational efficiency.
  // - Changing customer expectations and new business models.

  // **2. Key Areas of Transformation**
  // - **E-Commerce**: Growth of online platforms and digital payments.
  // - **Process Automation**: Workflow digitization and cloud computing.
  // - **Customer Experience**: Personalized services and omnichannel presence.

  // **3. Challenges and Opportunities**
  // - **Challenges**: Infrastructure gaps and investment needs.
  // - **Opportunities**: Market expansion and innovation potential.

  // Looking ahead, digital transformation in Syria offers immense economic growth opportunities.`
  //     },
  //   });

  //   // Update home record
  const homeRecord = await prisma.home.findUnique({ where: { id: 1 } });
  if (homeRecord) {
    await prisma.home.update({
      where: { id: 1 },
      data: {
        advantages: {
          title: "Why Choose Us?",
          subtitle: "Discover our unique advantages",
          features: [
            {
              title: "Trustworthy",
              description:
                "Over 25 years of expertise in delivering innovative and high-quality business solutions",
              icon: "Shield",
              gradient: "from-[#3785CC] to-[#4A9BE4]",
              link: "/about#expertise",
            },
            {
              title: "24/7 Support",
              description:
                "Comprehensive round-the-clock technical support and professional assistance for all your business needs",
              icon: "Clock",
              gradient: "from-[#4A9BE4] to-[#5B8AF0]",
              link: "/services#support",
            },
            {
              title: "Expert Team",
              description:
                "Dedicated team of professionals with extensive industry knowledge and experience",
              icon: "Users",
              gradient: "from-[#5B8AF0] to-[#8590EA]",
              link: "/about#team",
            },
            {
              title: "Scalable Solutions",
              description:
                "Flexible and adaptable solutions designed to grow seamlessly with your business",
              icon: "TrendingUp",
              gradient: "from-[#8590EA] to-[#B5C6F4]",
              link: "/services#solutions",
            },
          ],
        },
        services: [
          {
            category: "Business Outsourcing",
            description:
              "Let us manage the complexity of HR recruitment, contracting and payroll services, so you can focus your resources and efforts on your core business.",
            gradient: "from-purple-500 via-pink-500 to-rose-500",
            services: [
              {
                icon: "UserPlus",
                title: "Jobs.ici – Recruiting",
                description:
                  "Connect with top industry talents for permanent positions, contract roles, and specialized recruitment solutions.",
                gradient: "from-[#3785CC] to-[#3E9DE5]",
              },
              {
                icon: "Users",
                title: "HR & Recruitment Management",
                description:
                  "Comprehensive HR and recruitment solutions to optimize your hiring process and talent management strategies.",
                gradient: "from-[#3E9DE5] to-[#7B8EEC]",
              },
              {
                icon: "ClipboardList",
                title: "HR Payroll & Performance",
                description:
                  "Streamline your payroll processing and performance management systems to enhance compliance and productivity.",
                gradient: "from-[#7B8EEC] to-[#B5C6F4]",
              },
            ],
          },
          {
            category: "ICT Solutions",
            description:
              "Our ICT solutions focus on optimizing business operations, driving process efficiency, and keeping your company competitive in today's technology-driven landscape.",
            gradient: "from-blue-500 via-cyan-500 to-teal-500",
            services: [
              {
                icon: "Server",
                title: "Data Center Infrastructure",
                description:
                  "Comprehensive data center infrastructure solutions to design, build, and manage your evolving technology requirements.",
                gradient: "from-[#3785CC] to-[#4A9BE4]",
              },
              {
                icon: "Network",
                title: "Solutions Integration",
                description:
                  "Advanced technology integration solutions to optimize business operations, reduce costs, and drive sustainable enterprise growth.",
                gradient: "from-[#4A9BE4] to-[#5B8AF0]",
              },
              {
                icon: "Shield",
                title: "Information Security",
                description:
                  "Advanced security solutions and monitoring systems to protect your critical data and infrastructure from sophisticated cyber threats and vulnerabilities.",
                gradient: "from-[#5B8AF0] to-[#8590EA]",
              },
              {
                icon: "Code",
                title: "Software Development",
                description:
                  "Innovative web and mobile application development solutions designed to accelerate your digital transformation journey and enhance business efficiency.",
                gradient: "from-[#8590EA] to-[#B5C6F4]",
              },
            ],
          },
        ],
        aboutUs: {
          title: "DISCOVER IC&I",
          subtitle:
            "Your Reliable Partner in ICT Consulting, Solutions & Services",
          content: [
            "A leading provider of ICT solutions, IC&I specializes in comprehensive consultancy, installation, commissioning, and outsourcing services. Our corporate business solutions span a range of sectors, including telecom, ISPs, banking, NGOs and more.",
            "We handle all aspects of human resources services, especially contracting and outsourcing, designed to streamline your workforce management by providing flexible, efficient and scalable solutions.",
          ],
          features: [
            {
              icon: "Globe",
              title: "Global Standards",
              text: "UN Global Compact signatory since 2023",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: "Target",
              title: "Mission-Driven",
              text: "Preferred strategic partner for consultancy and services",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: "Compass",
              title: "Clear Vision",
              text: "Driving innovation and exceptional performance",
              color: "from-orange-500 to-yellow-500",
            },
          ],
          stats: [
            { number: "15+", label: "Years Experience" },
            { number: "200+", label: "Projects Completed" },
            { number: "50+", label: "Expert Team Members" },
            { number: "98%", label: "Client Satisfaction" },
          ],
          img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
        },
      },
    });
  }

  //   await prisma.feature.createMany({
  //   data: [
  //     {
  //       title: "Comprehensive HR Solutions",
  //       description: "End-to-end HR management for enterprises",
  //       serviceId: 4,
  //     },
  //     {
  //       title: "Advanced Cybersecurity",
  //       description: "Protect your infrastructure with top-tier security",
  //       serviceId: 3,
  //     },
  //     {
  //       title: "Digital Transformation",
  //       description: "Streamline processes with cutting-edge technology",
  //       serviceId: 3,
  //     },
  //     {
  //       title: "Scalable Data Solutions",
  //       description: "Flexible and efficient data management strategies",
  //       serviceId: 4,
  //     },
  //     {
  //       title: "Cloud Integration",
  //       description: "Seamless migration and integration with cloud services",
  //       serviceId: 3,
  //     },
  //   ],
  // });

  // console.log("Seed data created successfully!")

  //  const serviceCategories = [
  //       {
  //         category: "business-outsourcing",
  //         title: "Business Outsourcing",
  //         mainDescription: "Let us manage the complexity of HR recruitment and contracting.",
  //         overviewTitle: "Market Leading HR Solutions",
  //         overviewContent: "Streamline operations with our cutting-edge outsourcing services.",
  //         offeringsTitle: "Business Outsourcing Solutions",
  //         offeringsContent: "Optimize resources with tailored HR and recruitment solutions.",
  //       },
  //       {
  //         category: "ict-solutions",
  //         title: "ICT Solutions",
  //         mainDescription: "Optimizing business operations with advanced ICT solutions.",
  //         overviewTitle: "Scalable ICT Infrastructure",
  //         overviewContent: "Drive process efficiency and maintain competitiveness.",
  //         offeringsTitle: "Technology Solutions",
  //         offeringsContent: "Comprehensive integration and software development services.",
  //       },
  //       {
  //         category: "digital-innovation",
  //         title: "Digital Innovation",
  //         mainDescription: "Empowering businesses through digital transformation.",
  //         overviewTitle: "Revolutionizing Business with Digital",
  //         overviewContent: "Embrace innovation for sustainable growth and success.",
  //         offeringsTitle: "Digital Transformation",
  //         offeringsContent: "Enhance customer experiences and operational efficiency.",
  //       },
  //     ];

  //     for (const category of serviceCategories) {
  //       await prisma.categories.create({
  //         data: category,
  //       });
  //     }

  //     await prisma.services.createMany({
  //     data: [
  //       {
  //         title: "HR Management Services",
  //         description: "Streamline HR processes.",
  //         servicelink: "hr-management",
  //         overviewtitle: "Optimize Your HR",
  //         overviewcontent: "Enhance HR workflows and compliance.",
  //         categoryId: 1, // Assuming category with ID 1 exists
  //       },
  //       {
  //         title: "Cybersecurity",
  //         description: "Protect your assets.",
  //         servicelink: "cybersecurity",
  //         overviewtitle: "Secure Your Systems",
  //         overviewcontent: "Prevent cyber threats effectively.",
  //         categoryId: 2, // Assuming category with ID 2 exists
  //       },
  //     ],
  //   });

  // await prisma.about.create({
  //   data: {
  //     title: "About IC&I",
  //     subtitle: "Empowering Progress Through Innovation",
  //     description: [
  //       "IC&I is a leading provider of integrated solutions in Syria, specializing in ICT solutions and business process outsourcing. With over 15 years of experience, we've established ourselves as a trusted partner for organizations seeking innovative and reliable services.",
  //       "Our commitment to excellence and customer satisfaction has made us the preferred choice for businesses looking to optimize their operations and drive growth. We combine industry expertise with cutting-edge technology to deliver solutions that create lasting value for our clients.",
  //     ],
  //     mission:
  //       "To empower organizations through innovative solutions and exceptional service, driving sustainable growth and success in an evolving digital landscape.",
  //     vision:
  //       "To be the leading technology and business solutions provider in Syria, recognized for our innovation, reliability, and commitment to client success.",
  //     // Create related values
  //     values: {
  //       create: [
  //         {
  //           icon: "Globe",
  //           title: "Global Standards",
  //           text: "UN Global Compact signatory since 2023",
  //         },
  //         {
  //           icon: "Target",
  //           title: "Mission-Driven",
  //           text: "Preferred strategic partner for consultancy and services",
  //         },
  //         {
  //           icon: "Compass",
  //           title: "Clear Vision",
  //           text: "Driving innovation and exceptional performance",
  //         },
  //         {
  //           icon: "Shield",
  //           title: "Strong Ethics",
  //           text: "Highest standards of integrity and professionalism",
  //         },
  //         {
  //           icon: "Users",
  //           title: "Client Focus",
  //           text: "Building lasting partnerships through collaboration",
  //         },
  //         {
  //           icon: "Heart",
  //           title: "Core Values",
  //           text: "Transparency, respect, innovation, and unwavering commitment to excellence",
  //         },
  //       ],
  //     },
  //     // Create related stats
  //     stats: {
  //       create: [
  //         { number: "15+", label: "Years Experience" },
  //         { number: "200+", label: "Projects Completed" },
  //         { number: "50+", label: "Expert Team Members" },
  //         { number: "98%", label: "Client Satisfaction" },
  //       ],
  //     },
  //   },
  // });

  // await prisma.about.update({
  //   where: {
  //     id: 1, // or whichever ID you want to update
  //   },
  //   data: {
  //     img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
  //   },
  // });
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
