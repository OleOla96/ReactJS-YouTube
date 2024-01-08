import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './watch.scss';

const cb = classNames.bind(styles);

function VideoPlayer({ src, setWatched }) {
  const videoRef = useRef();

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video.duration > 30 && video.currentTime > video.duration / 3) {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      setWatched(true);
    } else if (video.duration <= 30 && video.currentTime > video.duration / 2) {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      setWatched(true);
    }
  };

  return (
    <video
      ref={videoRef}
      className={cb('screenVideo')}
      onPlay={() => videoRef.current.addEventListener('timeupdate', handleTimeUpdate)}
      controls
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
