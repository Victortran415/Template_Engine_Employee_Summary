// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee")


class Manager {
    constructor(name, id, email, officeNumber) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber
    }
    getName() {
        return name;
    }
    getId() {
        return id;
    }
    getEmail() {
        return email;
    }
    getOfficeNumber() {
        return officeNumber
    }
    getRole() {
        return "Manager"
    }
}




module.exports = Manager