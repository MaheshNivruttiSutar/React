import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAllItems } from './redux/slice';
import Header from './Header';
import Product from './Product';
import CartList from './CartList';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const [view, setView] = useState('products');

    return (
        <>
            <Header currentView={view} onNavigate={setView} />
            <main className="main-content">
                {view === 'cart' ? (
                    <div className="cart-page">
                        <CartList />
                        <div className="cart-page-actions">
                            <button
                                type="button"
                                className="continue-shopping-btn"
                                onClick={() => setView('products')}
                            >
                                Continue Shopping
                            </button>
                            <button
                                type="button"
                                className="clear-cart-btn"
                                onClick={() => dispatch(clearAllItems())}
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="page-title">React redux toolkit tutorials</h1>
                        <Product />
                    </>
                )}
            </main>
        </>
    );
}

export default App;
