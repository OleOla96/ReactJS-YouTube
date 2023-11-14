import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './watch.scss';
import PropTypes from 'prop-types';

const cb = classNames.bind(styles);

function SideBar({ list, URL, extension }) {
  return (
    <>
      {list?.map((res) => (
        <div key={res?.id} className={cb('cardSidebar', 'card mb-4')}>
          <Link to={`/watch/${res?.linkVideo}`}>
            {res?.videoName && extension.some((ex) => res?.videoName.endsWith(ex)) ? (
              <video loading="lazy" className="card-img-top" src={`${URL}video/${res?.videoName}`} alt={res?.title} />
            ) : (
              <img
                loading="lazy"
                className="card-img-top"
                src={`https://i.ytimg.com/vi/${res?.linkVideo}/maxresdefault.jpg`}
                alt={res?.title}
              />
            )}
          </Link>
          <Link to={`/watch/${res?.linkVideo}`} className="card-text">
            <span className="cardSidebar-title">{res?.title}</span>
            <span className="cardSidebar-channel">{res?.user?.channelName}</span>
            <span className="text-infor">
              {res?.view} view{res?.view > 1 && 's'}
            </span>
          </Link>
        </div>
      ))}
    </>
  );
}

SideBar.propTypes = {
  list: PropTypes.array.isRequired,
  URL: PropTypes.string.isRequired,
  extension: PropTypes.array.isRequired,
};

export default SideBar;
