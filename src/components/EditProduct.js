import React, { useState, useRef } from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function EditProduct(props) {

    //destructuring a props
    const { history, product, setReload } = props;

    const [ category, setCategory ] = useState('');
    const [ error, setError ] = useState(false);

    //Crear los ref
    const saucerNameRef = useRef('');
    const saucerPriceRef = useRef('');

    const handleSubmit = async e => {
        e.preventDefault();

        //validacion
        const newSaucerName = saucerNameRef.current.value,
              newSaucerPrice = saucerPriceRef.current.value;

        if (newSaucerName === '' || /\s+$/.test(newSaucerName) || newSaucerPrice === '' || /\s+$/.test(newSaucerPrice)) {
            setError(true);
            return;
        }

        //revisar si cambio la categoria, de lo contrario agregar el mismo valor
        const saucerCategory = (category === '') ? product.categoria : category; 

        //crear el objeto a editar
        const saucerNewValues = {
            nombrePlatillo: newSaucerName,
            precioPlatillo: newSaucerPrice,
            categoria: saucerCategory
        }

        //consultar la api
        const url = `http://localhost:4000/restaurant/${product.id}`;
        try {
            const response = await axios.put(url, saucerNewValues);
            if (response.status === 200) {
                Swal.fire(
                    'Producto editado!',
                    'El producto se ha editado correctamente!',
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

        //redireccionar y consultar api
        setReload(true);
        history.push('/products');
    }

    const getRadioValue = e => {
        setCategory(e.target.value);
    }



    return (

        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>

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
                        placeholder="Nombre del platillo"
                        ref={saucerNameRef}
                        defaultValue={product.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label className="mb-4">Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={saucerPriceRef}
                        defaultValue={product.precioPlatillo}
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
                        defaultChecked={product.categoria === 'postre'}
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
                        defaultChecked={product.categoria === 'bebida'}
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
                        defaultChecked={product.categoria === 'cortes'}
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
                        defaultChecked={product.categoria === 'ensalada'}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Guardar Cambios" />
            </form>
        </div>
    )
}

export default withRouter(EditProduct);