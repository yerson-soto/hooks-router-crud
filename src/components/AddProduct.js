import React, { useState } from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function AddProduct({history, setReload}) {

    const [ saucerName, setSaucerName] = useState('');
    const [ saucerPrice, setSaucerPrice] = useState('');
    const [ category, setCategory] = useState('');
    const [ error, setError] = useState(false);
    
    const getRadioValue = e => {
        setCategory(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (saucerName === '' || /\s+$/.test(saucerName) || saucerPrice === '' || category === '') {
            //poner el error como true
            setError(true);
            return;
        }

        setError(false);

       //crear nuevo producto 
        try {
            const response = await axios.post('http://localhost:4000/restaurant', {
                nombrePlatillo: saucerName,
                precioPlatillo: saucerPrice,
                categoria: category
            });

            if (response.status === 201) {
                Swal.fire(
                    'Producto creado!',
                    'El producto se ha creado correctamente!',
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Hubo un error, intentalo de nuevo!'
            })
        }

        //Redirigir al usuario
        setReload(true);
        history.push('/products');

    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>

            {(error) ? <Error message="Todos los campos son obligatorios" /> : null}

            <form
                className="mt-5 text-primary"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label className="mb-4">Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control mb-4" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        onChange={e => setSaucerName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="mb-4">Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e => setSaucerPrice(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange={getRadioValue}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange={getRadioValue}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        onChange={getRadioValue}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        onChange={getRadioValue}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
    )
}

export default withRouter(AddProduct);