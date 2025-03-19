    
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
        async eliminarAlumno(alumno) {
            alertify.confirm('Eliminar Alumno', `¿Esta seguro de eliminar el alumno ${alumno.nombre}?`, async () => {
                let alumnoEliminado = {...alumno};
                alumnoEliminado.estado = 'eliminado';
                await db.alumnos.put(alumnoEliminado);
                console.log("Alumno eliminado localmente");
                await this.listarAlumnos();
                alertify.success(`Alumno ${alumno.nombre} eliminado`);
            }, () => { });
        },
        async bajarAlumnos() {
            console.log("Bajando alumnos...");
            fetch('private/modulos/alumnos/alumno.php?accion=consultar')
            .then(response => response.json())
            .then(data =>{
                this.alumnos = data;
                db.alumnos.bulkAdd(data);
                console.log("Alumnos bajados");
            });
        },
        async listarAlumnos() {
            if(navigator.onLine){
                await this.sincronizarDatos();
            }
            this.alumnos = await db.alumnos.filter(alumno => alumno[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())&&!(alumno.estado==='eliminado')).toArray()
        },
        async subirAlumnos() {
            // sube los alumnos creados localmente
            let alumnos = await db.alumnos.filter(alumno => alumno.estado === 'nuevo').toArray();
            console.log(alumnos);
            if (alumnos.length > 0) {
                console.log("Subiendo alumnos nuevos...");
                console.log(alumnos);
                alumnos.forEach(async alumno => {
                    let respuesta = await fetch(`private/modulos/alumnos/alumno.php?accion=nuevo&alumnos=${JSON.stringify(alumno)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg);
                    }
                    
                });
            }
            // sube los alumnos modificados localmente
            alumnos = await db.alumnos.filter(alumno => alumno.estado === 'modificado').toArray();
            if (alumnos.length > 0) {
                console.log("Subiendo alumnos modificados...");
                alumnos.forEach(async alumno => {
                    let respuesta = await fetch(`private/modulos/alumnos/alumno.php?accion=modificar&alumnos=${JSON.stringify(alumno)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg);
                    }
                });
            }
            // Elimina los alumnos eliminados localmente
            alumnos = await db.alumnos.filter(alumno => alumno.estado === 'eliminado').toArray();
            if (alumnos.length > 0) {
                console.log("Eliminando alumnos...");
                //Recorre el arreglo de alumnos eliminados y los elimina del servidor
                alumnos.forEach(async alumno => {
                    let respuesta = await fetch(`private/modulos/alumnos/alumno.php?accion=eliminar&alumnos=${JSON.stringify(alumno)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg); 
                    }
                });

                console.log("Los alumnos eliminados se eliminaron correctamente");
            }
        },
        async sincronizarDatos(){
            //Sube los alumnos al servidor
            await this.subirAlumnos();
            //Limpia la tabla de alumnos
            await db.alumnos.clear();
            //Baja los alumnos del servidor
            await this.bajarAlumnos();
        }
    },
    created() {
        this.listarAlumnos();
    },
    mounted() {
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