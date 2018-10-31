export const emailValidation = value => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(value) !== false;
};

export const phoneValidation = value => {
    if(value.indexOf('_') === -1) {
        return true;
    } else {
        return false;
    }
};
