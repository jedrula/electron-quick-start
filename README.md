# idea
Plug in a Raspberry PI into home audio system. Use the PI to strea music from internet into the audio system. Allow remote control of the Pi so that you can relax on your couche while listening to your favourite internet music.

# 2 index.html confusion
There is index.html for the electron app and also for the remote app.
The remote app is just the UI that can be hosted wherever (say surge) that make it possible to send api requests to the electorn app using your phone or PC.
In the "remote mode" electron is just a backend that listens for requests to play the radio and starts audio track.
In the future 2 index.html files will likely by unified into one. This might require html components or some lib like Vue.

# development
- npm run start
- make changes and refresh with cmd+r or/and restart your electron by ctrl+x -> npm run start

# deployment with "remote mode"
- ssh into pi or connect using keyboard
- npm run deploy
- go to electron-audio.surge.sh on a device connected to the same wifi as your PI

# electron-quick-start

Based on [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.
