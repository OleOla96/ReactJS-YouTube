import { Link } from 'react-router-dom';

const Development = () => {
  return (
    <article style={{ padding: '100px', textAlign: 'center' }}>
      <h1>Sory!</h1>
      <p>We are in development</p>
      <Link to="/" className="nav-link" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Visit Our Homepage
      </Link>
    </article>
  );
};

export default Development;
