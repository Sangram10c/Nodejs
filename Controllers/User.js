const User = require('../Model/data');

async function getAllUsers(req, res) {
    const allusers = await User.find({});
    const html =
        `<ul>
        ${allusers.map((user) =>
            `<li>${user.first_name} ${user.last_name} :  ${user.Job_title}</li>`
        ).join('')}
        </ul>`;
    return res.send(JSON.stringify(allusers));
}

async function getUserById(req, res) {
    const users = await User.findById(req.params.id);
    if (!users) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.json(users);
}

async function createUser(req, res) {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.Job_title || !body.email || !body.gender) {
        return res.status(400).json({ error: "All fields are required" });
    }
    await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        Job_title: body.Job_title,
        email: body.email,
        gender: body.gender
    });
    return res.status(201).json({ status: "User Created Successfully", });
}

async function deleteUser(req, res) {
    const body = req.body;
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "User Delete Success", id: req.params.id });
}

async function updateUser(req, res) {
    try {
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            Job_title: req.body.Job_title
        },
            { new: true, runValidators: true });
        if (!updateuser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ status: "User Data Updated", data: updateuser });
    } catch (error) {
        return res.status(500).json({ error: "Invalid ID ", details: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};