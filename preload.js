const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("windowAPI", {
  newWindow: () => ipcRenderer.send("newWindow"),
  newWindowURL: (url) => ipcRenderer.send("newWindowURL", url),
  setWindowURL: (callback) => ipcRenderer.on('setWindowURL', (_event, url) => callback(url)),
});
