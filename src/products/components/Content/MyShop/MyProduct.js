import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { FormatMoney } from "../../../Hooks/Hooks";
import { useSelector } from "react-redux";
import { getOpenSidebar } from "../../../redux/selector";
import LoadCart from "../../Loading/LoadCart";

function MyProduct({ products, loading }) {
    const openSidebar = useSelector(getOpenSidebar);
    console.log("openSidebar", openSidebar);

    useEffect(() => {
        if (openSidebar) {
            document.querySelector('.moderation-list').style.marginLeft = '300px';
            document.querySelector('.non-moderation-list').style.marginLeft = '300px';
            document.querySelector('.moderation-item').style.marginLeft = '300px';
            document.querySelector('.non-moderation-item').style.marginLeft = '300px';
        }
        else {
            document.querySelector('.moderation-list').style.marginLeft = '80px';
            document.querySelector('.non-moderation-list').style.marginLeft = '80px';
            document.querySelector('.moderation-item').style.marginLeft = '80px';
            document.querySelector('.non-moderation-item').style.marginLeft = '80px';
        }
    }, [openSidebar]);

    const moderationList = (products) => {
        return products.filter((product) => {
            return product.moderation === true;
        });
    };
    const nonModerationList = (products) => {
        return products.filter((product) => {
            return product.moderation === false;
        });
    };

    let moderatedList = moderationList(products);
    let nonModeratedList = nonModerationList(products);

    return (
        <>
            {loading ? (
                <LoadCart />
            ) : (
                <>
                    <div className="moderation-list">
                        <h2>Đã kiểm duyệt &gt;&gt;</h2>
                    </div>
                    <div className="moderation-item lot-cards grid-x mt-3">
                        {moderatedList.map(product => (
                            <div key={product.id} className="card small-12 medium-6 cell" style={{ transform: 'none' }}
                            // onClick={() => handleShowInfoProduct(product)}
                            >
                                {
                                    product.action ? (
                                        <Link to={`/auction/${product.id}`} style={{ color: '#333' }}>
                                            <figure className="card__image">
                                                <img src={product.image} alt="" style={{ transform: 'none' }} />
                                            </figure>
                                            <div className="card__info-container">
                                                <div className="info-container__label">
                                                    <span className="ico-circle c-bid">
                                                        {/* <i class="fa-solid fa-tag"></i> */}
                                                        <i className="fas fa-gavel"></i>
                                                    </span>
                                                    <span className="label__main"> Đấu giá </span>
                                                </div>
                                                <h3 className="card__title">
                                                    <span>{product.title}</span>
                                                </h3>
                                                <div className="card__meta-group" />
                                                <div className="card__stats-group">
                                                    <div className="stats-group__stat">
                                                        <b>Đang tham gia:</b> 5
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Theo dõi:</b> 34
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Giá ước tính:</b> {FormatMoney(product.estimatePrice)} ₫
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Giá khởi điểm:</b>
                                                        <div className="stat__price">{FormatMoney(product.price)} ₫</div>
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Giá hiện tại:</b>
                                                        <div className="stat__price">{FormatMoney(product.price)} ₫</div>
                                                    </div>
                                                </div>
                                                <div className="card__tertiary-container">
                                                    <span className="tertiary-container__optional-group" />
                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link to={`/product/the-shop/${product.slug}`} style={{ color: '#333' }}>
                                            <figure className="card__image">
                                                <img src={product.image} alt="" style={{ transform: 'none' }} />
                                            </figure>
                                            <div className="card__info-container">
                                                <div className="info-container__label">
                                                    <span className="ico-circle c-bin">
                                                        <i className="fas fa-tag"></i>
                                                    </span>
                                                    <span className="label__main"> Cửa hàng </span>
                                                </div>
                                                <h3 className="card__title">
                                                    <span>{product.title}</span>
                                                </h3>
                                                <div className="card__stats-group">
                                                    <div className="stats-group__stat">
                                                        <b>Số lượng còn lại:</b> {product.available}
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Giá sản phẩm:</b>
                                                        <div className="stat__price ItemCard-module__binPriceCentered___3hyVZ">
                                                            {FormatMoney(product.price)} ₫
                                                        </div>
                                                    </div>
                                                    <div className="ItemCard-module__marketPrice___3E7JK">
                                                        <b>Đã bán: </b>
                                                        <span className="ItemCard-module__lineThrough___3xq25">{product.sold}</span>
                                                    </div>
                                                </div>
                                                <div className="card__tertiary-container">
                                                    <span className="tertiary-container__optional-group" />
                                                </div>
                                            </div>
                                        </Link>
                                    )}

                            </div>
                        ))}
                    </div>
                    <div className="non-moderation-list" style={{ marginTop: '50px' }}>
                        <h2>Đang chờ kiểm duyệt &gt;&gt;</h2>
                    </div>
                    <div className="non-moderation-item lot-cards grid-x mt-3">
                        {nonModeratedList.map(product => (
                            <div key={product.id} className="card small-12 medium-6 cell" style={{ transform: 'none' }}
                            // onClick={() => handleShowInfoProduct(product)}
                            >
                                {
                                    product.action ? (
                                        <Link to={`/auction/${product.id}`} style={{ color: '#333' }}>
                                            <figure className="card__image">
                                                <img src={product.image} alt="" style={{ transform: 'none' }} />
                                            </figure>
                                            <div className="card__info-container">
                                                <div className="info-container__label">
                                                    <span className="ico-circle c-bid">
                                                        {/* <i class="fa-solid fa-tag"></i> */}
                                                        <i className="fas fa-gavel"></i>
                                                    </span>
                                                    <span className="label__main"> Đấu giá </span>
                                                </div>
                                                <h3 className="card__title">
                                                    <span>{product.title}</span>
                                                </h3>
                                                <div className="card__meta-group" />
                                                <div className="card__stats-group">
                                                    <div className="stats-group__stat">
                                                        <b>Đang tham gia:</b> 5
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Theo dõi:</b> 34
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Giá ước tính:</b> {FormatMoney(product.estimatePrice)} ₫
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Giá khởi điểm:</b>
                                                        <div className="stat__price">{FormatMoney(product.price)} ₫</div>
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Giá hiện tại:</b>
                                                        <div className="stat__price">{FormatMoney(product.price)} ₫</div>
                                                    </div>
                                                </div>
                                                <div className="card__tertiary-container">
                                                    <span className="tertiary-container__optional-group" />
                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link to={`/product/the-shop/${product.slug}`} style={{ color: '#333' }}>
                                            <figure className="card__image">
                                                <img src={product.image} alt="" style={{ transform: 'none' }} />
                                            </figure>
                                            <div className="card__info-container">
                                                <div className="info-container__label">
                                                    <span className="ico-circle c-bin">
                                                        <i className="fas fa-tag"></i>
                                                    </span>
                                                    <span className="label__main"> Cửa hàng </span>
                                                </div>
                                                <h3 className="card__title">
                                                    <span>{product.title}</span>
                                                </h3>
                                                <div className="card__stats-group">
                                                    <div className="stats-group__stat">
                                                        <b>Số lượng còn lại:</b> {product.available}
                                                    </div>
                                                    <div className="stats-group__stat">
                                                        <b>Giá sản phẩm:</b>
                                                        <div className="stat__price ItemCard-module__binPriceCentered___3hyVZ">
                                                            {FormatMoney(product.price)} ₫
                                                        </div>
                                                    </div>
                                                    <div className="ItemCard-module__marketPrice___3E7JK">
                                                        <b>Đã bán: </b>
                                                        <span className="ItemCard-module__lineThrough___3xq25">{product.sold}</span>
                                                    </div>
                                                </div>
                                                <div className="card__tertiary-container">
                                                    <span className="tertiary-container__optional-group" />
                                                </div>
                                            </div>
                                        </Link>
                                    )}

                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default MyProduct;