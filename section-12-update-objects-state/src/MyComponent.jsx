import { useState } from 'react';


function MyComponent() {

    const [car, setCar] = useState(
        {
            year: 2024,
            make: "Ford",
            model: "Mustang",
        }
    );

    function handleYearChange(event) {
        setCar(prev => ({ ...prev, year: Number(event.target.value) }));
    }
    function handleMakeChange(event) {
        setCar(prev => ({ ...prev, make: event.target.value }));
    }
    function handleModelChange(event) {
        setCar(prev => ({ ...prev, model: event.target.value }));
    }


    return (
        <div>
            <p>Your favourite car is {car.make} {car.model} {car.year}</p>
            <input type="number" value={car.year} onChange={handleYearChange} /> <br />
            <input type="text" value={car.make} onChange={handleMakeChange} /> <br />
            <input type="text" value={car.model} onChange={handleModelChange} /> <br />

        </div>
    )
}
export default MyComponent