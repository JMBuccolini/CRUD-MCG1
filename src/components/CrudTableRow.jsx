



const CrudTableRow = ({ personaje, setDataToEdit, deleteData }) => {

    let { name, lastname, id } = personaje;


    return (
        <tr>
            <td>{name}</td>
            <td>{lastname}</td>
            <td>

                <button onClick={() => setDataToEdit(personaje)} >Editar</button>
                <button onClick={() => deleteData(id, name)}>Eliminar</button>


            </td>
        </tr>
    )
}

export default CrudTableRow;