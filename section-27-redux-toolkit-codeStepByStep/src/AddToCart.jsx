import { useDispatch } from 'react-redux';
import { addItem } from './redux/slice';

function AddToCart({ product }) {
    const dispatch = useDispatch();

    return (
        <button
            type="button"
            className="add-to-cart-btn"
            onClick={() => dispatch(addItem(product))}
        >
            Add to Cart
        </button>
    );
}

export default AddToCart;
