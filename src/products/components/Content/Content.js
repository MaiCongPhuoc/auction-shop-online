import React, { useState, useEffect } from "react";
import './../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../../../../node_modules/bootstrap/dist/js/bootstrap.js'
import ContentLotType from './ContentNav/ContentLotType';
import ContentAll from "./ContentAll/ContentAll";
import ContentAuction from './ContentAuction/ContentAuction';
import ContentTheShop from './ContentTheShop/ContentTheShop';
import './content.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getAccount, getCheckProduct, getType, getAllCartItems, getShowCart } from "../../redux/selector";
import { getSearchingFilters, getShowInfoProduct, getLoginStatus } from './../../redux/selector';
import ContentResultFilters from "./ContentResultFilters/ContentResultFilters";
import InfoProductModal from "../../Modal/InfoProductModal";
import { setCartItems, setCheckProduct, setShowCart } from './../../redux/actions';
import CartItem from "./CartItem/CartItem";
import CartItemService from './../../service/CartItem/CartItemService';



const Content = () => {
    const dispatch = useDispatch();

    const type = useSelector(getType);

    const searchStatus = useSelector(getSearchingFilters);

    const checkProduct = useSelector(getCheckProduct);

    const showInfoProduct = useSelector(getShowInfoProduct);

    const loginStatus = useSelector(getLoginStatus);

    const account = useSelector(getAccount);



    useEffect(() => {
        if (showInfoProduct) {
            dispatch(setCheckProduct(true));

        } else {
            dispatch(setCheckProduct(false));
        };

        if (loginStatus) {
            try {
                async function getCartItems() {
                    const cartItemsRes = await CartItemService.getCartItems(account.id);
                    dispatch(setCartItems(cartItemsRes.data));
                }
                getCartItems();
            } catch (error) {
                console.log(error);
            }
        };

    }, [showInfoProduct, loginStatus]);

    return (
        <>
            <div className="base-width main-yield" id="client-content">
                <div className="pages" data-pages-shell="">
                    <div id="homepage-lot">
                        <div className="category-items-wrapper cell medium-12 float-center" id="homepage-lot-list-wrapper">
                            <div id="homepage-lot-list">
                                <a id="top-categories" name="top-categories"></a>
                                <div className="sorter-wrapper">
                                    <div>
                                        <div>

                                            <ContentLotType />

                                            {
                                                searchStatus ? (<ContentResultFilters />) :
                                                    (
                                                        type === 'Đấu giá' ? <ContentAuction /> :
                                                            (type === 'Cửa hàng') ? <ContentTheShop /> :
                                                                <ContentAll />)
                                            }

                                            {
                                                checkProduct ? <InfoProductModal /> : null
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Content;