import { app, shell, BrowserWindow, ipcMain, session } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import request from '../renderer/src/utils/http';
import { LOGIN_WINDOW, MAIN_WINDOW, MY_WINDOW, WeCQUPT_Window } from './types';
// 维护window栈
let windowStack: WeCQUPT_Window[] = [];
function pushWindow(name, win) {
    windowStack.push({
        windowName: name,
        window: win
    });
}
function findWindow(winName) {
    return windowStack.find((win) => win.windowName === winName);
}

function popWindow(name) {
    windowStack = windowStack.filter((window) => window.windowName !== name);
}

function createWindow(windowName) {
    console.log('开创窗口', windowName);
    switch (windowName) {
        case LOGIN_WINDOW:
            createLoginWindow();
            break;
        case MAIN_WINDOW:
            createMainWindow();
            break;
        case MY_WINDOW:
            createMyWindow();
        default:
            break;
    }
}

function createMyWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 700,
        show: false,
        minHeight: 500,
        minWidth: 600,
        frame: false,
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
        pushWindow(MY_WINDOW, win);
        win.show();
    });
    win.on('closed', () => {
        popWindow(MY_WINDOW);
    });
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        win.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/my');
    } else {
        win.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/my' });
    }
}

// 这个要做尺寸的缓存
function createMainWindow(): void {
    const win = new BrowserWindow({
        width: 600,
        height: 700,
        show: false,
        minHeight: 500,
        minWidth: 600,
        frame: false,
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
        win.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/timeTable');
    } else {
        win.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/timeTable' });
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
        frame: false,
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
        loginWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/login');
    } else {
        loginWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'login' });
    }
}

function destoryWindow(windowName): void {
    const win = windowStack.find((window) => window.windowName === windowName);
    // console.log(win);
    if (win) {
        win.window.destroy();
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
    // 这里增加对请求头的劫持
    // session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    //     details.requestHeaders['Referer'] =
    //         'https://servicewechat.com/wx8227f55dc4490f45/devtools/page-frame.html';
    //     callback({ cancel: false, requestHeaders: details.requestHeaders });
    // });
    // 这里增加对响应头的劫持
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        let newHeaders = details.responseHeaders;
        let setCookie = details.responseHeaders['set-cookie'];
        if (setCookie) {
            setCookie = setCookie.map((cookie) => {
                cookie = cookie.replace('SameSite', 'SameSite=None');
                cookie = cookie.replace('HttpOnly;', '');
                cookie = cookie.replace('domain=we.cqupt.edu.cn; path=/;', '');
                return cookie;
            });
            // setCookie = setCookie.replace('SameSite', 'SameSite=None');
            // setCookie = setCookie.replace('HttpOnly;', '');
            // setCookie = setCookie.replace('domain=we.cqupt.edu.cn; path=/;', '');
            newHeaders = {
                ...details.responseHeaders,
                'set-cookie': setCookie
            };
        }
        callback({ cancel: false, responseHeaders: newHeaders });
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

// 将渲染进程发送来到函数和形参转发给所有窗口
ipcMain.on('notify-all-window-update-state-from-renderer-process', (_, funcName, args) => {
    windowStack.forEach((win) => {
        win &&
            win.window.webContents.send(
                'notify-all-window-update-state-from-main-process',
                funcName,
                args
            );
    });
});

ipcMain.on('minimize', () => BrowserWindow.getFocusedWindow().minimize());
ipcMain.on('maximize', () => {
    if (BrowserWindow.getFocusedWindow().isMaximized()) {
        BrowserWindow.getFocusedWindow().restore();
    } else {
        BrowserWindow.getFocusedWindow().maximize();
    }
});
//只剩一个页面了会退出app
ipcMain.on('closeWindow', () => BrowserWindow.getFocusedWindow().close());
// 监听新窗口的创建，通知其他窗口有新窗口创建
ipcMain.on('notify-all-window-new-window-created', (_, createdWindowName: string) => {
    const window = findWindow(createdWindowName);
    if (window) {
        windowStack.forEach((win) => {
            // 通知其他窗口新窗口创建
            win &&
                win.windowName !== createdWindowName &&
                win.window.webContents.send('new-window-created', createdWindowName);
        });
    }
});
// 监听来自窗口转发给新创建窗口的zustand的状态信息，实现转发给新创建的窗口
ipcMain.on(
    'renderer-send-main-to-send-updated-state-to-new-created-window',
    (_, createdWindowName, jsonStore) => {
        const win = findWindow(createdWindowName);
        win?.window.webContents.send('main-send-updated-state-to-new-created-window', jsonStore);
    }
);
