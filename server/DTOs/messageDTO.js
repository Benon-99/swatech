export class MessageDTO {
    constructor({
        id,
        name,
        email,
        message,
        created_at
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
        this.created_at = created_at;
    }
}