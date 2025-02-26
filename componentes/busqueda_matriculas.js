const buscarmatricula = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombreAlumno',
            matriculas: [],
        }
    },
    methods: {
        modificarMatricula(matricula){
            this.$emit('modificar', matricula);
        },
        eliminarMatricula(matricula) {
            alertify.confirm('Eliminar Matricula', `¿Esta seguro de eliminar la matricula?`, () => {
                db.matriculas.delete(matricula.idMatricula);
                this.listarMatriculas();
                alertify.success(`Matricula eliminada`);
            }, () => { });
        },
        async listarMatriculas() {
            this.matriculas = await db.matriculas.filter(matricula => matricula[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        },
    },
    created() {
        this.listarMatriculas();
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
                                    <option value="codigoAlumno">CODIGO</option>
                                    <option value="nombreAlumno">ALUMNO</option>
                                    <option value="periodo">PERIODO</option>
                                    <option value="carrera">CARRERA</option>
                                </select>
                            </th>
                            <th colspan="4">
                                <input type="text" @keyup="listarMatriculas()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>ALUMNO</th>
                            <th>PERIODO</th>
                            <th>CARRERA</th>
                            <th>FECHA</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="matricula in matriculas" @click="modificarMatricula(matricula)" :key="matricula.idMatricula">
                            <td>{{ matricula.nombreAlumno }}</td>
                            <td>{{ matricula.periodo }}</td>
                            <td>{{ matricula.carrera }}</td>
                            <td>{{ matricula.fecha }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarMaricula(matricula)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};