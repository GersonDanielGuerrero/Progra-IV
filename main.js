const {createApp} = Vue;

createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: ''
        }
    },
    methods: {
        guardarAlumno() {
            console.log( 
                this.codigo,
                this.nombre,
                this.direccion,
                this.telefono,
                this.email
            );
        }
    }
}).mount('#app');