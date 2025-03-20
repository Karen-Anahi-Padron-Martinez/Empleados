export interface LoginResponse {

  token: string;
  usuario: {
    id: string;
    clave_empleado: string;
    nombre: string;
    apellido_paterno: string;
    rol: number;
  };
}
