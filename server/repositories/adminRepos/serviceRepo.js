import prisma from "../../database.js";

class ServiceRepository {
  async getService(res) {
    try {
      const response = await prisma.services.findMany();
      res.status(200).json({ status: "All Services!", response });
    } catch (error) {
      res.status(500).json({ status: "Couldn't find services", error });
    }
  }

  async createService(serviceDTO, res) {
    try {
      // Create the service
      const response = await prisma.services.create({
        data: {
          title: serviceDTO.title,
          description: serviceDTO.description,
          servicelink: serviceDTO.servicelink,
          overviewtitle: serviceDTO.overviewtitle,
          overviewcontent: serviceDTO.overviewcontent,
          categoryId: serviceDTO.categoryId,
        },
      });

      // Iterate through features array and create each feature sequentially
      if (serviceDTO.features && serviceDTO.features.length > 0) {
        for (const feature of serviceDTO.features) {
          console.log("Creating feature:", feature);
          await prisma.feature.create({
            data: {
              title: feature.title,
              description: feature.description,
              serviceId: response.id,
            },
          });
        }
      }

      // Send success response
      res
        .status(201)
        .json({ status: "Service and features created!", response });
    } catch (error) {
      // Handle errors
      res.status(500).json({ status: "Couldn't create service", error });
    }
  }

  async updateService(serviceDTO, res) {
    try {
      const response = await prisma.services.update({
        data: serviceDTO,
        where: {
          id: serviceDTO.id,
        },
      });
      res.status(200).json({ status: "Service updated!", response });
    } catch (error) {
      res.status(500).json({ status: "Couldn't update service", error });
    }
  }

  async deleteService(serviceDTO, res) {
    try {
      const response = await prisma.services.delete({
        where: {
          id: serviceDTO.id,
        },
      });
      res.status(200).json({ status: "Service deleted!", response });
    } catch (error) {
      res.status(500).json({ status: "Couldn't delete service", error });
    }
  }
}

export default new ServiceRepository();
