    
 const buscaralumno = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            alumnos: [],
        }
    },
    methods: {
        modificarAlumno(alumno){
            this.$emit('modificar', alumno);
        },
        eliminarAlumno(alumno) {
            alertify.confirm('Eliminar Alumno', `¿Esta seguro de eliminar el alumno ${alumno.nombre}?`, () => {
                db.alumnos.delete(alumno.idAlumno);
                this.listarAlumnos();
                alertify.success(`Alumno ${alumno.nombre} eliminado`);
            }, () => { });
        },
        async listarAlumnos() {
            this.alumnos = await db.alumnos.filter(alumno => alumno[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        },
    },
    created() {
        this.listarAlumnos();
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
                                    <option value="codigo">CODIGO</option>
                                    <option value="nombre">NOMBRE</option>
                                    <option value="direccion">DIRECCION</option>
                                    <option value="telefono">TELEFONO</option>
                                    <option value="email">EMAIL</option>
                                </select>
                            </th>
                            <th colspan="4">
                                <input type="text" @keyup="listarAlumnos()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>DIRECCION</th>
                            <th>TELEFONO</th>
                            <th>EMAIL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alumno in alumnos" @click="modificarAlumno(alumno)" :key="alumno.idAlumno">
                            <td>{{ alumno.codigo }}</td>
                            <td>{{ alumno.nombre }}</td>
                            <td>{{ alumno.direccion }}</td>
                            <td>{{ alumno.telefono }}</td>
                            <td>{{ alumno.email }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarAlumno(alumno)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};