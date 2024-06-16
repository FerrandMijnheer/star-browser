const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const iconPath = path.join(__dirname, "images", "logos", "256.png")


app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    icon: iconPath,
    height: 600,
    webPreferences: {
      webviewTag: true
    }
  })

  mainWindow.loadFile('index.html')
})

app.on('window-all-closed', () => {
  app.quit()
})

