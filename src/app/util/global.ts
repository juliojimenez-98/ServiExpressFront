export var URL_TO_LOGIN={
    url:'http://127.0.0.1:8090',
    signin:'/api/auth/signin',
    signup:'/api/auth/signup',
    signupwork:'/api/auth/signupwork',
    updCre:'/api/entidad/cliente',
    updCreEmp:'/api/entidad/empleado',
    reqPass:'/api/auth/requestpass',//luego debe ir el nombre de usuario
    chgPasw:'/api/auth/changepassword/',
    regProveedor:'/api/proveedor/proveedor',
    getProveedor:'/api/proveedor/allproveedores',
    getProveedorId:'/api/proveedor/proveedor',
    regVehiculo:'/api/vehiculo/vehiculo',
    regCategoria:'/api/categoria/categoria',
    regProducto:'/api/producto/producto',
    updateProducto:'/api/producto/producto',
    regServicio:'/api/servicio/servicio',
    updateServicio:'/api/servicio/servicio',
    getCategoria:'/api/categoria/categorias?',
    getCategoriaId:'/api/categoria/categorias',
    getServicioId:'/api/servicio/servicios',
    getProductos:'/api/producto/allproducto?',
    getVeiculosPorId:'/api/vehiculo',
    getClientesPag:'/api/entidad/allclientes',
    getAllCategorias:'/api/categoria/categorias',
    getAllServicios:'/api/servicio/servicios',
    getAllProductoById:'/api/producto',
    getAllProducto:'/api/producto/productos',
    getAllClientes:'/api/entidad/allclientes',
    getEmpleados:'/api/entidad/allempleados',
    reservation:'/api/reserva/reserva',
    getSerivicios:'/api/servicio/servicios?',
    getReservaPorId:'/api/reserva',
    getReservas:'/api/reserva/reservasday',
    regPedido:'/api/pedido/pedido',
    cambiarEstadoPedido:'/api/pedido',
    getAllPedidos:'/api/pedido/pedidos',
    getPedidosRecibidos:`/api/pedido/2/estado`,
    getPedidosDetalle:`/api/pedido/3/estado`,
    getPedidosEstado:`/api/pedido`,
    getReservasMes:'/api/reserva/reservasmonth',
    getReservasDia:'/api/reserva/reservasday',
    getPago2:'/api/pago/pago',
    getPago:'/api/pago/pago',
    enviarEncuesta:'/api/satifaccion/ingresarencuesta'
}


export var URL_ENCUESTAS={
    url:'http://127.0.0.1:8090',
    getEncuesta1:'/api/satifaccion/encuesta',
    getEncuesta3:'/api/satifaccion/reportein',
}
