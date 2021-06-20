import React from 'react';
import {useUser} from 'reactfire';
import 'firebase/auth';


const Navbar = () => {
    const user = useUser()

    return (
        <div className="container-dashboard start-top" >
            <div className="row p-4" >
                <div className="col-md-3" >
                    <div className="mt-4" >
                        <a className="h4 font-mono vinculo text-dark" href="/" > Kiqui </a>
                    </div>
                </div>
                <div className="col-md-6" >

                </div>
                <div className="col-md-3" >
                    {!user.data ? 
                        <div className="p-3" >
                            <button className="btn btn-outline-dark m-2 "  onClick={()=> window.location.replace("/Login") } >   Inicia Sesión </button>
                        </div>
                    :
                        null
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;