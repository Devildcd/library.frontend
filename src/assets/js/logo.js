/* jshint esversion: 6 */



// body.addEventListener('scroll', function() {
//     var scrollPosition = window.pageYOffset;

//     if (scrollPosition > 100) {
//         // Si el usuario ha hecho scroll más allá de cierta posición, muestra la segunda imagen
//         document.querySelector('#logo').style.display = 'none';
//         document.querySelector('#logo2').style.display = 'block';
//     } else {
//         // De lo contrario, muestra la primera imagen
//         document.querySelector('#logo').style.display = 'block';
//         document.querySelector('#logo2').style.display = 'none';
//     }
// });
// Seleccionar el elemento del encabezado y el logotipo
// var header = document.querySelector('header');
// var logo = document.querySelector('#logo');

// // Agregar un evento de desplazamiento para el encabezado
// window.addEventListener('scroll', () => {
//     // Si el usuario ha desplazado hacia abajo, cambiar la imagen del logotipo
//     if (window.scrollY > 0) {
//         logo.src = 'assets/img/moncada/logo/m.png';
//         header.style.height = '80px';
//         logo.style.transform = 'scale(0.8)';
//     } else {
//         // Si el usuario ha desplazado hacia arriba, restaurar la imagen original del logotipo
//         logo.src = 'assets/img/moncada/logo/logoblanco2.png';
//         header.style.height = '120px';
//         logo.style.transform = 'scale(1)';
//     }
// });



// Seleccionar el elemento del encabezado y las imágenes del logotipo
//var header = document.querySelector('header');
//var logo1 = document.querySelector('#logo1');
//var logo2 = document.querySelector('#logo2');

// Agregar un evento de desplazamiento para el encabezado
// window.addEventListener('scroll', () => {
//     // Si el usuario ha desplazado hacia abajo, reducir la altura del encabezado y escalar el logotipo
//     if (window.scrollY > 0) {
//         header.style.height = '80px';
//         //logo1.style.opacity = '0';
//         // logo1.style.transform = 'scale(0.8)';
//         logo2.style.opacity = '1';
//         logo2.style.transform = 'scale(0.8)';
//     } else {
//         // Si el usuario ha desplazado hacia arriba, revertir los cambios
//         header.style.height = '120px';
//         logo1.style.opacity = '1';
//         logo1.style.transform = 'scale(1)';
//         logo2.style.opacity = '0';
//         logo2.style.transform = 'scale(1)';
//     }
// });