import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import departmentRoutes from "./routes/productRoutes.js";

//load config
dotenv.config({});

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is working");
});

app.use("/api/product", departmentRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Yeahhhhhhhh");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App running on port 5000`));
