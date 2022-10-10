import React, { useState, useEffect } from "react";

const ContentTheShop = () => {
    


    return (
        <div className="lot-cards grid-x grid-margin-x">
            
            <a className="card small-12 medium-6 cell" href="#" style={{ transform: 'none' }}>
                <figure className="card__image"><img src="https://congngheviet.com/wp-content/uploads/2019/09/Apple_iphone_11-family-lineup-091019.jpg" alt="" style={{ transform: 'none' }} />
                    <div className="add-to-watchlist">
                        <span className="ico-circle" ico_action="fav">
                            <i className="fa-regular fa-heart"></i>
                        </span>
                    </div>
                </figure>
                <div className="card__info-container">
                    <div className="info-container__label">
                        <span className="ico-circle c-bin">
                            <i className="fas fa-tag"></i>
                        </span>
                        <span className="label__main"> Cửa hàng </span>

                    </div>
                    <h3 className="card__title">
                        <span>Iphone 10</span>
                    </h3>
                    <div className="card__stats-group">
                        <div className="stats-group__stat">
                            <b>Số lượng còn lại:</b> 1
                        </div>
                        <div className="stats-group__stat">
                            <b>Giá sản phẩm:</b>
                            <div className="stat__price ItemCard-module__binPriceCentered___3hyVZ">$3,400
                            </div>
                        </div>
                        <div className="ItemCard-module__marketPrice___3E7JK">
                            <b>Đã bán: </b>
                            <span className="ItemCard-module__lineThrough___3xq25">100
                            </span>
                        </div>
                    </div>
                    <div className="card__tertiary-container">
                        <span className="tertiary-container__optional-group" />
                    </div>
                </div>
            </a>
        </div>
    );
}

export default ContentTheShop;