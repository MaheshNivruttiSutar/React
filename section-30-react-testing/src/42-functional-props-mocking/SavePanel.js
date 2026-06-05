function SavePanel({ title, onSave }) {
  return (
    <section className="SavePanel">
      <h2>{title}</h2>
      <button type="button" onClick={onSave}>
        Save changes
      </button>
    </section>
  );
}

export default SavePanel;
