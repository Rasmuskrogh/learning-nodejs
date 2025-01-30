const fs = require("fs");

//reading files
fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

console.log("last line");

//writing files
fs.writeFile("./docs/blog1.txt", "hello, world", () => {
  console.log("file was written");
});
// if the file doesnt exist it's getting created.
fs.writeFile("./docs/blog2.txt", "hello, again", () => {
  console.log("file was created and written");
});

//directoires (if directory already exists it throws an error)
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder deleted");
  });
}

if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
} else {
  fs.writeFile("./docs/deleteme.txt", "", () => {
    console.log("file created");
  });
}
