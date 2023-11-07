// Trong file React.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const Image = () => {
  const [image, setImage] = useState('');
  console.log(image);

  useEffect(() => {
    axios
      .get('http://localhost:8087/images/avatar/1699331864531_IMG_20220926_141516.jpg', { responseType: 'arraybuffer' })
      .then((response) => {
        console.log(response.data);
        let blob = new Blob([response.data], { type: 'image/jpeg' });
        let imageSrc = URL.createObjectURL(blob);
        setImage(imageSrc);
      })
      .catch((error) => {
        console.error('Lỗi khi tải hình ảnh:', error);
      });
  }, []);

  return (
    <div>
      <h1>Hình ảnh từ Node.js</h1>
      <img src={image} alt="Hình ảnh" />
    </div>
  );
};

export default Image;
