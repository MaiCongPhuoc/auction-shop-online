import React, { useState, useEffect } from "react";
import ProductService from './../../../service/Product/ProductService';
import { useStore, actions } from './../../context/store';
import Product from './../../../Product';

const ContentAll = () => {


    const [state, dispatch] = useStore();

    useEffect(() => {
        try {
            // setState({ ...state, loading: true });
            async function getData() {
                let productsRes = await ProductService.getAllProducts();

                dispatch(actions.setProducts(productsRes.data));
                // setState({
                //     ...state,
                //     products: productsRes.data,
                //     loading: false
                // })
            }
            getData();
        } catch (error) {
            // setState({
            //     ...state,
            //     loading: false,
            //     errorMessage: error.message
            // });
        }
    }, []);

    let products = state.products;

    return (
        <div className="lot-cards grid-x grid-margin-x">
            {
                products.map(product => (
                    <a key={product.id} className="card small-12 medium-6 cell" href="#" style={{ transform: 'none' }}>
                        {product.action ? (
                            <>
                                <figure className="card__image">
                                    <img src={product.image} alt="" style={{ transform: 'none' }} />
                                    <div className="add-to-watchlist">
                                        <span className="ico-circle" ico_action="fav">
                                            <i className="fa-regular fa-heart"></i>
                                        </span>
                                    </div>
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
                                        <span>Iphone </span>
                                    </h3>
                                    <div className="card__meta-group" />
                                    <div className="card__stats-group">
                                        <div className="stats-group__stat"><b>Số lượng đang tham gia:</b> 5</div>
                                        <div className="stats-group__stat"><b>Theo dõi:</b> 34</div>
                                        <div className="stats-group__stat"><b>Giá ước tính:</b> $15,000</div>
                                        <div className="stats-group__stat">
                                            <b>Giá khởi điểm:</b>
                                            <div className="stat__price">$2,500</div>
                                        </div>
                                    </div>
                                    <div className="card__tertiary-container">
                                        <span className="tertiary-container__optional-group" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <figure className="card__image">
                                    <img src={product.image} alt="" style={{ transform: 'none' }} />
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
                            </>
                        )}
                    </a>
                ))
            }
        </div>
    );
}

export default ContentAll;