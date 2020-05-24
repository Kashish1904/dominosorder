//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

var relation;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:admin@cluster0-tgur0.mongodb.net/test?retryWrites=true&w=majority/dominoDB", {useNewUrlParser: true});

const paymentSchema = {
  firstName: String,
  lastName: String,
  email: String,
  address1: String,
  address2: String,
  zip: Number,
  paymentMethod: String,
  ccName: String,
  ccNumber: Number,
  cvv: Number
}

const detailsSchema = {
  size_pan: String,
  size_corn: String,
  size_farm: String,
  size_marg: String,
  size_parad: String,
}

const Adress = mongoose.model("Adress", paymentSchema);

const Order = mongoose.model("Order", detailsSchema);

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html")
});
app.get("/checkout.html", function(req, res){
  res.sendFile(__dirname+"/checkout.html");
});


app.post("/", function(req, res){
  const detail = req.body;
  Adress.insertMany(detail);
  res.sendFile(__dirname+"/public/media/123.jpeg")
});

app.post("/checkout.html", function(req, res){
  const detail = req.body;
  Order.insertMany(detail);
  res.redirect("/checkout.html");
});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Started on 3000");
});
