import prisma from "../prisma/client.js";

export const updateServices = async (req, res) => {
  try {
    const { id } = req.query;
    const { categories } = req.body;
    console.log(categories[0].services);

    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({
        error: "Invalid services data. It must be an array of categories.",
      });
    }

    // Find the first home record
    const home = await prisma.home.findFirst();

    if (!home) {
      return res.status(404).json({ error: "Home data not found." });
    }

    // Update the services field
    const updatedHome = await prisma.home.update({
      where: { id: home.id },
      data: {
        services: categories,
      },
    });

    res.json({ message: "Services updated successfully", data: updatedHome });
  } catch (error) {
    console.error("Error updating services:", error);
    res.status(500).json({ error: "Failed to update services" });
  }
};

import { ServicesDTO } from "../DTOs/servicesDTO.js";
import { servicesRepository } from "../repositories/services-repo.js";

export const createServiceController = async (req, res) => {
  try {
    console.log("req.body   :   ", req.body);
    const service = await servicesRepository.createService(req.body);
    console.log("Service created:", service.title);
    res.status(201).json({ status: "success", service });
  } catch (error) {
    console.error("Error in createServiceController:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Internal server error",
    });
  }
};

export const updateServiceController = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceDTO = new ServicesDTO(req.body);
    serviceDTO.validate();
    console.log("Updating service with data:", serviceDTO);
    const service = await servicesRepository.updateService(id, serviceDTO);
    console.log("Service updated:", service.title);
    res.status(200).json({ status: "success", service });
  } catch (error) {
    console.error("Error in updateServiceController:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Internal server error",
    });
  }
};

export const getServiceController = async (req, res) => {
  try {
    const { name } = req.params;
    console.log("Getting service with name:", name);

    const service = await servicesRepository.getServiceByName(name);
    console.log("Service found:", service ? "Yes" : "No");

    if (!service) {
      console.log("Service not found for name:", name);
      return res.status(404).json({
        status: "fail",
        message: `Service not found: ${name}`,
      });
    }

    console.log("Successfully retrieved service:", service.title);
    res.status(200).json({ status: "success", service });
  } catch (error) {
    console.error("Error in getServiceController:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Internal server error",
    });
  }
};

export const getServiceByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Getting service with id:", id);

    const service = await servicesRepository.getServiceById(id);
    console.log("Service found:", service ? "Yes" : "No");

    if (!service) {
      console.log("Service not found for id:", id);
      return res.status(404).json({
        status: "fail",
        message: `Service not found with id: ${id}`,
      });
    }

    console.log("Successfully retrieved service:", service.title);
    res.status(200).json({ status: "success", service });
  } catch (error) {
    console.error("Error in getServiceByIdController:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Internal server error",
    });
  }
};

export const getServicesByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log("Getting services for category:", categoryId);
    const services = await servicesRepository.getServicesByCategory(categoryId);
    console.log("Services found:", services.length);
    res.status(200).json({ status: "success", services });
  } catch (error) {
    console.error("Error in getServicesByCategoryController:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Internal server error",
    });
  }
};

export const getAllServicesController = async (req, res) => {
  try {
    console.log("Getting all services");
    const services = await servicesRepository.getAllServices();
    console.log("Services found:", services.length);
    res.status(200).json({ status: "success", services });
  } catch (error) {
    console.error("Error in getAllServicesController:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Internal server error",
    });
  }
};

export const deleteServiceController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting service with id:", id);
    const service = await servicesRepository.deleteService(id);
    console.log("Service deleted:", service.title);
    res.status(200).json({ status: "success", service });
  } catch (error) {
    console.error("Error in deleteServiceController:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Internal server error",
    });
  }
};
