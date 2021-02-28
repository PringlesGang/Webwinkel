//Runs on startup

//DO NOT TOUCH
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as fs from "fs";
import * as path from "path";
import * as api from "./api-service.js";
import { parseCartCookie } from "./cookie.js";
import "cookie-parser";
import cookieParser from "cookie-parser";
dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = parseInt(`${process.env.PORT}`) || 3001;

app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "src/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/templates"));

app.get("/", async (req, res) => {

    res.render("index.ejs", {
        products: await api.get("products"),
        productCategories: await api.get("products/getProductByCategories")
    });
});

app.get("/order", async (req, res) => {
    const cart = parseCartCookie(req.cookies.cart);
    console.log(req.cookies);

    res.render("order.ejs", {
        products: await api.get("products"),
        cart
    });
});

app.get("/contact", async (req, res) => {
    res.render("contact.ejs");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});