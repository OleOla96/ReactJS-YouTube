import Moment from 'react-moment';

function TimeFromNow({ timestamp }) {
  return <Moment fromNow>{timestamp}</Moment>;
}

export default TimeFromNow;
