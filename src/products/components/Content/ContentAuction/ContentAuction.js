import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { getLoadData, getAccount } from '../../../redux/selector';
import LoadData from './../../Loading/LoadData';
import { FormatMoney } from './../../../Hooks/Hooks';
import { Link } from 'react-router-dom';
import { getProductsAuction } from './../../../redux/selector';
import WatchListsService from '../../../service/WatchList/WatchListService';

const ContentAuction = () => {
    const [watchLists, setWatchLists] = useState([]);

    const account = useSelector(getAccount);
    useEffect(() => {
        try {
            WatchListsService.getWatchListByAccountId(account.id).then((res) => {
                setWatchLists(res.data);
            }).catch((resp) => {
                console.log(resp);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    
    const productsAuction = useSelector(getProductsAuction);


    const loadData = useSelector(getLoadData);
    return (
        <div className="lot-cards grid-x grid-margin-x">
            {loadData ? (
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
                                <span className="label__main"> ?????u gi?? </span>
                            </div>
                            <h3 className="card__title">
                                <span>{product.title} </span>
                            </h3>
                            <div className="card__meta-group" />
                            <div className="card__stats-group">
                                <div className="stats-group__stat">
                                    <b>??ang tham gia:</b> 5
                                </div>
                                <div className="stats-group__stat">
                                    <b>Theo d??i:</b> 34
                                </div>
                                <div className="stats-group__stat">
                                    <b>Gi?? ?????c t??nh:</b> {FormatMoney(product.estimatePrice)} ???
                                </div>
                                <div className="stats-group__stat">
                                    <b>Gi?? kh???i ??i???m:</b>
                                    <div className="stat__price">{FormatMoney(product.price)}</div>
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

export default ContentAuction;
