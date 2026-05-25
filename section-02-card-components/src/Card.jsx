import profilePicture from './assets/profile.jpg';

function Card() {
    return (
        <div className="card">
            <img src={profilePicture} alt="Profile Picture" />
            <h2 className="card-title">Mahesh Sutar</h2>
            <p>I am a Software Engineer</p>
        </div>
    );
}

export default Card