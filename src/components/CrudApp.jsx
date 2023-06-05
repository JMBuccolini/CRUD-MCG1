import { useEffect, useState } from "react"
import axios from 'axios';
import CrudForm from "./CrudForm";
import Loader from "./Loader";
import CrudTable from './CrudTable';


export default function CrudApp() {

    const [db, setDb] = useState();
    const [dataToEdit, setDataToEdit] = useState(null);
    const [loading, setLoading] = useState(false);


    //Yo tengo que traerme información de la base de datos

    const getData = async () => {
        const res = await axios.get('http://localhost:5000/personajes') //pido información a la base de datos
        const json = res.data //accedo a la info que está en la propiedad data
        setDb(json) //la guardo en el estado llamado 'db'
    }

    useEffect(() => {
        setLoading(true);
        getData()
        setLoading(false)

    }, [])


    //Función que crea información nueva en la base de datos
    //{name:'Juan', lastname:'Buccolini'}
    const createData = async (data) => {
        data.id = Date.now(); //le doy una propiedad llamada id, al objeto que recibo
        axios.post('http://localhost:5000/personajes', data) //paso como segundo parámetro la información a postear.
        getData(); //llamo a getData para que se actualice la información de la DB.
    }

    //Función que actualiza información que ya está en la DB.
    const updateData = async (data) => {
        let endpoint = `http://localhost:5000/personajes/${data.id}`


        let options = {
            method: "PUT", //Este es un pedido para actualizar información
            headers: { "content-type": "application/json" },
            data: JSON.stringify(data)
        }

        await axios(endpoint, options)

        getData();
    }

    //Función que borra información de la base de datos.

    const deleteData = async (id, name) => {
        let isDelete = window.confirm( //Le preguntamos al usuario si quiere borrar, en caso de aceptar, esto devuelve true, sino false
            `Estás seguro que deseas eliminar el personaje ${name}?`
        );

        if (isDelete) {
            let endpoint = `http://localhost:5000/personajes/${id}`;
            let options = {
                method: "DELETE",
                headers: { "content-type": "application/json" }
            }

            await axios(endpoint,options)
            
            getData()
        }else{
            return;
        }
    }








    return (
        <div>
            <h2>CRUD App</h2>
            <CrudForm createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />

            {loading && <Loader/>}

            {

                db && (

                    <CrudTable data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>

                )


            }
        </div>
    )
}

