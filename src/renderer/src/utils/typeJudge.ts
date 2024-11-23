function getType(obj: any): any {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

export function isType(obj: any, type: string) {
    return getType(obj) === type;
}

export const isMap = (obj) => isType(obj, 'Map');
export const isSet = (obj) => isType(obj, 'Set');
export const isDate = (obj) => isType(obj, 'Date');
export const isRegExp = (obj) => isType(obj, 'RegExp');
export const isArray = (obj) => isType(obj, 'Array');
export const isObject = (obj) => isType(obj, 'Object') || !isNull(obj);
export const isNull = (obj) => isType(obj, 'Null');
export const isFormData = (obj) => isType(obj, 'FormData');
