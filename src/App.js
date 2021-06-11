import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

//Contexts
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
	const [products] = useState(data);
	// const [cart, setCart] = useState([]);
	// const initialCart = [];
	const [cart, setCart] = useLocalStorage("Cart",[])

	const addItem = item => {
		//Slight problem when page refreshes and doesn't recognize the item in the cart already
		if(!cart.includes(item)){
			setCart([...cart, item])
		}else {
			alert("Item already exists in cart!")
		}
	};

	const removeItem = id => {
		const newCart = cart.filter(item => item.id !== id)
		setCart(newCart)
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem, removeItem }}>
				<CartContext.Provider value={cart}>
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
