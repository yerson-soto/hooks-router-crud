import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

function App() {

   const [ products, setProducts ] = useState([]);
   const [ reload, setReload ] = useState(true);
   
   useEffect(
      () => {    
         if (reload) { 
            requestApi(); 
            setReload(false);
         }       
      }, [reload]
   );

   const requestApi = async () => {
         const url = 'http://localhost:4000/restaurant';
         const results = await axios(url);
         setProducts(results.data);
      
   }
   
   return (
      <Router>
         <Header 
            titulo="React Crud & Routing"
         />
         <main className="container mt-5">
            <Switch>

               <Route 
                  exact 
                  path="/product/new" 
                  render={() => (
                     <AddProduct 
                        setReload={setReload}
                     />
                  )} 
               />
               {/*end of new route*/}

               <Route 
                  exact 
                  path="/product/edit/:id" 
                  render={props => {
                     //tomar el id del producto
                     const productId = parseInt(props.match.params.id);
                     //tomar el producto cuando los ids coincidan
                     const selectedProduct = products.find(product => product.id === productId);
                     return (
                        <EditProduct 
                           product={selectedProduct}
                           setReload={setReload}
                        />
                     )
                  }
                  } 
               />
               {/*end of edit route*/}

               <Route 
                  exact 
                  path="/products" 
                  render={() => (
                     <Products  
                        products={products}
                        setReload={setReload}
                     />
                  )} 
               />
               {/*end of product route*/}

               <Route 
                  exact 
                  path="/product/:id" 
                  component={Product} 
               />
               {/*end of product route*/}
               
            </Switch>
         </main>
        

      <p className="mt-4 p2 text-center">Todos los derechos reservados &copy;</p>

      </Router>
   )
}

export default App;
