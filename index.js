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

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if(err) throw err;
    db = client.db("crispops");
    app.listen(5000);
});

app.get("/", (req, res) => {
    var prod = db.collection("productos").find();

    if(req.query.sabor)
        prod.filter({sabor: req.query.sabor});
    

    if(req.query.precio)
        prod.filter({precio: req.query.precio});
    

    if(req.query.pedidoMinimo){
        prod.filter({pedidoMinimo: req.query.pedidoMinimo});
    }
    

    if(req.query.tamano)
        prod.filter({tamano: req.query.tamano});
    
    
    prod.toArray((err, result) => {
            res.render("main", {
                productos: result
            });
        });
});

app.get("/checkout", (req, res) => {
    res.render('checkout');
});


app.get('/productos/:id', (req, res) => {
    var prod = db.collection('productos')
        .find({
            _id: new ObjectID(req.params.id)
        })
        .toArray((err, result) => {
            // console.log(result[0]);
            res.render('producto', {
                producto: result[0]
            });
        });
});


app.get('/productosPorIds', (req, res) => {
    
    var carritoDB = db.collection("carrito");
    console.log(req.query.ids);
    var arreglo = req.query.ids.split(',');

    arreglo = arreglo.map(function(id) {
        return new ObjectID(id);
    });
    carritoDB.insertMany(arreglo);
    var prod = db.collection('productos')
        .find({ _id: { $in: arreglo } })
        .toArray((err, result) => {
            res.send(result);
        });
});

app.get("/gameOne", (req, res)=>{
    res.render("gameOne");
});