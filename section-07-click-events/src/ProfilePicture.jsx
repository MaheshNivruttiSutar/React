
// //Example: 1
// function ProfilePicture() {

//     const imageUrl = "./src/assets/profile.jpg";
//     const onImageClick = () => console.log("Image clicked");

//     return (
//         <img onClick={onImageClick} src={imageUrl} alt="Profile Picture" className="profile-picture" />
//     )
// }

// export default ProfilePicture




//Example: 2
function ProfilePicture() {
    //hide image when clicked
    const imageUrl = "./src/assets/profile.jpg";
    const onImageClick = (event) => event.target.style.display = "none";

    return (
        <img onClick={onImageClick} src={imageUrl} alt="Profile Picture" className="profile-picture" />
    )
}
export default ProfilePicture