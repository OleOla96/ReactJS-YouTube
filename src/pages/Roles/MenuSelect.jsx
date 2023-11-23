import Tippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import style from './menuSelect.module.scss';
import { useState, useEffect, useRef, memo } from 'react';

const cb = className.bind(style);

function MenuSelect({
  list = [
    { id: 2, role: 'user_premium' },
    { id: 3, role: 'moderator' },
    { id: 4, role: 'admin' },
  ],
  data,
  setData,
  index,
}) {
  console.log('in');
  const isFirstRender = useRef(true);
  const [checked, setChecked] = useState(() => {
    const result = [];
    const find = list.filter((item) => data[index].roles[0].name.includes(item.role));
    find.forEach((item) => {
      result.push(item.role);
    });
    return result;
  });

  const handleCheck = (role) => {
    setChecked((pre) => {
      const isChecked = pre.includes(role);
      if (isChecked) {
        return [...pre.filter((item) => item !== role)];
      } else {
        return [...pre, role];
      }
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setData(() => {
        if (data.length > 0) {
          const value = 'user' + (checked.length > 0 ? ', ' : '') + checked.join(', ');
          const update = [...data];
          update[index] = {
            ...update[index],
            roles: [{ ...update[index].roles[0], name: value }],
          };
          return update;
        }
      });
    }
    // eslint-disable-next-line
  }, [checked]);

  const renderItems = () => {
    return list.map((item) => (
      <div key={item.id} className={cb('menu-item')}>
        <input
          id={item.role}
          checked={checked.includes(item.role)}
          onChange={() => handleCheck(item.role)}
          type="checkbox"
        />
        <label htmlFor={item.role} className="btn mb-0">
          {item.role}
        </label>
      </div>
    ));
  };

  const renderResult = (attrs) => (
    <div className={cb('menu-list')} tabIndex="-1" {...attrs}>
      <div className={cb('menu-body')}>{renderItems()}</div>
    </div>
  );

  return (
    <div style={{ display: 'inline-block' }} className="dropdown">
      <Tippy
        interactive
        delay={[0, 300]}
        offset={[-14, 8]}
        trigger="click"
        placement="right-start"
        render={renderResult}
      >
        <button style={{ boxShadow: 'none' }} className="btn-edit btn size-icon">
          <i className="fa fa-edit" />
        </button>
      </Tippy>
    </div>
  );
}

export default memo(MenuSelect);
