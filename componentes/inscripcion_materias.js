const inscripcionmaterias = {
    props: ['forms'],
    data() {
        return {
            idInscripcion: '',
            idAlumno: '',
            idMateria: '',
            alumnos: [],
            materias: []
        }
    },
    methods: {
        buscarInscripcionMateria() {
            this.forms.buscarInscripcionMaterias.mostrar = !this.forms.buscarInscripcionMateria.mostrar;
            this.$emit('buscar');
        },
        modificarInscripcionMateria(inscripcion_materia) {
            this.idInscripcion = inscripcion_materia.idInscripcion;
            this.idAlumno = inscripcion_materia.idAlumno;
            this.idMateria = inscripcion_materia.idMateria;
        },
        guardarInscripcionMateria() {
            let inscripcion_materia = {
                idAlumno: this.idAlumno,
                idMateria: this.idMateria
            };
            db.inscripcion_materia.put(inscripcion_materia);
            this.nuevaInscripcionMateria();
        },
        cargarDatos() {
            db.matriculas.toArray().then(alumnos => this.alumnos = alumnos);
            db.materias.toArray().then(materias => this.materias = materias);
        }
    },
    created() {
        this.cargarDatos();
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmInscripcionMateria" name="frmInscripcionMateria" @submit.prevent="guardarInscripcionMateria">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Inscripción de Materias</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">ALUMNO</div>
                                <div class="col-9 col-md-4">
                                    <select required v-model="idAlumno" name="cmbAlumno" id="cmbAlumno" class="form-select">
                                        <option v-for="alumno in alumnos" :value="alumno.idAlumno">{{alumno.nombreAlumno}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">MATERIA</div>
                                <div class="col-9 col-md-4">
                                    <select required v-model="idMateria" name="cmbMateria" id="cmbMateria" class="form-select">
                                        <option v-for="materia in materias" :value="materia.idMateria">{{materia.nombre}}</option>
                                    </select>
                                </div>
                            </div>
                            <p class = "row p-1"
                            >Si no aparece el alumno que busca, este debe ser matriculado primero.</p>
                            <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarInscripcionMateria" value="Buscar" class="btn btn-info">
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};