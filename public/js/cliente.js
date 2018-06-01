function actualizarCarrito (){
    document.querySelectorAll('.carrito').forEach(function(cantidad){
        cantidad.innerHTML = arreglo.length;
    });
}

var arreglo = JSON.parse(localStorage.getItem('arreglo'));
if(arreglo == null) arreglo = [];

actualizarCarrito();

document.querySelector(".vaciar").addEventListener("click", function() {
    console.log("se vació el carrito");
    localStorage.clear(arreglo);
});