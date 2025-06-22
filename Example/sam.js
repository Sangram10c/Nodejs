const fs = require("fs");
const os = require("os");

// fs.mkdirSync("my-doc");

// fs.appendFileSync("my-doc/hello.txt", "Hello World!\n", (err) => {
//   if (err) {
//     console.error("Error writing to file:", err);
//   } else {
//     console.log("File written successfully!");
//   }
// })

// console.log(fs.statSync("my-doc/hello.txt"));

// console.log(os.cpus().length);

//blockin

console.log("Start reading file...");
const data = fs.readFileSync("my-doc/hello.txt", "utf-8");
console.log(data);
console.log("File read successfully!");