import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <article style={{ padding: '100px', textAlign: 'center' }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <Link to="/" className="nav-link" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Visit Our Homepage
      </Link>
    </article>
  );
};

export default Missing;
