// export class ServicesDTO {
//   constructor(data) {
//     this.id = data.id;
//     // this.name = data.name;
//     this.title = data.title;
//     this.subtitle = data.subtitle;
//     this.description = data.description;
//     this.subContent = data.subContent;
//     this.services = data.services;
//     this.categoryID = data.categoryID;
//   }

//   // Validation method
//   validate() {
//     // if (!this.name) throw new Error('Service name is required');
//     if (!this.title) throw new Error("Title is required");
//     if (!this.description) throw new Error("Description is required");
//     if (!this.services || !Array.isArray(this.services)) {
//       throw new Error("Services must be a valid array");
//     }
//     if (!this.categoryID) throw new Error("Category ID is required");
//   }
// }
export class ServicesDTO {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.servicelink = data.servicelink;
    this.overviewtitle = data.overviewtitle;
    this.overviewcontent = data.overviewcontent;
    this.features = data.features;
    this.categoryId = data.categoryId;
    this.status = data.status;
  }

  validate() {
    if (!this.title) throw new Error("Title is required");
    if (!this.description) throw new Error("Description is required");
    if (!this.servicelink) throw new Error("Service link is required");
    if (!this.categoryId) throw new Error("Category ID is required");

    // Validate features array if it exists
    if (this.features && !Array.isArray(this.features)) {
      throw new Error("Features must be a valid array");
    }
  }
}
