const matricula = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            alumnos: [],
            periodos: [],
            carreras: [],
            idMatrícula: '',
            idAlumno: '',
            fecha: '',
            periodo: '',
            carrera: '',
            nombreAlumno: '',
            codigoAlumno: ''
        }
    },
    methods: {
        buscarMatricula() {
            this.forms.buscarMatricula.mostrar = !this.forms.buscarMatricula.mostrar;
            this.$emit('buscar');
        },
        modificarMatricula(matricula) {
            this.accion = 'modificar';
            this.idMatricula = matricula.idMatricula;
            this.idAlumno = matricula.idAlumno;
            this.fecha = matricula.fecha;
            this.periodo = matricula.periodo;
            this.carrera = matricula.carrera;
            this.nombreAlumno = matricula.nombreAlumno;
            this.codigoAlumno = matricula.codigoAlumno;
        },
        guardarMatricula() {
            let matricula = {
                idAlumno: this.idAlumno,
                fecha: this.fecha,
                periodo: this.periodo,
                carrera: this.carrera,
                nombreAlumno: this.nombreAlumno,
                codigoAlumno: this.codigoAlumno
            };
            if (this.accion == 'modificar') {
                matricula.idMatricula = this.idMatricula;
            }
            db.matriculas.put(matricula);
            this.nuevaMatricula();
        },
        nuevaMatricula() {
            this.accion = 'nuevo';
            this.idMatricula = '';
            this.idAlumno = '';
            this.fecha = '';
            this.periodo = '';
            this.carrera = '';
            this.nombreAlumno = '';
            this.codigoAlumno = '';
        },
        actualizarAlumno() {
            let alumno = this.alumnos.find(alumno => alumno.idAlumno == this.idAlumno);
            this.nombreAlumno = alumno.nombre;
            this.codigoAlumno = alumno.codigo;
            this.cargarDatos();
        },
        cargarDatos() {
            
            db.alumnos.toArray().then(alumnos => this.alumnos = alumnos);
            this.periodos = ['I', 'II', 'III', 'IV'];
            this.carreras = ['Ingeniería en Sistemas', 'Ingeniería en Electrónica', 'Ingeniería en Mecánica', 'Ingeniería en Industrial'];
        }
    },
    created() {
        this.cargarDatos();
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmMatricula" name="frmMatricula" @submit.prevent="guardarMatricula">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Matriculas</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">ALUMNO</div>
                                    <div class="col-9 col-md-4">
                                        <select required v-model="idAlumno" name="cmbAlumno" id="cmbAlumno" class="form-select" @change="actualizarAlumno">
                                            <option v-for="alumno in alumnos" :value="alumno.idAlumno">{{alumno.nombre}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row p-1">
                                    <div class="col-3 col-md-2">FECHA</div>
                                    <div class="col-9 col-md-4">
                                        <input required v-model="fecha" type="date" name="txtFecha" id="txtFecha" class="form-control">
                                    </div>
                                </div>
                                <div class="row p-1">
                                    <div class="col-3 col-md-2">CARRERA</div>
                                    <div class="col-9 col-md-4">
                                        <select required v-model="carrera" name="cmbCarrera" id="cmbCarrera" class="form-select">
                                            <option v-for="carrera in carreras" :value="carrera">{{carrera}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row p-1">
                                    <div class="col-3 col-md-2">PERIODO</div>
                                    <div class="col-9 col-md-4">
                                        <select required v-model="periodo" name="cmbPeriodo" id="cmbPeriodo" class="form-select">
                                            <option v-for="periodo in periodos" :value="periodo">{{periodo}}</option>
                                        </select>
                                    </div>
                                </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarMatricula" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};