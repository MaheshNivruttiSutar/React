//Conditional Rendering:
//Conditional Rendering is a way to render different content based on a condition.
//It is used to render different content based on a condition.
//Show/hide/Change content based on a condition.
import UserGreeting from './UserGreeting.jsx';

function App() {
  return (
    <>
      <UserGreeting isLoggedIn={true} userName="Mahesh" />
    </>
  )

}

export default App
