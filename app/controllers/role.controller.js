const roleModel = require('../../db/models/roles.model');

class Role {

    static addRole = async(req, res) => {
        try {
            const role = await roleModel(req.body)
            await role.save()
            res.status(200).send({
                apiStatus: true,
                msg: "New role added successfully",
                data: {}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "addation role faild!",
                data: e.message
            });
        }
    }

    static allRole = async(req, res) => {
        try {
            const roles = await roleModel.find()
            res.status(200).send({
                apiStatus: true,
                msg: "New role added successfully",
                data: roles
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "addation role faild!",
                data: e.message
            });
        }
    }

}
module.exports = Role