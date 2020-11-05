// Modules to control application life and create native browser window
const { app: electronApp, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })

  // and load the index.html of the electronApp.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  return mainWindow;
}

let getRequestIndex = 0;
const getResponseRegistry = {};

// used for responding to GET requests.
ipcMain.on('renderer-callback', (event, arg) => {
  const res = getResponseRegistry[arg.getRequestIndex];
  res.json({ value: arg.value });
  delete getResponseRegistry[arg.getRequestIndex];
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electronApp.whenReady().then(() => {
  const mainWindow = createWindow();
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  const port = 4000

  app.post('/audio/:radioName/:action', (req, res) => {
    mainWindow.webContents.send('audio/:radioName/:action', { params: req.params, body: req.body });
    res.sendStatus(200);
  });
  app.get('/audio/:radioName/:property', (req, res) => {
    getRequestIndex++;
    mainWindow.webContents.send('audio/:radioName/:property', { params: req.params, getRequestIndex });
    // store res so that we can respond to client once we get the async callback from renderer
    getResponseRegistry[getRequestIndex] = res;
  });

  app.listen(port, '0.0.0.0', () => console.log(`Example app listening at http://localhost:${port}`))

  electronApp.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electronApp.on('window-all-closed', function () {
  if (process.platform !== 'darwin') electronApp.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
