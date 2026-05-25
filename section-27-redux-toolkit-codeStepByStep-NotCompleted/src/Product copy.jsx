// import { useDispatch, useSelector } from 'react-redux';
// import { addItem, removeItem } from './redux/slice';
// import { fetchProducts } from './redux/productSlice';
// import { useEffect } from 'react';

// const products = [
//     {
//         id: 1,
//         name: 'Wireless Headphones',
//         price: 129.99,
//         description:
//             'Experience high-quality sound with these wireless headphones. Featuring noise cancellation, long-lasting battery life, and a sleek modern design for everyday use.',
//         image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQBZyTfNzz-67C6herMDrotbpD88zGtyFSYWHV4Zmi7pBxqoptoE4jJ77yZaFOgjBkr-Fh-2a1Y6465PmiZO_mJ64UkgkdVsKmJFTBXCpM-9GiyzF3Gk-4ygro',
//     },
//     {
//         id: 2,
//         name: 'Smart Watch',
//         price: 199.99,
//         description:
//             'Stay connected and track your fitness goals with this feature-rich smart watch. Built-in GPS, heart rate monitor, and 7-day battery life.',
//         image: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/smartwatch/g/f/1/-original-imahhybh93x7fba6.jpeg',
//     },
// ];

// function Product() {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);
//     const selector = useSelector((state) => state.products.items);
//     console.log(selector);
//     const handleAddToCart = () => {
//         dispatch(addItem());
//     };

//     const handleRemoveFromCart = () => {
//         dispatch(removeItem());
//     };

//     return (
//         <div className="products-container">
//             {products.map(product => (
//                 <div className="product-card" key={product.id}>
//                     <div className="product-image">
//                         <img src={product.image} alt={product.name} />
//                     </div>
//                     <div className="product-details">
//                         <h2 className="product-name">{product.name}</h2>
//                         <p className="product-price">${product.price.toFixed(2)}</p>
//                         <p className="product-description">{product.description}</p>
//                         <button
//                             className="add-to-cart-btn"
//                             onClick={handleAddToCart}
//                         >
//                             Add to Cart
//                         </button>

//                         <button
//                             className="remove-from-cart-btn"
//                             onClick={handleRemoveFromCart}
//                         >
//                             Remove from Cart
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Product;
