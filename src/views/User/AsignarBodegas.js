import React,{useEffect, useState} from 'react';
import db from '../../Firebase';
import Swal from 'sweetalert2'


const AsignarBodegas = ({user, data }) => {

    const [Bodegas, setBodegas] = useState([])

    const traerDatos = async () =>{
        let arregloProductos = []
        db.firestore.collection("Bodegas").where("usuario", "==" , user.id).get()
        .then((querySnapshot) => {
            if(querySnapshot.docs.length > 0){
                querySnapshot.forEach((doc) => {
                    let data = {
                        nombres : doc.data().nombres,
                        id : doc.id,
                        usuario : doc.data().usuario
                    }
                    arregloProductos.push(data)
                });
                setBodegas(arregloProductos)
            }else{
                setBodegas([])
            }
        })
    }

    useEffect(() => {
        traerDatos()
        // eslint-disable-next-line  
    }, [])

    const agregarBodega = (bodega) => {
        if(data.bodega === ""){
            Swal.fire({
                title: '¿Quieres agregar este producto a esta bodega?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`,
              }).then( async (result) => {
                if (result.isConfirmed) {
                    const datos = {
                        nombres : data.nombres ,
                        descripcion : data.descripcion,
                        usuario : user.id,
                        bodega : bodega.id
                    }
                    db.firestore.collection("Productos").doc(data.id)
                    .update(datos)
                    .then(res => {
                        window.location.reload()
                    })
                } 
              })
        }else{
            Swal.fire({
                title: '¿Quieres editar la bodega de este producto?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`,
              }).then( async (result) => {
                if (result.isConfirmed) {
                    const datos = {
                        nombres : data.nombres ,
                        descripcion : data.descripcion,
                        usuario : user.id,
                        bodega : bodega.id
                    }
                    db.firestore.collection("Productos").doc(data.id)
                    .update(datos)
                    .then(res => {
                        window.location.reload()
                    })
                } 
              })
        }

    }

    return (
        <div>
            <h5 className="m-2 text-center" > Aquí podrás ver todas las bodegas que tienes agregadas. </h5>
            <div className="row" >
                {Bodegas.map(data =>
                    <div className="col-md-6" key={data.id} >
                        <div className="shadow p-3 m-2 pointer opacidad" onClick={()=> agregarBodega(data) }  >
                            <h2 className="text-center" > {data.nombres} </h2>
                        </div>
                    </div>
                )}
            </div>
            {Bodegas.length === 0 ?  <div className="alert alert-warning m-2" > No tienes ninguna bodega. </div> : null}
        </div>
    );
}
 
export default AsignarBodegas;