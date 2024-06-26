const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  newWindow: () => ipcRenderer.send("open-new-window"),
});
