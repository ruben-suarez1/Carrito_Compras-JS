//Menu right
const bag =  document.querySelector('header .bag');
const carrito = document.querySelector('#minicart');
const contenedorCarrito =  document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn =  document.querySelector('#vaciar-carrito');
const cart =  document.querySelector('.cart');
const closecartBtn = document.querySelector('.closecart');

//Body
const listaCursos = document.querySelector('.cards');
let articulosCarrito = [];

loadEventListeners()
function loadEventListeners(){
    //Menu right cart
    bag.addEventListener('click', openCart);

    //Close Cart button
    closecartBtn.addEventListener('click', closecart)

    //Agregar curso presionando addToCart
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar articulo
    carrito.addEventListener('click', eliminarCurso);

    //muestra el local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];
        carritoHTML();
    })

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos carrito
        limpiarHTML();
    })
}

//Open cart
function openCart(e){
    e.preventDefault();
    cart.classList.add('activo')
}
//Close Cart
function closecart(e) {
    e.preventDefault();
    cart.classList.remove('activo')
}

//funciones 
function agregarCurso(e) {
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    console.log(e.target.classList);

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo de articulos por el data-id
        articulosCarrito = articulosCarrito.filter(  curso => curso.id !== cursoId );

        carritoHTML();//mostrams HTML
    }
}

//lee el contenido del HTML del curso
function leerDatosCurso(curso) {
    console.log(curso);

    //crea un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.title').textContent,
        precio: curso.querySelector('.price').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si y7a existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad 
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;//retorna el objeto actualizados
            }else {
                return curso;//retorna los objetos no duplicados
            }
        } );

        articulosCarrito = [...cursos];
    } else {

    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
    
    }

    console.log(articulosCarrito);

    carritoHTML();
}

//funcion mostar carrito en el HTML
function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();

    articulosCarrito.forEach( curso => {

        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

    //Agregar del LocalStorage}
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarHTML() {

    //forma lenta
    //contenedorCarrito.innerHTML= '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}