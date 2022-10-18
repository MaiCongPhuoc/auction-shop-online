import AccountService from '../services/AccountService';

let initState = {
    account: [
        {
            id: 0,
            fullname: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            repassword: '',
            blocked: 0,
            avatar: 'https://freepngimg.com/thumb/youtube/62644-profile-account-google-icons-computer-user-iconfinder.png',
            role: {
                id: 0,
            },
            locationregion: {
                id: 0,
                provinceId: 0,
                provinceName: '',
                districtId: 0,
                districtName: '',
                wardId: 0,
                wardName: '',
                address: '',
            },
        },
    ],
};

const rootReducer = (state = initState, action) => {
    console.log('state: ', state, 'action: ', action);
    switch (action.type) {
        case 'products/addproduct':
            return {
                ...state,
            };
        case 'accounts/addaccounts':
            try {
                async function addacount() {
                    let addAccount = await AccountService.getAddAccount(action.payload);
                    console.log('addAccount.data: ', addAccount.data);
                }
                addacount();
            } catch (error) {
                console.log(error);
            }
            return {
                ...action.payload,
            };
        case 'accounts/editaccounts':
            try {
                async function editAcount() {
                    let addAccount = await AccountService.getEditAccount(action.payload, action.id);
                    console.log('addAccount.data: ', addAccount.data);
                }
                editAcount();
            } catch (error) {
                console.log(error);
            }
            return {
                ...action.payload,
            };
        case 'accounts/deleteaccounts':
            try {
                async function daleteAcount() {
                    await AccountService.getDeleteAccount(action.payload);
                }
                daleteAcount();
            } catch (error) {
                console.log(error);
            }
            return {
                ...action.payload,
            };
        default:
            try {
                async function getAccounts() {
                    let account = await AccountService.getAccount();
                    // console.log('account redux: ', account.data);
                    return [...account.data];
                }
                getAccounts();
            } catch (error) {
                console.log(error);
            }
    }
};
export default rootReducer;
