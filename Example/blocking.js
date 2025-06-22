const fs = require("fs");


//blocking

console.log("Start reading file...");
const data = fs.readFileSync("my-doc/hello.txt", "utf-8");
console.log(data);
console.log("File read successfully!");

//non-blocking

 console.log("Start reading file...");
 fs.readFile("my-doc/hello.txt", "utf-8", (err, readFile) => {
    console.log(readFile)
 })
 console.log("File read successfully!");