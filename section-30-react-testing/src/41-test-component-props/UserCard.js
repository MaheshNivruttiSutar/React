function UserCard({ name, role, location }) {
  return (
    <article className="UserCard">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Location: {location}</p>
    </article>
  );
}

export default UserCard;
