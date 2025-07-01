const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json');
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files from the 'public' directory
const fs = require('fs');

app.use((req, res, next) => {
    console.log("Hello Sanam");
    next();
});


//middleware
app.use((req, res, next) => {
    fs.appendFile("data.txt", `\n ${Date.now()}: ${req.ip} ${req.method} ${req.path}`,
        (err, data) => {
            next();
        })
});


app.get("/api/users", (req, res) => {
    const html =
        `<ul>
        ${users.map((user) =>
            `<li>${user.first_name} ${user.last_name} :  ${user.Job_title}</li>`
        ).join('')}
        </ul>`


    res.header("X-Author", "Sangram");// Custom header (Always use X prefix for custom headers)
    res.send(html);
});


app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);

});

// app.put((req, res) => {
//     return res.json({ status: "Pending" })

// });


app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users, null, 2));
    if (!body.first_name || !body.last_name || !body.Job_title || !body.email || !body.gender) {
        return res.status(400).json({ error: "All fields are required" });
    }
    return res.status(201).json({ status: "User Created Successfully", id: users.length });

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