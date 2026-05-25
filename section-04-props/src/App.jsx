//Props:
//Props are a way to pass data from a parent component to a child component.
//Read only properties that are shared by the parent component to the child component.


import Student from './Student.jsx';

function App() {

  return (
    <>
      <Student name="Mahesh" age={29} isStudent={true}/>
      <Student name="Umesh" age={28} isStudent={false}/>
      <Student name="Ramesh" age={27} isStudent={false}/>
      {/* <Student name="Suresh" age="33" isStudent={false}/> */}
      <Student/>
    </>
  )
}

export default App
