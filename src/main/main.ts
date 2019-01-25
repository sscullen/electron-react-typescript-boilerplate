import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browswer window
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  // and load the index.html of the app
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Open the Dev Tools
  // mainWindow.webContents.openDevTools();
  // mainWindow.loadURL('chrome://gpu');

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    // Dereference the window obj, usually you would store windows in an array
    // if your app supports multi windows, this is the time when you should
    // delete the corresponding element
    mainWindow = null;
  });
}

const menu = Menu.buildFromTemplate([
  {
      label: 'Menu',
      // Other code removed for brevity
      submenu: [
        {
          label:'Exit',
          click() {
            app.quit()
          }
        },
      ]
  },
  {
      label: 'Developer',
      submenu: [
        {
          label:'Reload App',
          click() {
            mainWindow.webContents.reload()
          }
        },
        {
          label:'Hard Reload App',
          click() {
            mainWindow.webContents.reloadIgnoringCache()
          }
        },
        {
            label:'Show/Hide Dev Tools',
            click() {
              mainWindow.webContents.toggleDevTools()
            }
        }
      ]
  },
])

Menu.setApplicationMenu(menu);

// app.disableHardwareAcceleration()
// app.disableDomainBlockingFor3DAPIs()

// This method will be called when Electron has finished initialization
// and is ready to create browswer windows.
// Some APIs can only be used after this event occurs
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // on os x it is common for applications and their menu bar to stay active
  // until the user quits explicitly with CMD + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on os x it is common to re-create a window in the app when the dock icon
  // is clicked and there are no other windows open
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your apps specific main process code
// You can alos put them in separate files and require them here.