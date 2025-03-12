export class AboutDTO {
    constructor({ id, title, subtitle, description, img, mission, vision, values = [], stats = [],createdAt, updatedAt }) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.img = img;
        this.mission = mission;
        this.vision = vision;
        this.values = values;
        this.stats = stats;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}