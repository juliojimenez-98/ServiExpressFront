export var URL_TO_LOGIN={
    url:'http://127.0.0.1:8090',
    signin:'/api/auth/signin',
    signup:'/api/auth/signup',
    signupwork:'/api/auth/signupwork',
    updCre:'/api/entidad/cliente',
    updCreEmp:'/api/entidad/empleado',
    reqPass:'/api/auth/requestpass',//luego debe ir el nombre de usuario
    chgPasw:'/api/auth/changepassword/',
    regVehiculo:'/api/vehiculo/vehiculo',
    regProducto:'/api/producto/producto',
    updateProducto:'/api/producto/producto',
    regServicio:'/api/servicio/servicio',
    updateServicio:'/api/servicio/servicio',
    getServicioId:'/api/servicio/servicios',
    getProductos:'/api/producto/allproducto?',
    getVeiculosPorId:'/api/vehiculo',
    getClientesPag:'/api/entidad/allclientes',
    getAllCategorias:'/api/categoria/categorias',
    getAllServicios:'/api/servicio/servicios',
    getAllProductoById:'/api/producto',
    getAllProducto:'/api/producto/allproducto',
    getAllClientes:'/api/entidad/allclientes',
    getEmpleados:'/api/entidad/allempleados',
    reservation:'/api/reserva/reserva',
    getSerivicios:'/api/servicio/servicios?',
    getReservaPorId:'/api/reserva',
    getReservas:'/api/reserva/reservas',
}

export var URL_TO_CATEGORY={
    CREATE:'/api/categoria/add',
    UPDATE:'/api/categoria/update',
    OBTAIN_CATEGORIES:'/api/categoria/categorias',
}

export var URL_TO_SUB_CATEGORY={
    CREATE:'/api/categoria/add',
    UPDATE:'/api/categoria/update',
    OBTAIN_SUB_CATEGORIES:'/api/categoria/categorias',  
}
