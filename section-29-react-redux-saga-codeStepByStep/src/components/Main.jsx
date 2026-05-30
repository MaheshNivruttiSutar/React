import { addToCart, emptyCart, removeToCart } from '../redux/action';
import { useDispatch } from 'react-redux'
import { productList } from '../redux/productAction';
import {useSelector} from 'react-redux'
import { useEffect } from 'react';

function Main() {
  const dispatch = useDispatch();
  let data = useSelector((state)=>state.productData);
  console.warn("data in main component", data);
  
  useEffect(()=>{
    dispatch(productList())
  },[dispatch])
  return (
    <div className="main-page">
      <div className="page-toolbar">
        <button type="button" onClick={() => dispatch(emptyCart())}>Empty Cart</button>
      </div>
      <div className="product-container">
        {
          data.map((item)=><div key={item.id} className="product-item">
            <div className="product-image-wrap">
              <img src={item.photo} alt={item.name} loading="lazy" />
            </div>
            <div>{item.name}</div>
            <div>Color: {item.color}</div>
            <div>₹{item.price.toLocaleString()}</div>
            <div>{item.category} · {item.brand}</div>
            <div className="product-actions">
              <button type="button" onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
              <button type="button" onClick={() => dispatch(removeToCart(item.id))}>Remove</button>
            </div>
          </div>)
        }
      </div>
    </div>
  );
}

export default Main;