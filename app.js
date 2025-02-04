const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//express app
const app = express();

//connect to mongoDB
const dbURI =
  "mongodb+srv://nodeTestUser:A7ZlOgoG8ZSPvn9u@cluster0.e7pma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// register view engine
app.set("view engine", "ejs");
//app.set('views', "myviews")

// listen for requests

//middleware static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
/* app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
}); */

/* app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
}); */

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: " about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("67a0d16bee25713db142d94a")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes
app.get("/", (req, res) => {
  /*  const blogs = [
    {
      title: "Pingwings lay eggs",
      snippet: " Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Benedict finds pingwings",
      snippet: " Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to watch pingwings",
      snippet: " Lorem ipsum dolor sit amet consectetur",
    },
  ];
  // res.send("<p>home page</p>");
  res.render("index", { title: "Home", blogs }); */
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

//redirects
// app.get("/pingwings", (req, res) => {
//   res.redirect("/about");
// });

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
