export class CategoriesDTO {
    constructor(data) {
        this.id = data.id;
        this.category = data.category;
        this.title = data.title;
        this.mainDescription = data.mainDescription;
        this.overviewTitle = data.overviewTitle;
        this.overviewContent = data.overviewContent;
        this.offeringsTitle = data.offeringsTitle;
        this.offeringsContent = data.offeringsContent;
        this.services = data.services;
    }

    // Validation method
    validate() {
        if (!this.category) throw new Error('Category URL segment is required');
        if (!this.title) throw new Error('Title is required');
        if (!this.mainDescription) throw new Error('Main description is required');
        if (!this.services || !Array.isArray(this.services)) {
            throw new Error('Services must be a valid array');
        }
    }
}