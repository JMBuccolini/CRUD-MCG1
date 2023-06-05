import CrudTableRow from "./CrudTableRow";




const CrudTable = ({ data, setDataToEdit, deleteData }) => {
    return (
        <div style={{display: "inline-block"}}>
            <h3>Lista de personajes</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length === 0 && (
                            <tr>
                                <td colSpan="3">Sin datos</td>
                            </tr>
                        )
                    }
                    {
                        data.length !== 0 &&
                        data.map((personaje) => (
                            <CrudTableRow personaje={personaje} setDataToEdit={setDataToEdit} deleteData={deleteData} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CrudTable;