    
 const buscarmateria = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            materias: [],
        }
    },
    methods: {
        modificarMateria(materia){
            this.$emit('modificar', materia);
        },
        eliminarMateria(materia) {
            alertify.confirm('Eliminar Materia', `¿Esta seguro de eliminar el materia ${materia.nombre}?`, () => {
                db.materias.delete(materia.idMateria);
                this.listarMaterias();
                alertify.success(`Materia ${materia.nombre} eliminado`);
            }, () => { });
        },
        async listarMaterias() {
            this.materias = await db.materias.filter(materia => materia[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        },
        nuevoMateria() {
            this.accion = 'nuevo';
            this.idMateria = '';
            this.codigo = '';
            this.nombre = '';
            this.uv = '';
        }
    },
    created() {
        this.listarMaterias();
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
                                    <option value="uv">UV</option>
                                </select>
                            </th>
                            <th colspan="4">
                                <input type="text" @keyup="listarMaterias()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>UV</th>  
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="materia in materias" @click="modificarMateria(materia)" :key="materia.idMateria">
                            <td>{{ materia.codigo }}</td>
                            <td>{{ materia.nombre }}</td>
                            <td>{{ materia.uv }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarMateria(materia)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};