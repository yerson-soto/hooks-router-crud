import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({titulo}) => {
    return (  
        <nav className="pt-2 pb-2 navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link 
                    to="/products" 
                    className="navbar-brand mr-5"
                >
                    {titulo}
                </Link>


                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink
                            to="/products" 
                            className="nav-link"
                            activeClassName="active"
                        >
                            Productos
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/product/new"
                            className="nav-link"
                            activeClassName="active"
                        >
                            Nuevo Producto
                        </NavLink>
                    </li>
                </ul>
                
            </div>
        </nav>
    );
}
 
export default Header;