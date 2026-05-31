import { useSelector } from 'react-redux';

function Header({ currentView, onNavigate }) {
    const totalQuantity = useSelector((state) => state.cart.value);

    const handleNavClick = (event, nextView) => {
        event.preventDefault();
        onNavigate(nextView);
    };

    return (
        <header className="navbar">
            <div className="navbar-brand">MyShop</div>
            <nav className="navbar-nav">
                <a
                    href="#"
                    className={currentView === 'products' ? 'active' : ''}
                    onClick={(event) => handleNavClick(event, 'products')}
                >
                    Home
                </a>
                <a
                    href="#"
                    className={currentView === 'products' ? 'active' : ''}
                    onClick={(event) => handleNavClick(event, 'products')}
                >
                    Products
                </a>
            </nav>
            <button
                type="button"
                className={`navbar-cart${currentView === 'cart' ? ' active' : ''}`}
                onClick={() => onNavigate('cart')}
                aria-label={`View cart${totalQuantity > 0 ? `, ${totalQuantity} items` : ''}`}
                aria-current={currentView === 'cart' ? 'page' : undefined}
            >
                <span className="cart-icon" aria-hidden="true">🛒</span>
                {totalQuantity > 0 && (
                    <span className="cart-badge">{totalQuantity}</span>
                )}
            </button>
        </header>
    );
}

export default Header;
