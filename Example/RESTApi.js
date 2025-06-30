const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json');
const PORT = 5000;
app.use(express.json());
const fs = require('fs');

app.get("/api/users", (req, res) => {

    const html =
        `<ul>
        ${users.map((user) =>
            `<li>${user.first_name} ${user.last_name} :  ${user.Job_title}</li>`
        ).join('')}
        </ul>`
    res.send(html);
});

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);

});
// app.put((req, res) => {
//     return res.json({ status: "Pending" })

// });
app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1 });
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users, null, 2));
    return res.json({ status: "Success", id: users.length });

});
app.delete("/api/users/:id", (req, res) => {
    const body = req.body;
    users.splice(users.findIndex((user) => user.id === Number(req.params.id)), 1);
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users, null, 2));
    return res.json({ status: "Success", id: req.params.id });
    
});
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);   
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...body };
        fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users, null, 2));
        return res.json({ status: "Success", id });
    }
    return res.status(404).json({ status: "Not Found", id });
});

app.listen(PORT, () => console.log("Server start at port 5000"));