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