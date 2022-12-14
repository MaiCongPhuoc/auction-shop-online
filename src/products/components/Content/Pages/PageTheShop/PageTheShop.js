import React, { useEffect, useState } from 'react';
import { FormatMoney } from '../../../../Hooks/Hooks';
import { Link } from 'react-router-dom';
import ProductService from '../../../../service/Product/ProductService';
import LoadCart from './../../../Loading/LoadCart';

const PageTheShop = () => {
    const [productsTheShop, setProductsTheShop] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        try {
            setLoading(true);
            async function getTheShopProducts() {
                let dataRes = await ProductService.getAllProductTheShops();
                setProductsTheShop(dataRes.data);
                setLoading(false);
                window.scrollTo(0, 0);
            }
            getTheShopProducts();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            {loading ? (
                <div style={{marginTop: '200px'}}>
                    <LoadCart />
                </div>
            ) : (
                <div className="lot-cards grid-x grid-margin-x" style={{ marginTop: '150px' }}>
                    {
                        productsTheShop.map((product) => (
                            <div className="card small-12 medium-6 cell" style={{ transform: 'none' }} key={product.id}>
                                <Link to={`/product/the-shop/${product.slug}`} style={{ color: '#333' }}>
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
                                            <span className="label__main"> C???a h??ng </span>

                                        </div>
                                        <h3 className="card__title">
                                            <span>{product.title}</span>
                                        </h3>
                                        <div className="card__stats-group">
                                            <div className="stats-group__stat">
                                                <b>S??? l?????ng c??n l???i:</b> {product.available}
                                            </div>
                                            <div className="stats-group__stat">
                                                <b>Gi?? s???n ph???m:</b>
                                                <div className="stat__price ItemCard-module__binPriceCentered___3hyVZ">
                                                    {FormatMoney(product.price)} ???
                                                </div>
                                            </div>
                                            <div className="ItemCard-module__marketPrice___3E7JK">
                                                <b>???? b??n: </b>
                                                <span className="ItemCard-module__lineThrough___3xq25">{product.sold}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card__tertiary-container">
                                            <span className="tertiary-container__optional-group" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            )}
        </>
    );
};

export default PageTheShop;
