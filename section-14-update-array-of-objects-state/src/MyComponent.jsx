import { useState } from 'react';

function MyComponent() {
    const [cars, setCars] = useState([])
    const [carYear, setCarYear] = useState(new Date().getUTCFullYear());
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");

    function handleAddCar() {
        const newCar = { year: carYear, make: carMake, model: carModel };
        setCars(prev => [...prev, newCar]);
        setCarYear(new Date().getUTCFullYear());
        setCarMake("");
        setCarModel("");
    }

    function handleRemoveCar(index) {
        setCars(prev => prev.filter((_, i) => i !== index));
    }

    function handleCarYearChange(event) {
        setCarYear(Number(event.target.value));
    }

    function handleCarMakeChange(event) {
        setCarMake(event.target.value);
    }

    function handleCarModelChange(event) {
        setCarModel(event.target.value);
    }

    return (
        <div>
            <h2>List of car objects</h2>
            <ul>
                {cars.map((car, index) => (
                    <li key={index} onClick={() => handleRemoveCar(index)}>{car.year} {car.make} {car.model}</li>
                ))}
            </ul>
            <input type="number" value={carYear} onChange={handleCarYearChange} /> <br />
            <input type="text" value={carMake} onChange={handleCarMakeChange} placeholder='Enter car make' /> <br />
            <input type="text" value={carModel} onChange={handleCarModelChange} placeholder='Enter car model' /> <br />
            <button onClick={handleAddCar}>Add car</button>
        </div>
    )
}
export default MyComponent