const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const iconPath = path.join(__dirname, "images", "logos", "256.png")


app.whenReady().then(() => {
  createWindow();
});

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1080,
    icon: iconPath,
    height: 720,
    webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}

ipcMain.on("open-new-window", () => {
  createWindow();
})

app.on('window-all-closed', () => {
  app.quit()
});