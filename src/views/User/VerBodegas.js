import React,{useEffect, useState} from 'react';
import db from '../../Firebase';

const VerBodegas = ({data ,user}) => {

    const [Productos, setProductos] = useState([])

    const traerDatos = async () =>{
        let arregloProductos = []
        db.firestore.collection("Productos").where("bodega", "==" , data.id ).get()
        .then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    arregloProductos.push(doc.data())
                })
                setProductos(arregloProductos)
            }else{
                setProductos([])
            }
        })

    }

    useEffect(() => {
        traerDatos()
        // eslint-disable-next-line  
    }, [])

    return (
        <div>
            {Productos.map(data => 
                <div className="row p-3 m-2 shadow opacidad pointer"  key={data.nombres} >
                    <h6 className="col-md-6 text-center mt-4" > {data.nombres} </h6>
                    <p  className="col-md-6 text-center mt-4" > {data.descripcion} </p>
                </div>
            )}

            {Productos.length === 0?  <div className="alert alert-warning m-2"> No existe ningún producto en esta bodega. </div> :null }
        </div>
    );
}
 
export default VerBodegas;