const context = new window.AudioContext();

// Code from https://css-tricks.com/form-validation-web-audio/
export const playFile = (filepath) => {
  // see https://jakearchibald.com/2016/sounds-fun/
  // Fetch the file
  fetch(filepath)
    // Read it into memory as an arrayBuffer
    .then((response) => response.arrayBuffer())
    // Turn it from mp3/aac/whatever into raw audio data
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      // Now we're ready to play!
      const soundSource = context.createBufferSource();
      soundSource.buffer = audioBuffer;
      soundSource.connect(context.destination);
      soundSource.start();
    });
};
