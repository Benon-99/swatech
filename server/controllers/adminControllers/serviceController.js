import serviceRepo from "../../repositories/adminRepos/serviceRepo.js";
import { ServiceDTO } from "../../DTOs/adminDTOs/ServiceDTO.js";

export const getService = async (req, res) => {
  serviceRepo.getService(res);
};

export const createService = async (req, res) => {
  const serviceDTO = new ServiceDTO(req.body);
  serviceRepo.createService(serviceDTO, res);
};

export const updateService = async (req, res) => {
  const serviceDTO = new ServiceDTO(req.body);
  serviceRepo.updateService(serviceDTO, res);
};

export const deleteService = async (req, res) => {
  const serviceDTO = new ServiceDTO(req.body);
  serviceRepo.deleteService(serviceDTO, res);
};
