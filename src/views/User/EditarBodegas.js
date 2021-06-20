import React from 'react';
import Swal from 'sweetalert2';
import db from '../../Firebase';

const EditarBodegas = ({data , user}) => {

    const editarBodega = (e) => {
        e.preventDefault()
        let name = document.getElementById("name").value
        if(name !== data.nombres){
            const datos = {
                nombres : name,
                usuario : user.id
            }
            db.firestore.collection("Bodegas").doc(data.id)
            .update(datos)
            .then(res => {
                window.location.reload()
            })
        }else{
            Swal.fire({
                icon : 'warning',
                title : 'Campos Vacios',
                text : 'Recuerda llenar todos los campos del formulario y colocar una contraseña de 6 o más caracteres.'
            })
        }
    }

    return (
        <div className="d-flex justify-content-center" >
            <form className="bg-dark p-5" onSubmit={editarBodega}  >
                <h6 className="m-2 text-white" > Agrega todos los productos que tu quieras. </h6>
                <input  id="name"   className="form-control m-2 mt-3"  defaultValue={data.nombres} />
                <button className="btn btn-outline-light m-2" > Editar Bodega </button>
            </form>
        </div>
    );
}
 
export default EditarBodegas;