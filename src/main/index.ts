import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import request from '../renderer/src/utils/http';
import { LOGIN_WINDOW, MAIN_WINDOW, WeCQUPT_Window } from './types';
// 维护window栈
const windowStack: WeCQUPT_Window[] = [];
function pushWindow(name, win) {
    windowStack.push({
        windowName: name,
        window: win
    });
}
function popWindow(name) {
    windowStack = windowStack.filter((window) => window.windowName === name);
}

function createWindow(windowName) {
    switch (windowName) {
        case LOGIN_WINDOW:
            createLoginWindow();
            break;
        case MAIN_WINDOW:
            createMainWindow();
            break;
        default:
            break;
    }
}

// 这个要做尺寸的缓存
function createMainWindow(): void {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        show: false,
        resizable: false,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            webSecurity: false
        }
    });
    win.on('ready-to-show', () => {
        pushWindow(MAIN_WINDOW, win);
        win.show();
    });
    win.on('ready-to-show', () => {
        pushWindow(MAIN_WINDOW, win);
        win.show();
    });

    win.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
    win.on('closed', () => {
        popWindow(MAIN_WINDOW);
    });
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        win.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/home');
    } else {
        win.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/home' });
    }
}

//
function createLoginWindow(): void {
    // Create the browser window.
    const loginWindow = new BrowserWindow({
        width: 500,
        height: 700,
        show: false,
        resizable: false,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            webSecurity: false
        }
    });

    loginWindow.on('ready-to-show', () => {
        pushWindow(LOGIN_WINDOW, loginWindow);
        loginWindow.show();
    });

    loginWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
    loginWindow.on('closed', () => {
        popWindow(LOGIN_WINDOW);
    });
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/login');
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'login' });
    }
}

function destoryWindow(windowName): void {
    const win = windowStack.find((window) => window.windowName === windowName);
    if (win) {
        win.destory();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    createWindow(LOGIN_WINDOW);

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 用来统一处理发送请求
ipcMain.handle('request', async (e, config) => {
    return await request(JSON.parse(config));
});

ipcMain.on('createWindow', (_, windowName) => createWindow(windowName));

ipcMain.on('destoryWindow', (_, windowName) => destoryWindow(windowName));
