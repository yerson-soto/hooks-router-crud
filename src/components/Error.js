import React from 'react';

const Error = ({message}) => {
    return (  
        <div className="alert alert-danger p3 my-5 text-center text-uppercase font-weight-bold">
            {message}
        </div>
    );
}
 
export default Error;