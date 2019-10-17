import React from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import axios from 'axios';

function ProductList ({product, setReload}) {

    const deleteProduct = id => {

        Swal.fire({
            title: 'Estas seguro?',
            text: "Esta accion no se puede revertir!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cacelar'
            
          }).then(async (result) => {
            if (result.value) {
                
                const url = `http://localhost:4000/restaurant/${id}`;
                try {
                    const response = await axios.delete(url);
                    if (response.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            'El platillo se ha eliminado.',
                            'success'
                        )

                        setReload(true);
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Hubo un error, intentalo de nuevo!'
                    })
                }

              
            }
          })
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">

            <p className="text-primary" data-category={product.categoria}>
                {product.nombrePlatillo}
                <span className="badge badge-primary rounded ml-3 font-weight-bold">
                    ${product.precioPlatillo}
                </span>
            </p>

            <div>
                <Link
                    to={`/product/edit/${product.id}`}
                    className="btn btn-success"
                >
                    <i className="far fa-edit mr-1"></i>
                    Editar
                </Link>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                >
                    <i className="far fa-trash-alt mr-1"></i>
                    Eliminar
                </button>
            </div>

        </li>
    )
}

export default ProductList;