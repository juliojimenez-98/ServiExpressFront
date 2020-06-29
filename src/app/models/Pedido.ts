import { Empleado } from './empleado';
import { Proveedor } from './proveedor';
import { Producto } from './producto';

export class Pedido {
  idpedido: number;
  empleado:Empleado;
  proveedor: Proveedor;
  producto: Producto;
  cantidad: string;
  fechapedido:string;
  fecharecibo: string;
  estado:number;
}


