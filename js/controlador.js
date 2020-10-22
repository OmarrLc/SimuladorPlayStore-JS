//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [


];

(() => {
    //Este arreglo es para generar textos de prueba
    let textosDePrueba = [
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
            "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
            "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
            "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
            "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
        ]
        //Genera dinamicamente los JSON de prueba para esta evaluacion,
        //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

    let contador = 1;
    for (let i = 0; i < 5; i++) { //Generar 5 categorias
        let categoria = {
            nombreCategoria: "Categoria " + i,
            descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
            aplicaciones: []
        };
        for (let j = 0; j < 10; j++) { //Generar 10 apps por categoria
            let aplicacion = {
                codigo: contador,
                nombre: "App " + contador,
                precio: (Math.random() * (2 - 0) + 0).toFixed(2),
                descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                icono: `img/app-icons/${contador}.webp`,
                instalada: contador % 3 == 0 ? true : false,
                app: "app/demo.apk",
                calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
                descargas: 1000,
                desarrollador: `Desarrollador ${(i+1)*(j+1)}`,
                imagenes: ["img/app-screenshots/1.webp", "img/app-screenshots/2.webp", "img/app-screenshots/3.webp"],
                comentarios: [
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Juan" },
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Pedro" },
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Maria" },
                ]
            };
            contador++;
            categoria.aplicaciones.push(aplicacion);
        }
        categorias.push(categoria);
    }

    // console.log(categorias);
})();
var indexAplicacion = null;
var indexCategoria = null;

var localStorage = window.localStorage;

if (localStorage.getItem('categorias') == null) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
} else {
    categorias = JSON.parse(localStorage.getItem('categorias'))
}



function cargarCategorias() {
    categorias.forEach((elemento, indexCategoria) => {
        document.getElementById('categoria').innerHTML +=
            `   <option  value="${indexCategoria}"> ${elemento.nombreCategoria} `

    })


    cargarAplicaciones(0);

}

cargarCategorias();



function cargarAplicaciones(categoria) {
    // console.log(categorias[categoria]);
    indexCategoria = categoria;
    document.getElementById('aplicaciones').innerHTML = '';
    categorias[categoria].aplicaciones.forEach((app, index) => {
        console.log(app);
        let estrellas = '';

        for (let i = 0; i < app.calificacion; i++) {
            estrellas += `<i class = "fas fa-star"> </i> `
        }
        for (let i = 0; i < (5 - app.calificacion); i++) {
            estrellas += `<i class = "far fa-star"> </i> `
        }

        if (app.precio <= 0.5) {
            app.precio = 'FREE'
        }

        // <i class = "far fa-star" > < /i>

        document.getElementById('aplicaciones').innerHTML +=
            `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-2">
                <div class="card border border-warning"  >
                    <img src="${app.icono}" class="card-img-top" alt="..." onclick="llenarModal(${index})" data-toggle="modal" data-target="#exampleModal">
                    <div class="card-body ta-left">
                        <h5 class="card-text">${app.nombre}</h5>
                        <p class="card-text">${app.desarrollador}</p>
                        <div style="color:gold">
                            ${estrellas} <br>
                            <button class="btn btn-outline-danger btn-sm" style="float:right" onclick="eliminarApp(${index})"> <i class="far fa-trash-alt"></i></button>
                        </div>
                        <h5 class="card-text">$ ${app.precio}</h5>
                    <div>
                </div>
                
            </div>
            


        `
    });


}

function llenarModal(index) {
    indexAplicacion = index;
    console.log(indexAplicacion);
    console.log(indexCategoria);

    var contenidoApp = categorias[indexCategoria].aplicaciones[indexAplicacion];


    document.getElementById('contenidoNuevo').classList.remove('col-12', 'col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-12', 'mb-12');
    document.getElementById('contenidoNuevo').classList.add('col-8', 'col-sm-8', 'col-md-8', 'col-lg-8', 'col-xl-8', 'mb-8');
    // Cargar Estrellas
    let estrellas = '';

    for (let i = 0; i < contenidoApp.calificacion; i++) {
        estrellas += `<i class = "fas fa-star"> </i> `
    }
    for (let i = 0; i < (5 - contenidoApp.calificacion); i++) {
        estrellas += `<i class = "far fa-star"> </i> `
    }


    // Cargar Comentarios
    let comentario = '';

    for (let i = 0; i < contenidoApp.comentarios.length; i++) {
        comentario += `
        <div style="padding:0;" class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 mb-2">
            <div data-toggle="modal" data-target="#exampleModal">
                <img src="img/user.webp" class="card-img-top rounded-circle" alt="...">
            </div>
        </div>
        <div style="padding:0;" class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-10">
            <div class="card-body ta-left">
                <h5 class="card-text">${contenidoApp.comentarios[i].usuario}</h5>
                <p class="card-text">${contenidoApp.comentarios[i].comentario}</p>

            </div>
        </div>
        
        `
    }

    document.getElementById('carruselApp').innerHTML = `
        <div class="carousel-item active">
            <img src="${contenidoApp.imagenes[0]}" class="d-block w-100" alt="${contenidoApp.imagenes[0]}">
        </div>
        <div class="carousel-item ">
            <img src="${contenidoApp.imagenes[1]}" class="d-block w-100" alt="${contenidoApp.imagenes[1]}">
        </div>
        <div class="carousel-item ">
            <img src="${contenidoApp.imagenes[2]}" class="d-block w-100" alt="${contenidoApp.imagenes[2]}">
        </div>
    `;
    document.getElementById('imagenApp').innerHTML =
        `
        <img src="${contenidoApp.icono}" class="card-img-top" alt="...">
    `;
    document.getElementById('contenidoApp').innerHTML = `
    <h5 class="card-text">${contenidoApp.nombre}</h5>
    <p class="card-text">${contenidoApp.descripcion}</p>
    <h5 class="card-text">${contenidoApp.precio}</h5>
    <hr>
    <div id="estrellasApp">
        ${estrellas}
    </div>`;
    document.getElementById('comentariosApp').innerHTML = comentario;

    if (contenidoApp.calificacion < 3) {
        document.getElementById('estrellasApp').style.color = 'red';

    } else {
        document.getElementById('estrellasApp').style.color = 'green';
    }

    if (contenidoApp.instalada == false) {
        document.getElementById('instalar').disabled = false
    } else {
        document.getElementById('instalar').disabled = true;

    }
    document.getElementById('guardar').style.display = 'none';
    document.getElementById('instalar').style.display = 'block';

    indexAplicacion = null;

}

function nuevaApp() {
    document.getElementById('carruselApp').innerHTML = '';
    document.getElementById('imagenApp').innerHTML = '';
    document.getElementById('contenidoApp').innerHTML = ''
    document.getElementById('comentariosApp').innerHTML = ''
    document.getElementById('contenidoNuevo').classList.remove('col-8', 'col-sm-8', 'col-md-8', 'col-lg-8', 'col-xl-8', 'mb-8');
    document.getElementById('contenidoNuevo').classList.add('col-12', 'col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-12', 'mb-12');
    document.getElementById('contenidoNuevo').innerHTML = `
    <div class="card-body ta-left" id="contenidoApp">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <select class="form-control mb-2" id="categoriaN">
                        
                    </select>
                    <input type="text" id="nombreN" class="form-control mb-2" placeholder="Nombre Aplicacion">
                    <input type="text" id="desarrolladorN" class="form-control mb-2" placeholder="Desarrollador">
                    <input type="number" id="calificacionN" class="form-control mb-2" placeholder="Calificación" min="0" max="5">
                    <input type="number" id="precioN" class="form-control mb-2" placeholder="Precio" min="0" max="5">
                    <select class="form-control" id="imagenN">
                        
                    </select>
                </div>
            </div>
        </div>
    </div>`

    categorias.forEach((elemento, index) => {
        document.getElementById('categoriaN').innerHTML +=
            ` <option  value="${index}"  > ${elemento.nombreCategoria} </option> `
    })

    for (let i = 1; i <= 50; i++) {
        document.getElementById('imagenN').innerHTML +=
            ` <option  value="img/app-icons/${i}.webp"  > Imagen ${i} </option> `

    }

    document.getElementById('instalar').style.display = 'none';
    document.getElementById('guardar').style.display = 'block';

}

function guardarApp() {
    categoria = document.getElementById('categoriaN').value
    nombre = aplicaciones.nombre;
    desarrollador = aplicaciones.desarrollador;
    calificaion = aplicaciones.calificaciones;
    precio = aplicaciones.precio;
    icono = aplicaciones.icono;
    comentarios = aplicaciones.comentarios;
    imagenes = aplicaciones.imagenes;
    console.log(categorias[categoria]);

    let textosDePrueba = [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
        "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
        "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
        "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
    ]

    categorias[categoria].aplicaciones.push({
        nombre: document.getElementById('nombreN').value,
        desarrollador: document.getElementById('desarrolladorN').value,
        calificacion: document.getElementById('calificacionN').value,
        precio: document.getElementById('precioN').value,
        icono: document.getElementById('imagenN').value,
        imagenes: ["img/app-screenshots/1.webp", "img/app-screenshots/2.webp", "img/app-screenshots/3.webp"],
        comentarios: [
            { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Juan" },
            { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Pedro" },
            { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Maria" },
        ]

    });
    localStorage.setItem('categorias', JSON.stringify(categorias))
    cargarAplicaciones(categoria);
    $('#exampleModal').modal('hide');


}

function eliminarApp(index) {
    var contenidoApp = categorias[indexCategoria].aplicaciones
    console.log(contenidoApp);
    contenidoApp.splice(index, 1);
    localStorage.setItem('categorias', JSON.stringify(categorias));
    cargarAplicaciones(indexCategoria);
}