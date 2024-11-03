const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); 
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

cargarEventListeners();
 
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.closest('.card');
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
     const precioElemento = curso.querySelector('p span'); 
     console.log('Elemento precio:', precioElemento);
 
     if (!precioElemento) {
         console.error('No se encontró el elemento precio dentro del curso:', curso); 
         return;
     }
 
     const infoCurso = {
         imagen: curso.querySelector('img').src,
         titulo: curso.querySelector('h4').textContent,
         precio: precioElemento.textContent,
         id: curso.querySelector('a').getAttribute('data-id'), 
         cantidad: 1
     };
 
     const cursoExistente = articulosCarrito.find(c => c.id === infoCurso.id);
     if (cursoExistente) {
         cursoExistente.cantidad++;
     } else {
         articulosCarrito.push(infoCurso);
     }
 
     carritoHTML();
 }
 
 
 function eliminarCurso(e) {
     e.preventDefault();
     if (e.target.classList.contains('borrar-curso')) {
         const cursoId = e.target.getAttribute('data-id');
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
         carritoHTML();
     }
 }
 
 function carritoHTML() {
     vaciarCarrito();
 
     articulosCarrito.forEach(curso => {
         const row = document.createElement('tr');
         row.innerHTML = `
             <td><img src="${curso.imagen}" width="100"></td>
             <td>${curso.titulo}</td>
             <td>${curso.precio}</td>
             <td>${curso.cantidad}</td>
             <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
         `;
         contenedorCarrito.appendChild(row);
     });
 }
 
 function vaciarCarrito() {
     while (contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
 }
 
  
 
     
 
 
    