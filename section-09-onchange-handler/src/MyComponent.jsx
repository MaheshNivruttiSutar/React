// onChange = event handler used primarily with form elements
//            ex. <input>, <textarea>, <select>, <radio>, <checkbox>
//            Triggers a function every time the value of the input changes
//
// ─────────────────────────────────────────────────────────────
// KEY POINTS
// ─────────────────────────────────────────────────────────────
//
// 1. Fires on EVERY change
//      - Runs on every keystroke / selection change
//      - Native HTML `onchange` only fires on blur — React's fires immediately
//
// 2. Receives a synthetic event object
//      - event.target.value     → text, textarea, select, number
//      - event.target.checked   → checkbox, radio
//      - event.target.files     → file input
//      - event.target.name      → useful when sharing one handler
//
// 3. Used to build CONTROLLED COMPONENTS
//      - Input's `value` is bound to state (useState)
//      - onChange updates that state
//      - Example:
//          <input value={name} onChange={(e) => setName(e.target.value)} />
//
// 4. One-way data flow
//      - State is the single source of truth
//      - UI always reflects the latest state value
//
// 5. Handling MULTIPLE inputs with ONE handler
//      - Give each input a `name` attribute
//      - Update the matching key in a state object:
//          setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//
// 6. Common gotchas
//      - Use camelCase: onChange  (not onchange)
//      - Pass the function:    onChange={handleChange}
//        Don't call it:        onChange={handleChange()}    ❌
//      - Always pair `value` with `onChange`
//        (otherwise React warns: "controlled input without onChange")
//      - Checkbox/radio → use `checked`, not `value`
//      - Number input → value is a STRING, convert with Number(e.target.value)


import { useState } from 'react';

function MyComponent() {
    const [name, setName] = useState("Guest");
    const [quantity, setQuantity] = useState(0);
    const [comment, setComment] = useState("");
    const [payment, setPaymentMethod] = useState("Select Option");
    const [shipping, setShipping] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }


    function handleQuantityChange(event) {
        setQuantity(Number(event.target.value));
    }


    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function handlePaymentOption(event) {
        setPaymentMethod(event.target.value);
    }

    function handleShippingChange(event) {
        setShipping(event.target.value);
    }


    return (
        <div>
            <input type="text" value={name} onChange={handleNameChange} />
            <p>Name: {name}</p>

            <input type="number" value={quantity} onChange={handleQuantityChange} />
            <p>Quantity: {quantity}</p>

            <textarea value={comment} onChange={handleCommentChange} />
            <p>Comment: {comment}</p>

            <select value={payment} onChange={handlePaymentOption}>
                <option value="Debit">Debit Card</option>
                <option value="Credit">Credit Card</option>
                <option value="Paypal">Paypal</option>
                <option value="Cash">Cash</option>
            </select>
            <p>Payment Method: {payment}</p>


            <label>
                <input type="radio" value="Pickup" checked={shipping === "Pickup"} onChange={handleShippingChange} />Pick up
            </label> <br />
            <label>
                <input type="radio" value="Delivery" checked={shipping === "Delivery"} onChange={handleShippingChange} />Delivery
            </label>
            <p>Shipping: {shipping}</p>
        </div >
    )
}

export default MyComponent