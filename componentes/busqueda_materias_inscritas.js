const buscarmateriasinscritas = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'alumno',
            inscripciones: [],
        }
    },
    methods: {
        async listarInscripciones() {
            if(buscarTipo == 'alumno'){
                let alumnosFiltrados = await db.alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(this.buscar.toLowerCase())).toArray();
                this.inscripciones = await db.inscripcion_materia.where('idAlumno').anyOf(alumnosFiltrados.map(alumno => alumno.idAlumno)).toArray();
            }
            else if(buscarTipo == 'materia'){
                let materiasFiltradas = await db.materias.filter(materia => materia.nombre.toLowerCase().includes(this.buscar.toLowerCase())).toArray();
                this.inscripciones = await db.inscripcion_materia.where('idMateria').anyOf(materiasFiltradas.map(materia => materia.idMateria)).toArray();
            }
            for (let inscripcion of this.inscripciones) {
                let alumno = await db.alumnos.get(inscripcion.idAlumno);
                let materia = await db.materias.get(inscripcion.idMateria);
                inscripcion.alumno = alumno.nombre;
                inscripcion.materia = materia.nombre;
            }
        },
        modificarInscripcion(inscripcion) {
            //en el segundo parametro pasar solo el id de la inscripcion, el id del alumno y el id de la materia
            this.$emit('modificar', {idInscripcion: inscripcion.idInscripcion, idAlumno: inscripcion.idAlumno, idMateria: inscripcion.idMateria});
        },
        eliminarInscripcion(inscripcion) {
            alertify.confirm('Eliminar Inscripcion', `¿Esta seguro de eliminar la inscripcion de ${inscripcion.alumno}?`, () => {
                db.inscripcion_materia.delete(inscripcion.idInscripcion);
                this.listarInscripciones();
                alertify.success(`Inscripcion de ${inscripcion.alumno} eliminada`);
            }, () => { });
        },
    },
    created() {
        this.listarInscripciones();
    },
    template: `
        <div class="row">
            <div class="col-6">
                <table class="table table-sm table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>BUSCAR POR</th>
                            <th>
                                <select v-model="buscarTipo" class="form-control">
                                    <option value="alumno">ALUMNO</option>
                                    <option value="materia">MATERIA</option>
                                </select>
                            </th>
                            <th colspan="4">
                                <input type="text" @keyup="listarInscripciones()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>ALUMNO</th>
                            <th>MATERIA</th>
                            <th>FECHA</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="inscripcion in inscripciones" @click="modificarInscripcion(inscripcion)" :key="inscripcion.idInscripcion">
                            <td>{{ inscripcion.alumno }}</td>
                            <td>{{ inscripcion.materia }}</td>
                            <td>{{ inscripcion.fecha }}</td>
                            <td>
                                <button @click.stop="eliminarInscripcion(inscripcion)" class="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};