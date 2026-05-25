import { useDispatch } from 'react-redux';
import { clearAllItems } from './redux/slice';
import Header from './Header';
import Product from './Product';
import './App.css';

function App() {
    const dispatch = useDispatch();

    return (
        <>
            <Header />
            <main className="main-content">
                <h1 className="page-title">React redux toolkit tutorials</h1>
                <button className="clear-cart-btn" onClick={() => dispatch(clearAllItems())}>
                    Clear All
                </button>
                <Product />
            </main>
        </>
    );
}

export default App;
