import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './redux/slice';
import { fetchProducts } from './redux/productSlice';
import { useEffect } from 'react';


function Product() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    const productSelector = useSelector((state) => state.products.items);
    const handleAddToCart = () => {
        dispatch(addItem());
    };

    const handleRemoveFromCart = () => {
        dispatch(removeItem());
    };

    return (
        <div className="grid">
            {productSelector.length && productSelector.map((item) => (
                <div className="card" key={item.id}>
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="content">
                        <div className="title">{item.title}</div>
                        <div className="brand">{item.brand}</div>
                        <div className="price">${item.price}</div>
                        <div className="category">{item.category}</div>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button className="remove-from-cart-btn" onClick={handleRemoveFromCart}>
                            Remove from Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Product;
