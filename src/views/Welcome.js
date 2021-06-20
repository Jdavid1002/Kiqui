import React from 'react';
import Ilustration from '../img/Ilustration.svg'

const Welcome = () => {
    return (  
        <div className="container" >
            <div className="row mt-5" >
                <div className="col-md-6" >
                    <div className="p-3 m-2 start-left" >
                        <h1 className="font-mono display-3"  > Administrador de Productos  </h1>
                        <hr className="line w-75 bg-primary" />
                        <p className="text-secondary h5" > Organiza y administra tus productos agregandolos a diferentes bodegas que tu puedes crear. </p>
                        <a className="w-50 btn btn-outline-primary mt-3" href="/Register"  > Empieza </a>
                    </div>
                </div>
                <div className="col-md-6 start-right" >
                    <div className="p-3 m-2" >
                        <div className="d-flex justify-content-center" >
                            <img alt="" src={Ilustration} className="w-75" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Welcome;