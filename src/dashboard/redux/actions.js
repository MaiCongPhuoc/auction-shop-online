export const listAccount = (data) => {
    return {
        type: 'accounts/listAccount',
        payload: data,
    };
};
export const addAccount = (data) => {
    return {
        type: 'accounts/addaccounts',
        payload: data,
    };
};
export const editAccount = (data, id) => {
    return {
        type: 'accounts/editaccounts',
        payload: data,
        id: id,
    };
};
export const deleteAccount = (data) => {
    console.log('data: ', data);
    return {
        type: 'accounts/deleteaccounts',
        payload: data,
    };
};
