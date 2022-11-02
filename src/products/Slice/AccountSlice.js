const initState = {
    // account: {
    //     id: 36,
    //     username: 'Milotran',
    //     fullName: 'Trần Ngọc Trung',
    //     phone: '0326841682',
    //     email: 'milotran1496@gmail.com',
    //     locationRegion: {
    //         id: 64,
    //         provinceId: '45',
    //         provinceName: 'Tỉnh Quảng Trị',
    //         districtId: '468',
    //         districtName: 'Huyện Cam Lộ',
    //         wardId: '19597',
    //         wardName: 'Thị trấn Cam Lộ',
    //         address: 'Quang binh',
    //     },
    // },
};

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case 'account/setAccount':
            return {
                ...state,
                account: action.payload,
            };

        default:
            return state;
    }
};

export default accountReducer;
