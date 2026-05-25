// //Example : 1
// function Button() {
//     // const handleClick = () => console.log("You clicked me! 😁");
//     // const handleClik2 = (name) => console.log(`${name} clicked me! 😁`);
//     const handleClick3 = (name1) => console.log(`${name1} Stop clicking me! 😁`);

//     return (
//         // <button className="button" onClick={handleClick}>Click me 😁</button>
//         // <button className="button" onClick={() => handleClik2("John")}>Click me 😁</button>
//         <button className="button" onClick={() => handleClick3("John")}>Click me 😁</button>
//     )
// }

// export default Button




// //Example : 2
// function Button() {
//     let count = 0;

//     const handleclick = (name) => {
//         if (count < 3) {
//             count++;
//             console.log(`${name} clicked me! ${count} times`);
//         }
//         else {
//             console.log(`${name} Stop clicking me!`);
//         }
//     }

//     return (
//         <button className="button" onClick={() => handleclick("John")}>Click me 😁</button>
//     )
// }

// export default Button



// //Example : 3 Event propagation
// function Button() {
//     // const handleClick = (event) => console.log(event);

//     //After click on button text content will be changed to "Clicked! 😁"
//     const handleClick = (event) => event.target.textContent = "Clicked! 😁";

//     return (
//         <button className="button" onClick={(events) => handleClick(events)}>Click me 😁</button>
//     )
// }
// export default Button



//Example : 4 Double click event
function Button() {
    const handleClick = (event) => event.target.textContent = "Clicked! 😁";

    return (
        <button className="button" onDoubleClick={(events) => handleClick(events)}>Click me 😁</button>
    )
}
export default Button