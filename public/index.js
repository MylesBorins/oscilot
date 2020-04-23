const socket = globalThis.socket = io();

const sliderOne = document.getElementById('slider-one');

sliderOne.oninput = function(e) {
  const {value} = sliderOne;
  socket.emit('message', {
    address: '/slider-one',
    value
  });
};
