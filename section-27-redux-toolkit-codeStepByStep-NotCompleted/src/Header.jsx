import { useSelector } from 'react-redux';

function Header() {
    const totalQuantity = useSelector(state => state.cart.value);

    return (
        <header className="navbar">
            <div className="navbar-brand">MyShop</div>
            <nav className="navbar-nav">
                <a href="#">Home</a>
                <a href="#">Products</a>
            </nav>
            <div className="navbar-cart">
                <span className="cart-icon">🛒</span>
                {totalQuantity > 0 && (
                    <span className="cart-badge">{totalQuantity}</span>
                )}
            </div>
        </header>
    );
}

export default Header;
