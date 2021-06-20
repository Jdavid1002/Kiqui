import React,{useState} from 'react';
import Swal from 'sweetalert2'
import db from '../../Firebase';

const AgregarBodegas = ({user}) => {

    const [Campos, setCampos] = useState({})

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value.trim()
        })
    }

    const enviarBodega = async (e) => {
        e.preventDefault()

        if(Campos.name !== ""){
            const Datos = {
                nombres : Campos.name , 
                usuario : user.id 
            }
            await db.firestore.collection("Bodegas").doc().set(Datos)
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
            <form className="bg-dark p-5" onSubmit={enviarBodega}  >
                <h6 className="m-2 text-white" > Agrega todos los productos que tu quieras. </h6>
                <input  name="name" onChange={onChange} className="form-control m-2 mt-3"  placeholder="Nombre de la bodega" />
                <button className="btn btn-outline-light m-2" > Agregar Bodega</button>
            </form>
        </div>
    );
}
 
export default AgregarBodegas;