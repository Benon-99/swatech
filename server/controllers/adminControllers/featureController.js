import { FeatureDTO } from "../../DTOs/adminDTOs/FeatureDTO.js";
import featureRepo from "../../repositories/adminRepos/featureRepo.js";

export const getFeature = async (req, res) => {
  featureRepo.getFeature(res);
};

export const createFeature = async (req, res) => {
  const featuresDTO = new FeatureDTO(req.body);
  featureRepo.createFeature(featuresDTO, res);
};

export const updateFeature = async (req, res) => {
  const featuresDTO = new FeatureDTO(req.body);
  featureRepo.updateFeature(featuresDTO, res);
};

export const deleteFeature = async (req, res) => {
  const featuresDTO = new FeatureDTO(req.body);
  featureRepo.deleteFeature(featuresDTO, res);
};
