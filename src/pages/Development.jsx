import { Link } from 'react-router-dom';

const Development = () => {
  return (
    <article style={{ padding: '100px' }}>
      <h1>Sory!</h1>
      <p>We are in development</p>
      <div className="flexGrow">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default Development;
