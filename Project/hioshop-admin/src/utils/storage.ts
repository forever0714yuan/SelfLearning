type Info = object | string | number

export const getStorage = (name: string) => {
    if (!name) return;
    return localStorage.getItem(name)
}

export const setStorage = (name: string, info: Info) => {
    if (!name) return;
    if (typeof info !== 'string') {
        info = JSON.stringify(info)
    }
    localStorage.setItem(name, info);
}

export const removeStorage = (name: string) => {
    if (!name) return;

    localStorage.removeItem(name)
}