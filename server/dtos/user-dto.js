module.exports = class UserDto {
    userName;
    email;
    id;
    isActivated;


    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.userName = model.userName
        this.isActivated = model.isActivated
    }
}