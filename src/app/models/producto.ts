import { Categoria } from "./categoria";

export class Producto {
  idproducto: string;
  nombre: string;
  descripcion: string;
  valorbase: number;
  stock:number
  categoria: Categoria;
}
