import { Empleado } from './empleado';
import { Proveedor } from './proveedor';
import { Producto } from './producto';

export class Pedido {
  idpedido: number;
  empleado:string;
  proveedor: Proveedor;
  producto: Producto;
  cantidad: string;
  fechapedido:string;
  fecharecibo: string;
  comentariopedido: string;
  estado:number;
}


