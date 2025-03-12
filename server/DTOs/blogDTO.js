export class BlogDTO {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.slug = data.slug;
        this.date = data.date;
        this.categoryId = data.categoryId;
        this.image = data.image;
        this.published = data.published;
        this.authorId = data.authorId;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}