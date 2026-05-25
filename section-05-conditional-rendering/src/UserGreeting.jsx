import PropTypes from 'prop-types';

function UserGreeting(props) {
    //Using if else statement
    // if(props.isLoggedIn) {
    //     return <h1>Welcome back, {props.userName}!</h1>
    // } else {
    //     return <h1>Please sign in to continue.</h1>
    // }


    //Same code using iterenty operator
    // return (props.isLoggedIn ? <h1 className="welcome-message">Welcome back, {props.userName}!</h1> :
    //     <h1 className="login-message">Please sign in to continue.</h1>)


    //Another way to write the code using ternary operator
    const welcomeMessage = <h1 className="welcome-message">Welcome back, {props.userName}!</h1>
    const loginMessage = <h1 className="login-message">Please sign in to continue.</h1>
    return props.isLoggedIn ? welcomeMessage : loginMessage
}
UserGreeting.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
}

UserGreeting.defaultProps = {
    isLoggedIn: false,
    userName: 'Guest',
}



export default UserGreeting