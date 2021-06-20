import React from 'react';
import Swal from 'sweetalert2';
import db from '../../Firebase';

const EditarProductos = ({user, data}) => {

    const editarProducto = (e) => {
        e.preventDefault()
        console.log(data);
        let name = document.getElementById("name").value
        let descri = document.getElementById("descri").value
        if(name !== "" && descri !== ""){
            const datos = {
                nombres : name,
                descripcion : descri,
                usuario : user.id,
                bodega : data.bodega
            }
            db.firestore.collection("Productos").doc(data.id)
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
            <form className="bg-dark p-5" onSubmit={editarProducto}  >
                <h6 className="m-2 text-white" > Agrega todos los productos que tu quieras. </h6>
                <input  id="name"   className="form-control m-2 mt-3"  defaultValue={data.nombres} />
                <input  id="descri" className="form-control m-2"       defaultValue={data.descripcion} />
                <button className="btn btn-outline-light m-2" > Editar Producto </button>
            </form>
        </div>
    );
}
 
export default EditarProductos;