const initState = {
    account: {
        // id: 3,
        // username: 'MiloTran',
        // fullName: 'Trần Ngọc Trung',
        // phone: '0326841682',
        // email: 'milotran@gmail.com',
        // locationRegion: {
        //     id: 3,
        //     provinceId: '45',
        //     provinceName: 'Tỉnh Quảng Trị',
        //     districtId: '468',
        //     districtName: 'Huyện Cam Lộ',
        //     wardId: '19597',
        //     wardName: 'Thị trấn Cam Lộ',
        //     address: 'Voluptas fugit dolo',
        // },
    },
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
