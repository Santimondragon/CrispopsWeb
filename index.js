const MongoClient = require("mongodb").MongoClient,
     ObjectID = require('mongodb').ObjectID,
     express = require("express"),
     consolidate = require("consolidate");
    
     
var app = express(),
    db;

app.engine("hbs", consolidate.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.static("public")); 

app.listen(5000, console.log("sii yaaa"));

/* MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if(err) throw err;
    db = client.db("crispops");
    app.listen(5000);
}); */

app.get("/", (req, res)=>{
    res.render("miniGame");
});