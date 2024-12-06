import { BrowserWindow } from 'electron';

export interface WeCQUPT_Window {
    windowName: string;
    window: BrowserWindow;
}

export const LOGIN_WINDOW = 'LOGIN_WINDOW';
export const MAIN_WINDOW = 'MAIN_WINDOW';
export const SETTING_WINDOW = 'SETTING_WINDOW';
export const MY_WINDOW = 'MY_WINDOW';
