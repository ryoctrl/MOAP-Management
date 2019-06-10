/* eslint-disable no-unused-expressions */

const API_HOST = process.env.REACT_APP_API_HOST;
const menuEP = API_HOST + 'api/menues';

export function allMenus() {
    return fetch(menuEP)
        .then(res => res.json())
        .then(menus => ({menus}))
        .catch(error => ({error}));
}

/* eslint-disable no-unused-expressions */

