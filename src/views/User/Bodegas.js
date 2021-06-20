import React, {useState, useEffect} from 'react';
import db from '../../Firebase';  
import Swal from 'sweetalert2'
import AgregarBodegas from './AgregarBodegas';
import EditarBodegas from './EditarBodegas';
import VerBodegas from './VerBodegas';

const Bodegas = ({user}) => {

    const [Bodegas, setBodegas] = useState([])
    const [Validacion, setValidacion] = useState(true)
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)
    const [datosBodega, setdatosBodega] = useState({})

    const traerDatos = async () =>{
        let arregloProductos = []
        db.firestore.collection("Bodegas").where("usuario", "==" , user.id).get()
        .then((querySnapshot) => {
            if(querySnapshot.docs.length > 0){
                querySnapshot.forEach((doc) => {
                    let data = {
                        nombres : doc.data().nombres,
                        descripcion : doc.data().descripcion,
                        id : doc.id,
                        bodega : doc.data().bodega
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

    const eliminarBodega =  (id) => {
        Swal.fire({
            title: '¿Estas seguro que quieres eliminar esta bodega?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then( async (result) => {
            if (result.isConfirmed) {
                await db.firestore.collection('Bodegas').doc(id).delete()
                setBodegas(Bodegas.filter(dato => dato.id !== id ))

                await db.firestore.collection("Productos").where("bodega", "==" , id ).get()
                .then(res => {
                    res.forEach((doc) => {
                        const datos = {
                            nombres : doc.data().nombres,
                            descripcion : doc.data().descripcion,
                            usuario : doc.data().usuario,
                            bodega : ""
                        }
                        db.firestore.collection("Productos").doc(doc.id)
                        .update(datos)
                        .then(res => {
                            window.location.reload()
                        })
                    })
                })
            } 
          })
    }

    const cambiarInterfaz = (numero, estado , data) => {
        setValidacion(estado)
        setnumeroInterfaz(numero)
        setdatosBodega(data)
    }

    return (
        <div>
            {Validacion ? 
                <div>
                    {Bodegas.map(data => 
                        <div className="row p-3 m-2 shadow opacidad"  key={data.id} >
                            <div className="pointer col-md-4" onClick={()=> cambiarInterfaz(3 , false , data) } >
                                <h6 className=" mt-4" > {data.nombres} </h6>
                            </div>
                            <div className="col-md-8 d-flex justify-content-end" >
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex justify-content-center">
                                        <div className="shadow rounded-circle p-3 m-2 pointer" onClick={()=> eliminarBodega(data.id) } >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="shadow rounded-circle p-3 m-2 pointer" onClick={()=> cambiarInterfaz(2, false, data) } >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    )}
                    <div className="shadow p-3 m-2 pointer opacidad" onClick={()=>  cambiarInterfaz(1 , false , {}) } >
                        <h2 className="text-center" > + </h2>
                    </div>
                    { Bodegas.length === 0 ? <div className="alert alert-warning m-2" > No tienes ninguna bodega agregada. </div>  :null}
                </div>
            : 
                <div>
                    <div className="d-flex justify-content-start">
                        <div className="d-flex justify-content-center" >
                            <div className="shadow p-3 m-2 pointer rounded-circle" onClick={()=>  cambiarInterfaz(0, true, {}) }  >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {numeroInterfaz === 1 ? <AgregarBodegas    data={datosBodega}  user={user} />  : null}
                    {numeroInterfaz === 2 ? <EditarBodegas     data={datosBodega}  user={user} /> : null}
                    {numeroInterfaz === 3 ? <VerBodegas        data={datosBodega}  user={user} />  : null}
                </div>
            }
        </div>
    );
}
 
export default Bodegas;