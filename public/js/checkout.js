console.log(arreglo);

function tamano(a, b){
    var c = a.filter(cantidad => b)
    return c[0].lenght;
};


fetch("http:/crispopsweb.herokuapp.com/productosPorIds?ids="+arreglo+"")
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        console.log(res);
        let cart = [];
        res.forEach(function (elem){
            cart.push(elem);
        });
        var lista = document.querySelector('.lista');
        cart.forEach(function (elem) {
        lista.innerHTML += `<li>
        <img width="150px" src="`+elem.imagen+`">
        <div>
            <div>
                <article><h1>Crispops
                    <b>`+elem.tamano+`</b>
                </h1>
                <h2>Cantidad: <b>`+tamano(arreglo, elem._id)+`</b></h2>
                </article>
                <h2>Chocolate `+elem.sabor+`</h2>
                <p>`+elem.detalles+`</p>
                <h2>Total: $`+elem.precio+`.00</h2>
                </div>
        </div>
    </li>`;
    });
});