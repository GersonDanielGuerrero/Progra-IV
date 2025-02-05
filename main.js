const {createApp} = Vue;

createApp({
    data() {
        return {
            alumnos: [],
            alumnosMostrados: [],
            campoFiltrado: 'nombre',
            filtro: '',
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: '',
            nacimiento: '',
            sexo: '',
            departamento: '',
            municipio: '',
            distrito: '',
        }
    },
    methods: {
        eliminarAlumno(alumno) {
            if (confirm(`¿Esta seguro de eliminar el alumno ${alumno.nombre}?`)){
                localStorage.removeItem(alumno.codigo);
                this.listarAlumnos();
                //limpiar campos
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
        verAlumno(alumno) {
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
                distrito: this.distrito,
            };
            localStorage.setItem(this.codigo, JSON.stringify(alumno));
            this.listarAlumnos();
            //limpiar campos
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
        },
        listarAlumnos() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i),
                    valor = localStorage.getItem(clave);
                this.alumnos.push(JSON.parse(valor));
            }
            this.alumnosMostrados = this.alumnos;
        },
        filtrarAlumnos(){
            this.alumnosMostrados = this.alumnos.filter(alumno => {
                return alumno[this.campoFiltrado].toLowerCase().includes(this.filtro.toLowerCase());
            });
        }
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');