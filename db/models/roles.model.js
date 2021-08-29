const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const roleSchema = mongoose.Schema({
    role: {
        type: String, trim: true, required: true, unique:true
    },
})

// roleSchema.pre('save', async function () {
//     const role = this
//     if (role.isModified('role'))
//         role.role = await jwt.sign(role.role, process.env.JWTKEY)
// });

const Role = mongoose.model('Roles', roleSchema);
module.exports = Role;