import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
    const cartData = useSelector((state) => state.cartData);
    const amount = cartData.length
        ? cartData.map((item) => item.price).reduce((prev, next) => prev + next)
        : 0;
    const discount = amount / 10;
    const tax = Math.round(amount * 0.01);
    const total = amount - discount + tax;
    const formatRupee = (value) => value.toLocaleString('en-IN');

    return (
        <div className="cart-page">
            <Link to="/" className="cart-back-link">Back to products</Link>
            <h1>Your Cart</h1>
            {cartData.length === 0 ? (
                <div className="cart-empty">
                    <div className="cart-empty-icon" aria-hidden="true">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Add items from the shop to see them here.</p>
                    <Link to="/" className="cart-empty-btn">Continue shopping</Link>
                </div>
            ) : (
                <div className="cart-page-container">
                    <div className="cart-items-card">
                        <p className="cart-items-count">
                            {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
                        </p>
                        <div className="cart-table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Color</th>
                                        <th>Price</th>
                                        <th>Brand</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartData.map((item) => (
                                        <tr key={item.id}>
                                            <td className="cart-cell-name">{item.name}</td>
                                            <td>{item.color}</td>
                                            <td className="cart-cell-price">₹{item.price.toLocaleString()}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="price-details">
                        <div className="adjust-price"><span>Subtotal</span><span>₹{formatRupee(amount)}</span></div>
                        <div className="adjust-price"><span>Discount (10%)</span><span>₹{formatRupee(discount)}</span></div>
                        <div className="adjust-price"><span>Tax (1%)</span><span>₹{formatRupee(tax)}</span></div>
                        <div className="adjust-price"><span>Total</span><span>₹{formatRupee(total)}</span></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;