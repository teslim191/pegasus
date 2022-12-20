const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");

// express body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(methodOverride("_method"));

app.use(morgan("dev"));

dotenv.config({ path: "./config/.env" });

// db connection
connectDB();

// helpers

const {
  select,
  editIcon,
  number_format,
  stripTags,
  truncate,
} = require("./helpers/hbs");

// handlebars middleware
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: { select, editIcon, number_format, stripTags, truncate },
  })
);

app.set("view engine", ".hbs");

// middleware for static folder
// Static folder
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use(cors());
// Express session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  // res.locals.success_msg = req.flash("success_msg");
  // res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  res.locals.msg = req.session.msg;
  delete req.session.msg;
  next();
});

// routes middleware
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes"));
app.use("/products", require("./routes/products"));
app.use("/order", require("./routes/order"));

// accessing the image publicly
app.use("/public/images", express.static("public/images"));
app.use("/products/public/images", express.static("public/images"));
app.use("/order/public/images", express.static("public/images"));


// catch any 404 error
app.use((req, res) => {
  res.status(404).render('error/404')
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
