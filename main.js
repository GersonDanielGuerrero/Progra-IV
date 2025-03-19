const {createApp, ref} = Vue;
const {v4: uuidv4} = uuid;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');

const app = createApp({
    components: {
        alumno,
        materia,
        buscaralumno,
        buscarmateria,
        matricula,
        buscarmatricula,
        inscripcionmaterias,
        buscarmateriasinscritas,
    },
    data() {
        return {
            forms : {
                alumno: {mostrar: false},
                buscarAlumno: {mostrar: false},
                materia: {mostrar: false},
                buscarMateria: {mostrar: false},
                matricula: {mostrar: false},
                buscarMatricula: {mostrar: false},
                inscripcionMaterias: {mostrar: false},
                buscarInscripcionMaterias: {mostrar: false},
            },
        };
    },
    methods: {
        buscar(form, metodo) {
            this.$refs[form][metodo]();
        },
        abrirFormulario(componente) {
            this.forms[componente].mostrar = !this.forms[componente].mostrar;
        },
        modificar(form, metodo, datos) {
            this.$refs[form][metodo](datos);
        }
    },
    created() {
        db.version(1).stores({
            alumnos: 'codigo_transaccion, codigo, nombre, direccion, telefono, email, estado',
            materias: '++idMateria, codigo, nombre, uv, estado',
            matriculas: '++idMatricula, idAlumno, fecha, periodo, carrera, nombreAlumno, codigoAlumno',
            inscripcion_materia: '++idInscripcion, idAlumno, idMateria',
        });
    }
});
app.mount('#app');