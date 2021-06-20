import React,{useState, useEffect} from 'react';
import Bodegas from './Bodegas';
import {useUser , useFirebaseApp } from 'reactfire';
import Productos from './Productos';
import db from '../../Firebase';

const Dashboard = () => {

    const [numeroInterfaz, setnumeroInterfaz] = useState(0)
    const [datosUsuario, setdatosUsuario] = useState({})
    const User = useUser()

    const buscarDatosUsuario = () => {
        const id = User.data.uid
        db.firestore.collection("Usuarios").where("id", "==" , id).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setdatosUsuario({
                    nombres : doc.data().nombres,
                    email : User.data.email,
                    id : User.data.uid
                })
                setnumeroInterfaz(1)
            });
        })
    }

    useEffect(() => {
        buscarDatosUsuario()   
        // eslint-disable-next-line  
    }, [])


    const cambiarInterfaz = (numero) => {
        setnumeroInterfaz(numero)
        const arregloIdInterfaz = ["1","2","3"]
        const IdContenedores = arregloIdInterfaz.filter(data => data !== numero.toString() )
        IdContenedores.forEach(data => {
            document.getElementById(data).classList.remove("animacion")
        })
        document.getElementById(numero).classList.add("animacion")
    }

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    const firebase = useFirebaseApp();

    const Salir = async () => {
        await firebase.auth().signOut()
        window.location.replace("/")
    }

    return (
        <div className="container-dashboard" >
            <div className="row shadow-lg rounded" >
                <div className="col-md-3 bg-blue start-left" >

                    <div className="p-3">
                        <div className="d-flex justify-content-center " >
                            <div className="shadow p-3 m-2 rounded-circle bg-info" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </div>
                        </div>
                        <h6 className="text-white m-1 ml-3 text-center" > {datosUsuario.nombres} </h6>
                    </div>

                    <div className="d-flex justify-content-start p-3 pointer rounded" id="1" onClick={ ()=> cambiarInterfaz(1) } >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-box-seam" viewBox="0 0 16 16">
                            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                        </svg>
                        <h6 className="text-white m-1 ml-3" > Productos </h6>
                    </div>

                    <div className="d-flex justify-content-start p-3 pointer rounded" id="2" onClick={ ()=> cambiarInterfaz(2) } >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-grid-fill" viewBox="0 0 16 16">
                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                        </svg>
                        <h6 className="text-white m-1 ml-3" > Bodegas </h6>
                    </div>

                    <div className="d-flex justify-content-start p-3 pointer rounded" id="3" onClick={Salir} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" text-white bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>  
                        <h6 className="text-white m-1 ml-3" > Salir </h6>
                    </div>
                </div>

                <div className="col-md-9 start-right" >
                    <div className="d-flex justify-content-end mt-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-calendar4 m-2" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
                        </svg>
                        <p className="m-2" > {hoy.toDateString()}  </p>
                    </div>
                    <hr/>
                        { numeroInterfaz === 1 ? <Productos user={datosUsuario} /> :null}
                        { numeroInterfaz === 2 ? <Bodegas   user={datosUsuario} /> :null}
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;