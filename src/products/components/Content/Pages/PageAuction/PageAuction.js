import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getProductsAction, getLoadData } from '../../../../redux/selector';
import { setLoadData } from '../../../../redux/actions';
import LoadData from './../../../Loading/LoadData';
import { FormatMoney } from './../../../../Hooks/Hooks';
import { Link } from 'react-router-dom';
import ProductService from './../../../../service/Product/ProductService';

const PageAuction = () => {
    const [productsAuction, setProductsAuction] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            async function getAuctionProducts() {
                let dataRes = await ProductService.getAllProductAuctions();
                setProductsAuction(dataRes.data);
                setLoading(false);
            }
            getAuctionProducts();
        } catch (error) {
            console.log(error);
        }
    }, []);


    
    // const productsAuction = useSelector(getProductsAction);


    return (
        <div className="lot-cards grid-x grid-margin-x" style={{marginTop: '150px'}}>
            {loading ? (
                <LoadData />
            ) : (
                productsAuction.map((product) => (
                    <Link
                        to={`/auction/${product.id}`}
                        className="card small-12 medium-6 cell"
                        style={{ transform: 'none' }}
                        key={product.id}
                    >
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
                                    <i className="fas fa-gavel"></i>
                                </span>
                                <span className="label__main"> Đấu giá </span>
                            </div>
                            <h3 className="card__title">
                                <span>{product.title} </span>
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
                                    <b>Giá ước tính:</b> $15,000
                                </div>
                                <div className="stats-group__stat">
                                    <b>Giá khởi điểm (VNĐ):</b>
                                    <div className="stat__price">{FormatMoney(product.price)}</div>
                                </div>
                                <div className="stats-group__stat">
                                    <b>Giá hiện tại (VNĐ):</b>
                                    <div className="stat__price">4,600</div>
                                </div>
                            </div>
                            <div className="card__tertiary-container">
                                <span className="tertiary-container__optional-group" />
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default PageAuction;
