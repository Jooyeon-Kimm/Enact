const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/capture', (req, res) => {
  exec('fswebcam -r 1280x720 --jpeg 85 -D 1 capture.jpg', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error capturing image: ${error}`);
      res.status(500).send('Error capturing image');
    } else {
      console.log('Image captured successfully');
      res.send('Image captured');
      io.emit('imageUpdated', getImageData());
    }
  });
});

function getImageData() {
  const imageData = fs.readFileSync('capture.jpg', 'base64');
  return imageData;
}

io.on('connection', (socket) => {
  console.log('A client connected');
  socket.emit('imageUpdated', getImageData());
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
