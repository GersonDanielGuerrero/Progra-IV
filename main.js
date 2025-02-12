const {createApp} = Vue;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');

createApp({
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            accion: 'nuevo',
            alumnos: [],
            idAlumno: '',
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: ''
        }
    },
    methods: {
        eliminarAlumno(alumno) {
            if (confirm(`¿Esta seguro de eliminar el alumno ${alumno.nombre}?`)){
                db.alumnos.delete(alumno.idAlumno);
                this.listarAlumnos();
            }
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.idAlumno = alumno.idAlumno;
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.direccion = alumno.direccion;
            this.telefono = alumno.telefono;
            this.email = alumno.email;
        },
        guardarAlumno() {
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                direccion: this.direccion,
                telefono: this.telefono,
                email: this.email
            };
            if (this.accion == 'modificar') {
                alumno.idAlumno = this.idAlumno;
            }
            db.alumnos.put(alumno);
            this.nuevoAlumno();
            this.listarAlumnos();
        },
        async listarAlumnos() {
            this.alumnos = await db.alumnos.where(this.buscarTipo).startsWithIgnoreCase(this.buscar).toArray();
            /*this.alumnos = await db.alumnos.filter(alumno =>{
                return alumno.nombre.toLowerCase().startsWith(this.buscar.toLowerCase()) || 
                    alumno.codigo.toLowerCase().startsWith(this.buscar.toLowerCase());
            }).toArray();*/

        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.idAlumno = '';
            this.codigo = '';
            this.nombre = '';
            this.direccion = '';
            this.telefono = '';
            this.email = '';
        }
    },
    created() {
        db.version(1).stores({
            alumnos: '++idAlumno, codigo, nombre, direccion, telefono, email'
        });
        this.listarAlumnos();
    }
}).mount('#app');