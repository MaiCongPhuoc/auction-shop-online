import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getLoadData, getProductsAction } from "../../../redux/selector";
import { setLoadData, setShowInfoProduct } from "../../../redux/actions";
import LoadData from './../../Loading/LoadData';
import { FormatMoney } from './../../../Hooks/Hooks';
import { setProduct } from './../../../redux/actions';

const ContentTheShop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            dispatch(setLoadData(false));

        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleShowInfoProduct = (product) => {
        dispatch(setShowInfoProduct(true));
        dispatch(setProduct(product));
    };

    const productsAuction = useSelector(getProductsAction);

    // dispatch(setLoadData(false));

    const loadData = useSelector(getLoadData);


    return (
        <div className="lot-cards grid-x grid-margin-x">
            {loadData ? <LoadData /> :
                productsAuction.map(product => (
                    <a className="card small-12 medium-6 cell" onClick={() => handleShowInfoProduct(product)} style={{ transform: 'none' }} key={product.id}>
                        <figure className="card__image"><img src={product.image} alt="" style={{ transform: 'none' }} />
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
                                <span>{product.title}</span>
                            </h3>
                            <div className="card__stats-group">
                                <div className="stats-group__stat">
                                    <b>Số lượng còn lại:</b> 1
                                </div>
                                <div className="stats-group__stat">
                                    <b>Giá sản phẩm (VNĐ):</b>
                                    <div className="stat__price ItemCard-module__binPriceCentered___3hyVZ">
                                        {FormatMoney(product.price)}
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

                ))}


        </div>
    );
}

export default ContentTheShop;