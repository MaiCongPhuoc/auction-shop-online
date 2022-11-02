const initState = {
    account: {
        id: 36,
        username: 'Milotran',
        fullName: 'Trần Ngọc Trung',
        phone: '0326841682',
        email: 'milotran1496@gmail.com',
        locationRegion: {
            id: 64,
            provinceId: '45',
            provinceName: 'Tỉnh Quảng Trị',
            districtId: '468',
            districtName: 'Huyện Cam Lộ',
            wardId: '19597',
            wardName: 'Thị trấn Cam Lộ',
            address: 'Quang binh',
        },
    },
    // account: {
    //     id: 40,
    //     username: 'maiphuoc',
    //     fullName: 'Mai Công Phước',
    //     phone: '0778224495',
    //     email: 'maiphuoc244@gmail.com',
    //     locationRegion: {
    //         id: 71,
    //         provinceId: '46',
    //         provinceName: 'Tỉnh Thừa Thiên Huế',
    //         districtId: '474',
    //         districtName: 'Thành phố Huế',
    //         wardId: '19774',
    //         wardName: 'Phường Kim Long',
    //         address: '18 Phạm Thị liên',
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
