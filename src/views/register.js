import React,{useState} from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import Swal from 'sweetalert2';
import db from '../Firebase';

const Register = () => {
    const [Campos, setCampos] = useState({})
    const firebase = useFirebaseApp();

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value.trim()
        })
    }
 
    const ValidarDatos = async (e) =>{
        e.preventDefault()
        if(Campos.pass !== "" && Campos.pass2 !== "" && Campos.email !== "" && Campos.pass.length > 5 && Campos.lastname !== "" && Campos.firstname !== "" ){
            if(Campos.pass === Campos.pass2){
                try {
                    await firebase.auth().createUserWithEmailAndPassword(Campos.email, Campos.pass).then(res  => {
                        const Datos = {
                            id : res.user.uid,
                            nombres : `${Campos.firstname} ${Campos.lastname}`
                        }
                        agregarUsuarios(Datos)
                    })   
                } catch (error) {
                    Swal.fire({
                        icon : 'error',
                        title : "Ocurrió un error",
                        text : "Este usuario ya esta registrado."
                    })
                }
            }else{
                Swal.fire({
                    icon : 'warning',
                    title : 'Contraseñas invalidas',
                    text : 'Las contraseñas no son iguales.'
                })
            }

        }else{
            Swal.fire({
                icon : 'warning',
                title : 'Campos Vacios',
                text : 'Recuerda llenar todos los campos del formulario y colocar una contraseña de 6 o más caracteres.'
            })
        }
    }
    

    const agregarUsuarios = async (Datos) => {
        await db.firestore.collection("Usuarios").doc().set(Datos)
    }

    return (
        <div className="container mb-5" >
            <div className="row shadow-lg mt-3 rounded" >
                <div className="col-md-5 register-img start-right" >
                    
                </div>
                <div className="col-md-7 bg-dark start-left" >
                    <div className="p-5 m-2" >
                        <h5 className="m-2 h2 text-white" > ¡Bienvenido a la familia! </h5>
                        <h5 className="m-2 text-white" > Esperamos que te quedes en nuestra plataforma. </h5>
                        <hr className="line w-75 bg-white m-2" />

                        <form className="mt-4" onSubmit={ValidarDatos} > 
                            <div className="d-flex justify-content-between" >
                                <div className="m-2" >
                                    <h6 className="text-white m-2" > Nombres </h6>
                                    <input  name="firstname" onChange={onChange} className="form-control input m-2" placeholder="Email" />
                                </div>
                                <div className="m-2" >
                                    <h6 className="text-white m-2" > Apellidos </h6>
                                    <input  name="lastname" onChange={onChange} className="form-control input m-2" placeholder="Email" />
                                </div>
                            </div>
                            <h6 className="text-white m-2" > Correo Electronico </h6>
                            <input  name="email" onChange={onChange} className="form-control input m-2" placeholder="Email" />
                            <h6 className="text-white m-2" > Contraseña </h6>
                            <input  name="pass"  onChange={onChange} className="form-control input m-2" placeholder="Password" type="password" />
                            <h6 className="text-white m-2" > Valida tú contraseña </h6>
                            <input  name="pass2"  onChange={onChange} className="form-control input m-2" placeholder="Password" type="password" />
                            <button className="btn btn-outline-light m-2" > Entrar </button>
                        </form>
                        
                        <p className="text-muted mt-4" > ¿Ya tienes cuenta? Entra <a className="text-white" href="/Login" > aquí </a> </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Register;