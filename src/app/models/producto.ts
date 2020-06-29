import { Categoria } from "./categoria";

export class Producto {
  idproducto: string;
  categoria: Categoria;
  nombre: string;
  descripcion:string;
  valorbase: number;
  stock:number;
}
