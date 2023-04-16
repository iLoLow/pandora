import "../styles/AdminWrapper.css";

function AdminWrapper({ title, children }) {
  return (
    <section>
      <div className="AdminHeader">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default AdminWrapper;
