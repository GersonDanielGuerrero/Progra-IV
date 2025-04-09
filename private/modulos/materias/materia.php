<?php
include('../../Config/Config.php');
extract($_REQUEST); //extrae todas las variables

$materias = $materias ?? '[]';
$accion = $accion ?? '';
$class_materias = new materias($conexion);
print_r(json_encode($class_materias->recibir_datos($materias)));
class materias {
    private $datos = [], $db, $respuesta=['msg'=>'ok'];

    public function __construct($conexion) {
        $this->db = $conexion;
    }
    public function recibir_datos($materias){
        global $accion;
        if($accion == 'consultar'){
            return $this->administrar_materias();
        }else{
            $this->datos = json_decode($materias, true);
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
        if( empty($this->datos['uv']) ){
            $this->respuesta['msg'] = 'Las unidades valorativas son requeridas';
        }
        return $this->administrar_materias();
    }
    private function administrar_materias(){
        global $accion;
        if($this->respuesta['msg'] == 'ok'){
            if($accion == 'nuevo'){
                return $this->db->consultasql('INSERT INTO materias(codigo,nombre,uv,codigo_transaccion) VALUES(?, ?, ?, ?)', 
                    $this->datos['codigo'], $this->datos['nombre'], $this->datos['uv'], $this->datos['codigo_transaccion']);
            }else if($accion == 'modificar'){
                return $this->db->consultasql('UPDATE materias SET codigo=?,nombre=?,uv=? WHERE codigo_transaccion = ?', 
                $this->datos['codigo'], $this->datos['nombre'], $this->datos['uv'], $this->datos['codigo_transaccion']);
            }else if($accion == 'eliminar'){
                return $this->db->consultasql('DELETE FROM materias WHERE codigo_transaccion = ?', $this->datos['codigo_transaccion']);
            }else if($accion == 'consultar'){
                $this->db->consultasql('SELECT idMateria, codigo, nombre, uv, codigo_transaccion FROM materias');
                return $this->db->obtener_datos();
            }
        }else{
            return $this->respuesta;
        }
    }
}
