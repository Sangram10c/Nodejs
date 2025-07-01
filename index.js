const express = require('express');
const app = express();
require("./Connectivity/connection");
const PORT = 5000;
const user = require('./Model/data')
app.use(express.json());


const fs = require('fs');


app.get("/api/users", async (req, res) => {
    const allusers = await user.find({});
    const html =
        `<ul>
        ${allusers.map((user) =>
            `<li>${user.first_name} ${user.last_name} :  ${user.Job_title}</li>`
        ).join('')}
        </ul>`;
    return res.send(JSON.stringify(allusers, null, 2));
});


app.route("/api/users/:id").get(async (req, res) => {
    const users = await user.findById(req.params.id);
    if (!users) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.json(users);

});



app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.Job_title || !body.email || !body.gender) {
        return res.status(400).json({ error: "All fields are required" });
    }
    await user.create({
        first_name: body.first_name,
        last_name: body.last_name,
        Job_title: body.Job_title,
        email: body.email,
        gender: body.gender
    });
    return res.status(201).json({ status: "User Created Successfully", });


});


app.delete("/api/users/:id", (req, res) => {
    const body = req.body;
    users.splice(users.findIndex((user) => user.id === Number(req.params.id)), 1);
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users, null, 2));
    return res.json({ status: "Success", id: req.params.id });

});


app.patch("/api/users/:id", async (req, res) => {
    try {
        const updateuser = await user.findByIdAndUpdate(req.params.id, {
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


});

app.listen(PORT, () => console.log("Server start at port 5000"));