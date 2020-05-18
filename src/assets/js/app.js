function ingre(){
    var email2 = document.getElementById('email').value;
    var pass2 = document.getElementById('pass').value;

         if (email2=="admin") {
            setTimeout("location.href='admin.html'", 0);
         } else if (email2=="empleado") {
            setTimeout("location.href='empleadolog/empleadolog.html'", 0);
        } else if (email2=="cliente") {
            setTimeout("location.href='clientelog.html'", 0);
        } else if (email2=="proveedor") {
            setTimeout("location.href='proveedores.html'", 0);
         } else {
             
         } 

}


function empleadoreg(){

    setTimeout("location.href='email.html'", 0);

}


function redireccionar() {
    setTimeout("location.href='register.html'", 0);}

function ocultar(){
    document.getElementById('mostrarOcultar').style.display="none";
    document.getElementById('mostrarAuto').style.display="block";
}
function mostrar(){
    document.getElementById('mostrarOcultar').style.display="block";
    document.getElementById('mostrarAuto').style.display="none";
}
function detalle(){
  document.getElementById('observacionDetalle').style.display="block";
}


//BARRA PROGRESO
let step = 'step1';

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');

function next() {
  if (step === 'step1') {
    step = 'step2';
    step1.classList.remove("is-active");
    step1.classList.add("is-complete");
    step2.classList.add("is-active");

  } else if (step === 'step2') {
    step = 'step3';
    step2.classList.remove("is-active");
    step2.classList.add("is-complete");
    step3.classList.add("is-active");

  } else if (step === 'step3') {
    step = 'step4d';
    step3.classList.remove("is-active");
    step3.classList.add("is-complete");
    step4.classList.add("is-active");

  } else if (step === 'step4d') {
    step = 'complete';
    step4.classList.remove("is-active");
    step4.classList.add("is-complete");

  } else if (step === 'complete') {
    step = 'step1';
    step4.classList.remove("is-complete");
    step3.classList.remove("is-complete");
    step2.classList.remove("is-complete");
    step1.classList.remove("is-complete");
    step1.classList.add("is-active");
  }
}