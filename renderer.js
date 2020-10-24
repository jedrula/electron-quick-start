// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron')

console.log('asdasd');
ipcRenderer.on("audio/:radioName/:action", (event, req) => {
  radios.findRadio(req.params.radioName)[req.params.action]();
});

const radios = {
  registry: [],
  findRadio(name) {
    return this.registry.find((radio) => radio.name === name);
  }
}

function createRadio(radioName, url) {
  const audio = new Audio(url);
  return {
    name: radioName,
    play() {
      if (audio.playing) {
        return false;
      }
      audio.play();
    },
    pause: () => audio.pause(),
  }
}

function registerRadio(radioName, url) {
  radios.registry.push(createRadio(radioName, url));
}

registerRadio('nowy-swiat', 'https://n11a-eu.rcs.revma.com/ypqt40u0x1zuv?rj-ttl=5&rj-tok=AAABc5-yp48AZYu5xqZHYSS6ig');

async function postRequest(url) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

window.radios = radios;