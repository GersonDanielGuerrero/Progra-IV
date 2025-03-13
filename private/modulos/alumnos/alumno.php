<?php
include('../../Config/Config.php');
extract($_REQUEST); //extrae todas las variables

$alumnos = $alumnos ?? '[]';
$accion = $accion ?? '';
$class_alumnos = new alumnos($conexion);
print_r(json_encode($class_alumnos->recibir_datos($alumnos)));
class alumnos {
    private $datos = [], $db, $respuesta=['msg'=>'ok'];

    public function __construct($conexion) {
        $this->db = $conexion;
    }
    public function recibir_datos($alumnos){
        global $accion;
        if($accion == 'consultar'){
            return $this->administrar_alumnos();
        }else{
            $this->datos = json_decode($alumnos, true);
            return $this->validar_datos();
        }
    }
    private function validar_datos(){
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'El código es requerido';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'El nombre es requerido';
        }
        if( empty($this->datos['direccion']) ){
            $this->respuesta['msg'] = 'La dirección es requerida';
        }
        if( empty($this->datos['telefono']) ){
            $this->respuesta['msg'] = 'El teléfono es requerido';
        }
        if( empty($this->datos['email']) ){
            $this->respuesta['msg'] = 'El email es requerido';
        }
        return $this->administrar_alumnos();
    }
    private function administrar_alumnos(){
        global $accion;
        if($this->respuesta['msg'] == 'ok'){
            if($accion == 'nuevo'){
                return $this->db->consultasql('INSERT INTO alumnos(codigo,nombre,direccion,telefono,email,codigo_transaccion) VALUES(?, ?, ?, ?, ?, ?)', 
                    $this->datos['codigo'], $this->datos['nombre'], $this->datos['direccion'], 
                    $this->datos['telefono'], $this->datos['email'], $this->datos['codigo_transaccion']);
            }else if($accion == 'modificar'){
                return $this->db->consultasql('UPDATE alumnos SET codigo=?,nombre=?,direccion=?,telefono=?,email=? WHERE codigo_transaccion = ?', 
                $this->datos['codigo'], $this->datos['nombre'], $this->datos['direccion'], $this->datos['telefono'], 
                    $this->datos['email'], $this->datos['codigo_transaccion']);
            }else if($accion == 'eliminar'){
                return $this->db->consultasql('DELETE FROM alumnos WHERE codigo_transaccion = ?', $this->datos['codigo_transaccion']);
            }else if($accion == 'consultar'){
                $this->db->consultasql('SELECT idAlumno, codigo, nombre, direccion, telefono, email, codigo_transaccion FROM alumnos');
                return $this->db->obtener_datos();
            }
        }else{
            return $this->respuesta;
        }
    }
}