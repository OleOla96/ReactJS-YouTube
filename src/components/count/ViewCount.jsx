import numeral from 'numeral';

function ViewCount({ views }) {
  const formattedViews = numeral(views).format('0.a').toUpperCase();

  return (
    <>
      {formattedViews} view{views > 1 && 's'}
    </>
  );
}

export default ViewCount;
