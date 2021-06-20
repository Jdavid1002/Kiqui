import React,{useState} from 'react';
import Swal from 'sweetalert2'
import db from '../../Firebase';

const AgregarProductos = ({user}) => {

    const [Campos, setCampos] = useState({})

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value.trim()
        })
    }

    const enviarProducto = async (e) => {
        e.preventDefault()

        if(Campos.name !== "" && Campos.descri !== ""){
            const Datos = {
                nombres : Campos.name , 
                descripcion : Campos.descri,
                usuario : user.id  ,
                bodega : ""
            }
            await db.firestore.collection("Productos").doc().set(Datos)
            window.location.reload()
        }else{
            Swal.fire({
                icon : 'warning',
                title : 'Campos Vacios',
                text : 'Recuerda llenar todos los campos del formulario.'
            })
        }
    }

    return (
        <div className="d-flex justify-content-center" >
            <form className="bg-dark p-5" onSubmit={enviarProducto}  >
                <h6 className="m-2 text-white" > Agrega todos los productos que tu quieras. </h6>
                <input  name="name" onChange={onChange} className="form-control m-2 mt-3"  placeholder="Nombre del producto" />
                <input  name="descri" onChange={onChange} className="form-control m-2"  placeholder="Descripción del producto" />
                <button className="btn btn-outline-light m-2" > Agregar Producto </button>
            </form>
        </div>
    );
}
 
export default AgregarProductos;