 // FILTROS
 var filtros = document.querySelectorAll(".filtros article div");
 var acciones = document.querySelectorAll(".filtros article");

 acciones.forEach(function (articulo) {
     filtros.forEach(function (pestana) {
         pestana.addEventListener("click", function () {
             var nombre = articulo.className;
             console.log(nombre);
             if (nombre.includes("contraido")) {
                 var newNombre = nombre.replace("contraido", " ");
                 articulo.className = newNombre;
             } else {
                 articulo.className = nombre + " contraido";
             }
         });
     });
 });

 /*
         filtros[0].addEventListener("click", function () {
             var nombre = acciones[0].className;
             console.log(nombre);
             if (nombre.includes("contraido")) {
                 var newNombre = nombre.replace("contraido", " ");
                 acciones[0].className = newNombre;
             } else {
                 acciones[0].className = nombre + " contraido";
             }
         });

         filtros[1].addEventListener("click", function () {
             var nombre = acciones[1].className;
             console.log(nombre);
             if (nombre.includes("contraido")) {
                 var newNombre = nombre.replace("contraido", " ");
                 acciones[1].className = newNombre;
             } else {
                 acciones[1].className = nombre + " contraido";
             }
         });

         filtros[2].addEventListener("click", function () {
             var nombre = acciones[2].className;
             console.log(nombre);
             if (nombre.includes("contraido")) {
                 var newNombre = nombre.replace("contraido", " ");
                 acciones[2].className = newNombre;
             } else {
                 acciones[2].className = nombre + " contraido";
             }
         });

         filtros[3].addEventListener("click", function () {
             var nombre = acciones[3].className;
             console.log(nombre);
             if (nombre.includes("contraido")) {
                 var newNombre = nombre.replace("contraido", " ");
                 acciones[3].className = newNombre;
             } else {
                 acciones[3].className = nombre + " contraido";
             }
         });
 */
 var botones = document.querySelectorAll(".filtros button");

 botones.forEach(function (boton) {
     boton.addEventListener("click", function () {
         var nombre = boton.className;
         console.log(nombre);
         if (nombre.includes("inactivo")) {
             var newNombre = nombre.replace("inactivo", "activo");
             boton.className = newNombre;
         } else {
             boton.className = nombre + " inactivo";
         }
     });
 });

document.querySelectorAll('.anadir').forEach(function(button) {
    button.addEventListener('click', function(){
        var id = button.parentElement.getAttribute('data-id');
        arreglo.push(id);
        actualizarCarrito();

        localStorage.setItem('arreglo', JSON.stringify(arreglo));
    });
});