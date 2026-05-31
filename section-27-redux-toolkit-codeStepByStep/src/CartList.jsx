import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from './redux/slice';

export default function CartList() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    if (!cartItems.length) {
        return (
            <section className="cart-list cart-page-panel">
                <h1 className="cart-page-title">Your Cart</h1>
                <p className="cart-empty">Your cart is empty.</p>
            </section>
        );
    }

    return (
        <section className="cart-list cart-page-panel">
            <h1 className="cart-page-title">Your Cart</h1>
            <ul className="cart-items">
                {cartItems.map((item) => (
                    <li className="cart-item" key={item.id}>
                        <img src={item.thumbnail} alt={item.title} />
                        <div className="cart-item-details">
                            <span className="cart-item-title">{item.title}</span>
                            <span className="cart-item-price">
                                ${item.price}
                                {item.quantity > 1 ? ` × ${item.quantity}` : ''}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="remove-from-cart-btn"
                            onClick={() => dispatch(removeItem(item.id))}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
