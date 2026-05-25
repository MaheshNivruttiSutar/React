import { useState } from 'react';

function MyComponent() {
    const [foods, setFoods] = useState(["Apple", "Banana", "Cherry", "Date", "Elderberry"]);

    function handleAddFood() {
        const newFood = document.getElementById("food-input").value;
        document.getElementById("food-input").value = "";
        setFoods(f => [...f, newFood]);
    }

    function handleRemoveFood(index) {
        setFoods(f => f.filter((_, i) => i !== index));
    }

    return (<div>
        <h2>List of foods</h2>
        <ul>
            {foods.map((food, index) =>
            (<li key={index} onClick={() => handleRemoveFood(index)}>
                {food}</li>))}
        </ul>
        <input type="text" id="food-input" placeholder='Enter food name' />
        <button onClick={handleAddFood}>Add food</button>
    </div>
    )
}
export default MyComponent