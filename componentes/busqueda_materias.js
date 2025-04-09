    
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
        async eliminarMateria(materia) {
            alertify.confirm('Eliminar Materia', `¿Esta seguro de eliminar el materia ${materia.nombre}?`, async() => {
                let materiaEliminada = {...materia};
                materiaEliminada.estado = 'eliminado';
                await db.materias.put(materiaEliminada);
                console.log("Materia eliminada localmente");
                await this.listarMaterias();
                alertify.success(`Materia ${materia.nombre} eliminado`);
            }, () => { });
        },
        async bajarMaterias() {
            console.log("Bajando materias...");
            fetch('private/modulos/materias/materia.php?accion=consultar')
                .then(response => response.json())
                .then(data =>{
                    this.materias = data;
                    db.materias.bulkAdd(data);
                    console.log("Materias bajadas");
                });
        },
        async listarMaterias() {
            if(navigator.onLine){
                await this.sincronizarDatos();
            }
            this.materias = await db.materias.filter(materia => materia[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())&&!(materia.estado==='eliminado')).toArray()
        },
        async subirMaterias() {
            // sube las materias creadas localmente
            let materias = await db.materias.filter(materia => materia.estado === 'nuevo').toArray();
            console.log(materias);
            if (materias.length > 0) {
                console.log("Subiendo materias nuevas...");
                console.log(materias);
                materias.forEach(async materia => {
                    let respuesta = await fetch(`private/modulos/materias/materia.php?accion=nuevo&materias=${JSON.stringify(materia)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg);
                    }
                    
                });
            }
            // sube las materias modificadas localmente
            materias = await db.materias.filter(materia => materia.estado === 'modificado').toArray();
            if (materias.length > 0) {
                console.log("Subiendo materias modificadas...");
                materias.forEach(async materia => {
                    let respuesta = await fetch(`private/modulos/materias/materia.php?accion=modificar&materias=${JSON.stringify(materia)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg);
                    }
                    
                });
            }
            //Elimina las materias eliminadas localmente
            materias = await db.materias.filter(materia => materia.estado === 'eliminado').toArray();
            if (materias.length > 0) {
                console.log("Eliminando materias eliminadas...");
                materias.forEach(async materia => {
                    let respuesta = await fetch(`private/modulos/materias/materia.php?accion=eliminar&materias=${JSON.stringify(materia)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg);
                    }
                    
                });
            }
            console.log("Las materias han sido eliminadas en el servidor");
        },
        async sincronizarDatos() {
            // sube los alumnos y materias creados localmente
            await this.subirMaterias();
            await db.materias.clear();
            await this.bajarMaterias();
        }
    },
    created() {
        this.listarMaterias();
    },
    mounted(){
        window.addEventListener('online', this.sincronizarDatos);
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
                        <tr v-for="materia in materias" @click="modificarMateria(materia)" :key="materia.codigo_transaccion">
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