import PropTypes from 'prop-types';

function Student(props) {
    return (
        <div className="student">
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Student: {props.isStudent ? 'Yes' : 'No'}</p>
        </div>
    )

}

//Prop Types:
//Prop Types are a way to validate the props that are passed to a component.
//They are used to ensure that the props are of the correct type.
//They are used to ensure that the props are not null or undefined.
//They are used to ensure that the props are not an empty string.
//They are used to ensure that the props are not an empty array.
//They are used to ensure that the props are not an empty object.
//They are used to ensure that the props are not an empty function.


Student.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    isStudent: PropTypes.bool.isRequired,
}




//Default Props:
//Default Props are a way to set default values for the props that are passed to a component.
//They are used to ensure that the props are not null or undefined.
//They are used to ensure that the props are not an empty string.
//They are used to ensure that the props are not an empty array.
//They are used to ensure that the props are not an empty object.
//They are used to ensure that the props are not an empty function.


Student.defaultProps = {
    name: "Guest",
    age: 18,
    isStudent: false,
}
export default Student