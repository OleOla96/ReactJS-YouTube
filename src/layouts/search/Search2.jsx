import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './search2.module.scss';
import axios from '../../common/axios';
import { SearchIcon, ArrowLeftIcon, VoiceIcon } from '../../components/icons';
import useDelay from '../../hooks/useDelay';

const cb = classNames.bind(styles);

function Search2({ classNames }) {
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
    <div className={cb('groupSearchHide', 'showOnMobile')}>
      <input type="checkbox" hidden id="showSearchBox" className={cb('btnSearch-sup')} />
      <div className={cb('groupSearchShow')}>
        <Tippy content="Back">
          <label htmlFor="showSearchBox" className={cb('show-size-icon', 'mb0')}>
            <ArrowLeftIcon className={cb('size-icon')} />
          </label>
        </Tippy>
        <div className={cb('headlessTippy')}>
          <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
              <div className={cb('search-result')} tabIndex="-1" {...attrs}>
                {searchResult.map((result) => (
                  <Link to={`watch/${result.linkVideo}`} key={result.id}>
                    <SearchIcon className={cb('size-icon')} />
                    <span style={{ whiteSpace: 'pre', wordWrap: 'break-word' }}>{result.title}</span>
                  </Link>
                ))}
              </div>
            )}
            onClickOutside={handleHideResult}
          >
            <div id="showSearchBox" className={cb('searchBox')}>
              <input
                id="search2"
                ref={inputRef}
                value={searchValue}
                placeholder="Search"
                spellCheck={false}
                onChange={handleChange}
                onFocus={() => setShowResult(true)}
                className={cb('search')}
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
            <label htmlFor="search2" className={cb('layoutIcon-search-sup')}>
              <SearchIcon className={cb('size-icon')} />
            </label>
          </button>
        </Tippy>
        <Tippy content="Search with your voice">
          <button className={cb('show-size-icon')}>
            <VoiceIcon className={cb('size-icon')} />
          </button>
        </Tippy>
      </div>
      <Tippy content="Search">
        <label htmlFor="showSearchBox" className={cb('show-size-icon', 'mr-3', 'mb0')}>
          <SearchIcon className={cb('size-icon')} />
        </label>
      </Tippy>
      <Tippy content="Search with your voice">
        <button className={cb('show-size-icon', 'hideOnMoblie', 'mr-3')}>
          <VoiceIcon className={cb('size-icon')} />
        </button>
      </Tippy>
    </div>
  );
}

export default Search2;
