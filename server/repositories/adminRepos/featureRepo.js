import prisma from "../../database.js";

class FeatureRepository {
  async getFeature(res) {
    try {
      const response = await prisma.feature.findMany();
      res.status(200).json({ status: "All Features!", response });
    } catch (error) {
      res.status(500).json({ status: "Couldn't find features", error });
    }
  }

  async createFeature(featuresDTO, res) {
    try {
      const response = await prisma.feature.create({
        data: featuresDTO,
      });
      res.status(201).json({ status: "Feature created!", response });
    } catch (error) {
      res.status(500).json({ status: "Couldn't create feature", error });
    }
  }

  async updateFeature(featuresDTO, res) {
    try {
      const response = await prisma.feature.update({
        data: featuresDTO,
        where: {
          id: featuresDTO.id,
        },
      });
      res.status(200).json({ status: "Feature updated!", response });
    } catch (error) {
      res.status(500).json({ status: "Couldn't update feature", error });
    }
  }

  async deleteFeature(featureDTO,res){
    try {
      const response = await prisma.feature.delete({
        where: {
          id: featureDTO.id,
        },
      })
      res.status(200).json({ status: "Feature deleted!", response });
    } catch (error) {
      res.status(500).json({ status: "Couldn't delete feature", error });
    }
  }
}

export default new FeatureRepository();
