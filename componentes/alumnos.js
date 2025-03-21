    
 const alumno = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            alumno : {
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                codigo_transaccion: uuidv4(),
                estado: 'nuevo'
            },
        }
    },
    methods: {
        buscarAlumno() {
            this.forms.buscarAlumno.mostrar = !this.forms.buscarAlumno.mostrar;
            this.$emit('buscar');
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.alumno = {...alumno};
            this.alumno.estado = 'modificado';
        },
        guardarAlumno() {
            let alumno = {...this.alumno};
            console.log(alumno.estado);
            if(navigator.onLine){
                delete alumno.estado;
                fetch(`private/modulos/alumnos/alumno.php?accion=${this.accion}&alumnos=${JSON.stringify(alumno)}`)
                    .then(response => response.json())
                    .then(data => alertify.success("Alumno guardado"))
                    .catch(error => console.log(error));
                alumno.estado = 'sincronizado';
            }
            db.alumnos.put(alumno);
            this.nuevoAlumno();
            this.$emit('buscar');
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.alumno = {
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                codigo_transaccion: uuidv4(),
                estado: 'nuevo'
            };
        }
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmAlumno" name="frmAlumno" @submit.prevent="guardarAlumno">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Alumnos</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="alumno.codigo" type="text" name="txtCodigoAlumno" id="txtCodigoAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="alumno.nombre" type="text" name="txtNombreAlumno" id="txtNombreAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">DIRECCION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="alumno.direccion" type="text" name="txtDireccionAlumno" id="txtDireccionAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="alumno.telefono" type="text" name="txtTelefonoAlumno" id="txtTelefonoAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EMAIL</div>
                                <div class="col-9 col-md-6">
                                    <input v-model="alumno.email" type="text" name="txtEmailAlumno" id="txtEmailAlumno" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarAlumno" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};