import React, { useEffect, useRef } from 'react';

const Single = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    // 비디오 소스 설정
    const videoSource = null; // 비디오 소스 설정
    if (videoSource) {
      videoElement.src = videoSource;
    } else {
      window.navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;

          // 비디오 프레임 처리 및 렌더링
          const processFrame = () => {
            // 프레임 전처리 및 이미지 처리 로직

            // 화면에 프레임 렌더링
            requestAnimationFrame(processFrame);
          };

          const requestAnimationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame;

          videoElement.addEventListener('loadeddata', () => {
            processFrame();
          });
        })
        .catch((error) => {
          console.log('Failed to access webcam:', error);
        });
    }

    return () => {
      videoElement.srcObject = null;
    };
  }, []);

  return (
    <div>
      <h1> Single Mode: JooHyeong</h1>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default Single;
