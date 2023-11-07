import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../common/axios';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './search1.module.scss';
import { SearchIcon } from '../../components/icons';
import useDelay from '../../hooks/useDelay';

const cb = classNames.bind(styles);

function Search1() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = useDelay(searchValue, 800);

  const inputRef = useRef();

  useEffect(() => {
    if (!title.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await axios.get(`search/title?q=${title}`);
      setSearchResult(result.data);
      setLoading(false);
    };

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div className={cb('groupSearch', 'showOnPC')}>
      <div className={cb('headlessTippy')}>
        <HeadlessTippy
          interactive
          visible={showResult && searchResult.length > 0}
          render={(attrs) => (
            <div className={cb('wrap')}>
              <div className={cb('whiteSpaceLeft')}></div>
              <div className={cb('search-result')} tabIndex="-1" {...attrs}>
                {searchResult.map((result) => (
                  <Link to={`watch/${result.linkVideo}`} key={result.id} className={cb('wrapper')}>
                    <SearchIcon className={cb('size-icon')} />
                    <span style={{ whiteSpace: 'pre', wordWrap: 'break-word' }}>{result.title}</span>
                  </Link>
                ))}
              </div>
              <div className={cb('whiteSpaceRight')}></div>
            </div>
          )}
          onClickOutside={handleHideResult}
        >
          <div className={cb('searchBox')}>
            <input
              id="search1"
              ref={inputRef}
              value={searchValue}
              placeholder="Search"
              spellCheck={false}
              onChange={handleChange}
              onFocus={() => setShowResult(true)}
              className={cb('searchInput')}
            />
            {!!searchValue && !loading && (
              <button className={cb('clear')} onClick={handleClear}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
            {loading && <i className={cb('loading', 'fa-solid fa-spinner')} />}
          </div>
        </HeadlessTippy>
      </div>
      <Tippy content="Search">
        <button className={cb('layoutIcon-search')} onMouseDown={(e) => e.preventDefault()}>
          <label htmlFor="search1" className={cb('layoutIcon-search-sup')}>
            <SearchIcon className={cb('size-icon')} />
          </label>
        </button>
      </Tippy>
    </div>
  );
}

export default Search1;
