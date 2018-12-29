
/* -------------------------------------
    <- Clase modelo usuario ->
    Descripción: Esta clase va a definir el modelo
    de uso de datos de tipo usuario.
  --------------------------------------- */

  export class Usuario {

     

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}

  }

