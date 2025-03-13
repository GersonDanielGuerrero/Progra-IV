<?php 
class DB{
    private $conexion, $consulta, $resultado;

    public function __construct($server, $user, $pass){
        $this->conexion = new PDO($server, $user, $pass, 
        array(PDO::ATTR_EMULATE_PREPARES => false, 
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die("Error al conectar con la base de datos");
    }
    public function consultasql($sql){
        try{
            $parametros = func_get_args();//obtiene los parametros que pasamos a la funcion
            array_shift($parametros); //elimina el primer parametro que es el sql
            $this->consulta = $this->conexion->prepare($sql);
            $this->resultado = $this->consulta->execute($parametros);
            return $this->resultado;
        }catch(Exception $e){
            return $e->getMessage();
        }
    }
    public function obtener_datos(){
        return $this->consulta->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>