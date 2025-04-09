    
 const materia = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            materias: [],
            materia : {
                codigo: '',
                nombre: '',
                uv: '',
                codigo_transaccion: uuidv4(),
                estado: 'nuevo'
            },
        }
    },
    methods: {
        buscarMateria() {
            this.forms.buscarMateria.mostrar = !this.forms.buscarMateria.mostrar;
            this.$emit('buscar');
        },
        modificarMateria(materia) {
            this.accion = 'modificar';
            this.materia = {...materia};
            this.materia.estado = 'modificado';
        },
        guardarMateria() {
            let materia = {...this.materia};
            materia.hash = CryptoJS.SHA256(JSON.stringify({
                codigo: materia.codigo,
                nombre: materia.nombre,
                uv: materia.uv
            })).toString();
            if(navigator.onLine){
                delete materia.estado;
                fetch(`private/modulos/materias/materia.php?accion=${this.accion}&materias=${JSON.stringify(materia)}`)
                    .then(response => response.json())
                    .then(data => alertify.success("Materia guardada"))
                    .catch(error => console.log(error));
                materia.estado = 'sincronizado';
            }
            db.materias.put(materia);
            this.nuevoMateria();
            this.$emit('buscar');

        },
        nuevoMateria() {
            this.accion = 'nuevo';
            this.materia = {
                codigo: '',
                nombre: '',
                uv: '',
                codigo_transaccion: uuidv4(),
                estado: 'nuevo'
            }
        }
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmMateria" name="frmMateria" @submit.prevent="guardarMateria">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Materias</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="materia.codigo" type="text" name="txtCodigoMateria" id="txtCodigoMateria" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="materia.nombre" type="text" name="txtNombreMateria" id="txtNombreMateria" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">UV</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="materia.uv" type="text" name="txtUVMateria" id="txtUVMateria" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarMateria" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};