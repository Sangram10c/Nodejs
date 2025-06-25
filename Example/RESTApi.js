const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json');
const PORT = 5000;

app.get("/api/users", (req, res) => {

    const html =
        `<ul>
        ${users.map((user) =>
            `<li>${user.first_name} ${user.last_name} :  ${user.Job_title}</li>`
        ).join('')}
        </ul>`
    res.send(html);
})
app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user)

}).put((res, req) => {
    return res.json({ status: "Pending" })

}).post((res, req) => {
    return res.json({ status: "Pending" })

}).delete((res, req) => {
    return res.json({ status: "Pending" })
})


app.listen(PORT, () => console.log("Server start at port 5000"));