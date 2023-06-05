import { useEffect, useState } from "react"





const initialForm = {
    name:"",
    lastname:"",
    id:null
}

const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {

    const [form, setForm] = useState(initialForm);

    //Handlers

    const handleChange = (e) => {
        setForm({

            ...form,//me traigo todo lo que está en mi estado form {name:,lastname:id}
            [e.target.name]: e.target.value // si escribimos en el input "name" e.target.name = name y e.target.value = 'Juan'   

            //mi estado form termina siendo = {name:"Juan", lastname:"Buccolini", id:null}
        })
    }

    //Esta función se dispara cuando el usuario hace click en enviar
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!form.name || !form.lastname){
            alert("Datos incompletos");
            return;
        }

        if(form.id === null){
            createData(form);
        }else{
            updateData(form);
        }
        handleReset()
    }

    //Esta función reinicia mi estado y limpia mi input
    const handleReset = (e) =>{
        setForm(initialForm);
        setDataToEdit(null)
    }

    useEffect(()=>{
        if(dataToEdit){ //si esto es true, significa que el usuario hizo click en editar
            setForm(dataToEdit) //entonces le damos al estado "form" el objeto que el usuario eligió
        }else{
            setForm(initialForm)
        }
    },[dataToEdit])



    



    return (
        <div>
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" onChange={handleChange}  value={form.name}/>
                <input type="text" name="lastname" placeholder="Lastname" onChange={handleChange}   value={form.lastname}/>
                <input type="submit" value="Enviar" /> 
                <input type="reset"  value="Limpiar" onClick={handleReset}/>
            </form>
        </div>
    )
}

export default CrudForm;