const {
  app,
  BrowserWindow,
  ipcMain,
  MenuItem,
  Menu,
} = require("electron/main");
const { debug } = require("node:console");

const path = require("node:path");
const iconPath = path.join(__dirname, "images", "logos", "256.png");

function createWindow(
  loadDefaultFile = true,
  options = null,
  browserURL = null
) {
  let mainWindow = null;
  if (options == null) {
    mainWindow = new BrowserWindow({
      width: 1080,
      icon: iconPath,
      height: 720,
      webPreferences: {
        webviewTag: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });
  } else {
    mainWindow = new BrowserWindow(options);
  }

  if (loadDefaultFile != false && browserURL != null) {
    mainWindow.loadFile("index.html").then(() => {
      mainWindow.webContents.send("setWindowURL", browserURL);
    });
  } else if (loadDefaultFile != false) mainWindow.loadFile("index.html");

  return mainWindow;
}

ipcMain.on("newWindow", () => {
  createWindow();
});

ipcMain.on("newWindowURL", (event, url) => {
  createWindow(true, null, url);
});

app.on("web-contents-created", (e, wc) => {
  // wc: webContents of <webview> is now under control
  wc.setWindowOpenHandler((details) => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: true,
      outlivesOpener: true,
      createWindow: () => {
        const win = createWindow(true, null, details.url);
        return win.webContents;
      },
    };
  });
});

//app start & close
app.on("window-all-closed", () => {
  app.quit();
});

app.whenReady().then(() => {
  const win = createWindow();
});
