const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let user = [{ name: "김준성", nickname: "hide on bush", id: "2018312075", depart: "소프트웨어학과" }];
let user_count = 1;
app.post('/connect', (req, res) => {
    user.push(req.body);
    user_count++;
    console.log(JSON.stringify(user))
    res.send(200);
})
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


