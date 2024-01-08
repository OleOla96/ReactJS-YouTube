import numeral from 'numeral';

function SubscriberCount({ value }) {
  let formatted = numeral(value).format('0.00a').toUpperCase();
  if (formatted.includes('.00')) {
    formatted = formatted.replace('.00', '');
  }
  return (
    <>
      {formatted} subcriber{value > 1 && 's'}
    </>
  );
}

export default SubscriberCount;
