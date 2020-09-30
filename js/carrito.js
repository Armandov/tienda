let $articulos = document.querySelector('#items');
let carrito = [];
let total = 0;
let $carrito = document.querySelector('#carrito');
let $total = document.querySelector('#total');
let $botonVaciar = document.querySelector('#boton-vaciar');


function renderItems() {
    for (let info of articulos) {
        // Estructura
        let Nodo = document.createElement('div');
        Nodo.classList.add('card', 'col-sm-4');
        // Body
        let NodoCardBody = document.createElement('div');
        NodoCardBody.classList.add('card-body');
        // Titulo
        let NodoTitle = document.createElement('h5');
        NodoTitle.classList.add('card-title');
        NodoTitle.textContent = info['nombre'];
        // Imagen
        let NodoImagen = document.createElement('img');
        NodoImagen.classList.add('img-fluid');
        NodoImagen.setAttribute('src', info['imagen']);
        // Precio
        let NodoPrecio = document.createElement('p');
        NodoPrecio.classList.add('card-text');
        NodoPrecio.textContent = '$ '+info['precio'];
        // Boton 
        let NodoBoton = document.createElement('button');
        NodoBoton.classList.add('btn', 'btn-primary');
        NodoBoton.textContent = 'comprar';
        NodoBoton.setAttribute('marcador', info['id']);
        NodoBoton.addEventListener('click', alCarrito);
        // Insertamos
        NodoCardBody.appendChild(NodoImagen);
        NodoCardBody.appendChild(NodoTitle);
        NodoCardBody.appendChild(NodoPrecio);
        NodoCardBody.appendChild(NodoBoton);
        Nodo.appendChild(NodoCardBody);
        $articulos.appendChild(Nodo);
    }
}

function alCarrito () {
    
    carrito.push(this.getAttribute('marcador'))
  
    calcularTotal();
    // Renderizamos el carrito 
    construirCarrito();
}

function construirCarrito() {
    // Vaciamos todo el html
    $carrito.textContent = '';
    // Quitamos los duplicados
    let carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach(function (item, indice) {
        // Obtenemos el item que necesitamos de la variable base de datos
        let miItem = articulos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        // Cuenta el número de veces que se repite el producto
        let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        let Nodo = document.createElement('li');
        Nodo.classList.add('list-group-item', 'text-right', 'mx-2');
        Nodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} $ ${miItem[0]['precio']}`;
        // Boton de borrar
        let miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.setAttribute('item', item);
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        Nodo.appendChild(miBoton);
        $carrito.appendChild(Nodo);
    })
}

function borrarItemCarrito() {
    console.log()
    // Obtenemos el producto ID que hay en el boton pulsado
    let id = this.getAttribute('item');
    // Borramos todos los productos
    carrito = carrito.filter(function (carritoId) {
        return carritoId !== id;
    });
    // volvemos a construir
    construirCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
}

function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    for (let item of carrito) {
        // De cada elemento obtenemos su precio
        let miItem = articulos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        total = total + miItem[0]['precio'];
    }
    // Formateamos el total para que solo tenga dos decimales
    let totalDosDecimales = total.toFixed(2);
    // Renderizamos el precio en el HTML
    $total.textContent = totalDosDecimales;
}

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    construirCarrito();
    calcularTotal();
}

// Eventos
$botonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderItems();

