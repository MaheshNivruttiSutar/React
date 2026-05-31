import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from './redux/slice';
import { fetchProducts } from './redux/productSlice';
import { useEffect } from 'react';
import AddToCart from './AddToCart';

function Product() {
    const dispatch = useDispatch();
    const productSelector = useSelector((state) => state.products.items);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <p className="status-message">Loading products...</p>;
    }

    if (status === 'failed') {
        return <p className="status-message error">Failed to load products: {error}</p>;
    }

    return (
        <div className="grid">
            {productSelector.map((item) => (
                <div className="card" key={item.id}>
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="content">
                        <div className="title">{item.title}</div>
                        <div className="brand">{item.brand}</div>
                        <div className="price">${item.price}</div>
                        <div className="category">{item.category}</div>
                        <div className="card-actions">
                            <AddToCart product={item} />
                            <button
                                type="button"
                                className="remove-from-cart-btn"
                                onClick={() => dispatch(removeItem(item.id))}
                            >
                                Remove from Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Product;
