import React, { useEffect, useRef } from 'react';
import { MediaRecorder } from 'recordrtc';
import Blob from 'blob-polyfill';


const Single = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const captured = document.createElement('img');

    var mediaRecorder;
    var recordedBlobs;

    window.onload = function () {
      var video = document.querySelector('video');
      var recordedVideo = document.querySelector('video#recorded');
      var canvasEl = document.getElementById('canvas');

      const constraints = window.constraints = {
        audio: false,
        video: true
      };

      function play_video_stream() {
        console.log(window.navigator.mediaDevices);
        window.navigator.mediaDevices.getUserMedia(constraints)
          .then(function (stream) {
            var videoTracks = stream.getVideoTracks();
            console.log('Got stream with constraints:', constraints);
            console.log('Using video device: ' + videoTracks[0].label);
            stream.onremovetrack = function () {
              console.log('Stream ended');
            };
            window.stream = stream; // make variable available to browser console
            video.srcObject = stream;
          })
          .catch(function (error) {
            if (error.name === 'ConstraintNotSatisfiedError') {
              display_log('The resolution ' + constraints.video.width.exact + 'x' +
                constraints.video.height.exact + ' px is not supported by your device.');
            } else if (error.name === 'PermissionDeniedError') {
              display_log('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
            }
            display_log('getUserMedia error: ' + error.name);
          });
      };

      function stop_video_stream() {
        display_log("[DISP] stop preview");
        var stream = video.srcObject;
        var tracks = stream.getTracks();
        console.log(tracks);

        tracks.forEach(function (track) {
          track.stop();
        });

        video.srcObject = null;
      }

      // button Elements
      const js_camera_play_btn = document.getElementById("js-camera-play-btn");
      const js_camera_stop_btn = document.getElementById("js-camera-stop-btn");
      const js_camera_takepicture_btn = document.getElementById("js-camera-takepicture-btn");
      const js_camera_rec_btn = document.getElementById("js-camera-rec-btn");
      const js_camera_play_reced_btn = document.getElementById("js-camera-play-reced-btn");
      const js_camera_stop_rec_btn = document.getElementById("js-camera-stop-rec-btn");

      // Add Eventlistener for the media capture and stream API
      js_camera_play_btn.addEventListener('click', function (e) {
        display_log("[DISP] start Camera!");
        play_video_stream();
        js_camera_stop_btn.removeAttribute("disabled");
        js_camera_takepicture_btn.removeAttribute("disabled");
        js_camera_rec_btn.removeAttribute("disabled");
      });

      js_camera_stop_btn.addEventListener('click', function (e) {
        display_log("[DISP] stop Camera!");
        stop_video_stream();
        js_camera_stop_btn.setAttribute("disabled", true);
        js_camera_takepicture_btn.setAttribute("disabled", true);
        js_camera_rec_btn.setAttribute("disabled", true);
        js_camera_play_reced_btn.setAttribute("disabled", true);
        js_camera_stop_rec_btn.setAttribute("disabled", true);
      });

      js_camera_takepicture_btn.addEventListener('click', function (e) {
        display_log("[DISP] Take a picture from Camera!");
        const context = canvasEl.getContext('2d');
        context.drawImage(video, 0, 0, 640, 480);
        captured.src = canvasEl.toDataURL('image/png');
        captured.width = 320;
        captured.height = 240;
      });

      js_camera_rec_btn.addEventListener('click', function (e) {
        display_log("[DISP] Start Recording!");
        recordedBlobs = [];
        // let options = {mimeType: 'video/webm;codecs=vp9'};
        // if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        //     console.error(`${options.mimeType} is not Supported`);
        //     display_log(`${options.mimeType} is not Supported`);
        //     options = {mimeType: 'video/webm;codecs=vp8'};
        //     if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        //         console.error(`${options.mimeType} is not Supported`);
        //         display_log(`${options.mimeType} is not Supported`);
        //         options = {mimeType: 'video/webm'};
        //         if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        //             console.error(`${options.mimeType} is not Supported`);
        //             display_log(`${options.mimeType} is not Supported`);
        //             options = {mimeType: ''};
        //         }
        //     }
        // }
        let options = { mimeType: 'video/webm' }

        mediaRecorder = new MediaRecorder(window.stream, options);
 

        console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
        mediaRecorder.onstop = (e) => {
          console.log('Recorder stopped: ', e);
          console.log('Recorded Blobs: ', recordedBlobs);
        };

        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(10); // collect 10ms of data
        console.log('MediaRecorder started');
        js_camera_stop_rec_btn.removeAttribute("disabled");
      });

      function handleDataAvailable(e) {
        if (e.data && e.data.size > 0) {
          recordedBlobs.push(e.data);
        }
      }

      js_camera_stop_rec_btn.addEventListener('click', function (e) {
        display_log("[DISP] Stop Recording!");
        mediaRecorder.stop();
        js_camera_play_reced_btn.removeAttribute("disabled");
      });

      js_camera_play_reced_btn.addEventListener('click', function (e) {
        display_log("[DISP] Play Recorded stream!");
        // const superBuffer = new Blob(recordedBlobs, {type: 'video/webm;codecs=vp9'});
        const superBuffer = new Blob(recordedBlobs, { type: 'video/webm' });
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        console.log(window.URL.createObjectURL(superBuffer))
        recordedVideo.src = window.URL.createObjectURL(superBuffer);
        recordedVideo.controls = true;

        recordedVideo.play();


      });

      // Print response message
      function display_log(msg) {
        let responseWindow = document.getElementById('response-window');
        responseWindow.innerHTML += msg + '</br>';
      }
    }
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

  // 화면
  return (
    <div>
      <h1> Single Mode: JooHyeong</h1>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default Single;