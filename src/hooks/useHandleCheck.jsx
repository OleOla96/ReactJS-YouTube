import { useState, useEffect } from 'react';

const handleCheck = (id) => {
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    setChecked((pre) => {
      const isChecked = pre.includes(id);
      if (isChecked) {
        return [...pre.filter((item) => item !== id)];
      } else {
        return [...pre, id];
      }
    });
  }, []);
  return checked;
};

export const handleCheckAll = (data) => {
  if (checked.length === Object.keys(data).length) {
    setChecked([]);
  } else {
    if (checked.length > 0) {
      const ids = [];
      const filterContent = data.filter((item) => !checked.includes(item.id));
      filterContent.forEach((item) => ids.push(item.id));
      setChecked([...checked, ...ids]);
    } else {
      const ids = [];
      data.forEach((item) => ids.push(item.id));
      setChecked(ids);
    }
  }
};

export default handleCheck;
