// ============================================================
//  HOW TO RENDER LISTS IN REACT
// ============================================================
//  Use .map() on an array to turn each item into JSX.
//  Always add a UNIQUE "key" prop so React can track each item.
//
//  Steps:
//    1. Have an array of data
//    2. (optional) filter / sort the array
//    3. Use .map() to convert each item into JSX
//    4. Wrap the result in <ul> or <ol>
// ============================================================

function List() {

    // STEP 1 — Our data (an array of objects).
    // Each object has a unique "id" to use as the key later.
    const fruits = [
        { id: 1, name: "Apple",      calories: 95  },
        { id: 2, name: "Banana",     calories: 105 },
        { id: 3, name: "Cherry",     calories: 50  },
        { id: 4, name: "Date",       calories: 282 },
        { id: 5, name: "Elderberry", calories: 305 },
    ];

    // STEP 2 — Filter: keep only fruits under 200 calories.
    // .filter() returns a NEW array (does not change the original).
    const lowCalFruits = fruits.filter((fruit) => fruit.calories < 200);

    // STEP 3 — Map: turn each fruit object into a <li> element.
    // The "key" prop MUST be unique — here we use fruit.id.
    const listItems = lowCalFruits.map((fruit) => (
        <li key={fruit.id}>
            {fruit.name}: <b>{fruit.calories} calories</b>
        </li>
    ));

    // STEP 4 — Show the items inside an ordered list <ol>.
    return (
        <div className="list-container">
            <h2>Low-Calorie Fruits</h2>
            <ol>{listItems}</ol>
        </div>
    );
}

export default List;


// ============================================================
//  EXTRA NOTES (kept here for reference)
// ============================================================
//
//  Sorting examples (use a COPY with [...] to avoid mutating):
//      [...fruits].sort((a, b) => a.name.localeCompare(b.name)) // A → Z
//      [...fruits].sort((a, b) => b.name.localeCompare(a.name)) // Z → A
//      [...fruits].sort((a, b) => a.calories - b.calories)      // low → high
//      [...fruits].sort((a, b) => b.calories - a.calories)      // high → low
//
//  Why "key" matters:
//      - React uses it to identify each item across re-renders.
//      - Best key: a stable unique id (from your database).
//      - OK key:   array index (only for static lists that never reorder).
//      - BAD key:  Math.random() — changes every render, breaks React.
//
//  Common mistakes:
//      - Forgetting key                → console warning
//      - Using Math.random() as key    → bad performance, lost focus
//      - Using .sort() without [...]   → mutates the original array
//      - Using forEach instead of map  → forEach returns nothing, no UI
