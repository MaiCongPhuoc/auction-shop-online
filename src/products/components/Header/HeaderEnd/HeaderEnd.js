const HeaderEnd = () => {
    return (
        <div className="main-nav-div">
            <ul className="navigation">
                <li className="left">
                    <a className="home" href="/product">
                        Trang chủ
                    </a>
                </li>
                <li className="left">
                    <a className="nav-explore drop-category" href="/product">
                        Cửa hàng<span className="watch-circle my-cb-circle my-cb-count hidden">0</span>
                    </a>
                </li>
                <li className="left">
                    <a className="btn-bin" href="/product">
                        Đấu giá
                    </a>
                </li>
                <li className="left">
                    <a className="contact" href="#">
                        Liên hệ
                    </a>
                </li>
                <li className="left">
                    <a className="contact" href="#">
                        Hợp tác cùng chúng tôi
                    </a>
                </li>
            </ul>
            <div className="charity-wrappper">
                <div className="depth-bg-wrapper">
                    <div className="close-charity-dropdown">
                        <i className="icon-remove" />
                    </div>
                    <input id="charities" placeholder="Search by all" type="text" />
                </div>
                <ul id="results" />
            </div>
        </div>
    );
};

export default HeaderEnd;
