    
 const alumno = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            idAlumno: '',
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: '',
            nacimiento: '',
            sexo: '',
            departamento: '',
            municipio: '',
            distrito: ''
        }
    },
    methods: {
        buscarAlumno() {
            this.forms.buscarAlumno.mostrar = !this.forms.buscarAlumno.mostrar;
            this.$emit('buscar');
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.idAlumno = alumno.idAlumno;
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.direccion = alumno.direccion;
            this.telefono = alumno.telefono;
            this.email = alumno.email;
            this.nacimiento = alumno.nacimiento;
            this.sexo = alumno.sexo;
            this.departamento = alumno.departamento;
            this.municipio = alumno.municipio;
            this.distrito = alumno.distrito;
        },
        guardarAlumno() {
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                direccion: this.direccion,
                telefono: this.telefono,
                email: this.email,
                nacimiento: this.nacimiento,
                sexo: this.sexo,
                departamento: this.departamento,
                municipio: this.municipio,
                distrito: this.distrito
            };
            if (this.accion == 'modificar') {
                alumno.idAlumno = this.idAlumno;
            }
            db.alumnos.put(alumno);
            $refs.matricula.cargarDatos();
            this.nuevoAlumno();
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.idAlumno = '';
            this.codigo = '';
            this.nombre = '';
            this.direccion = '';
            this.telefono = '';
            this.email = '';
            this.nacimiento = '';
            this.sexo = '';
            this.departamento = '';
            this.municipio = '';
            this.distrito = '';
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
                                    <input required v-model="codigo" type="text" name="txtCodigoAlumno" id="txtCodigoAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="nombre" type="text" name="txtNombreAlumno" id="txtNombreAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">DIRECCION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="direccion" type="text" name="txtDireccionAlumno" id="txtDireccionAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="telefono" type="text" name="txtTelefonoAlumno" id="txtTelefonoAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EMAIL</div>
                                <div class="col-9 col-md-6">
                                    <input v-model="email" type="text" name="txtEmailAlumno" id="txtEmailAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                    <div class="col-3 col-md-2">NACIMIENTO</div>
                                    <div class="col-9 col-md-6">
                                        <input v-model="nacimiento" type="date" name="txtNacimientoALumno" id="txtNacimientoAlumno" class="form-control">
                                    </div>
                                </div>
                                <div class="row p-1">
                                    <div class="col-3 col-md-2">SEXO</div>
                                    <div class="col-9 col-md-4">
                                        <select v-model="sexo" name="cmbSexoAlumno" id="cmbSexoAlumno" class="form-select">
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row p-1">
                                    <div class="col-3 col-md-2">DEPARTAMENTO</div>
                                    <div class="col-9 col-md-6">
                                        <input v-model="departamento" type="text" name="txtDepartamentoAlumno" id="txtDepartamentoAlumno" class="form-control">
                                    </div>
                                </div>
                                <div class="row p-1">
                                    <div class="col-3 col-md-2">MUNICIPIO</div>
                                    <div class="col-9 col-md-6">
                                        <input v-model="municipio" type="text" name="txtMunicipioAlumno" id="txtMunicipioAlumno" class="form-control">
                                    </div>
                                </div>
                                <div class="row p-1">
                                    <div class="col-3 col-md-2">DISTRITO</div>
                                    <div class="col-9 col-md-6">
                                        <input v-model="distrito" type="text" name="txtDistritoAlumno" id="txtDistritoAlumno" class="form-control">
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