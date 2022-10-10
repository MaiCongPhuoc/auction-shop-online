import React, { useState } from "react";
import './content.css';
import './../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../../../../node_modules/bootstrap/dist/js/bootstrap.js'
import ContentLotType from './ContentNav/ContentLotType';
import { useStore } from "./../context/store";
import ContentAll from "./ContentAll/ContentAll";
import ContentAuction from './ContentAuction/ContentAuction';
import ContentTheShop from './ContentTheShop/ContentTheShop';


const Content = () => {

    const [state, dispatch] = useStore();
    const type = state.type;


    return (
        <>
            <div className="base-width main-yield">
                <div className="pages" data-pages-shell="">
                    <div id="homepage-lot">
                        <div className="category-items-wrapper cell medium-12 float-center" id="homepage-lot-list-wrapper">
                            <div id="homepage-lot-list">
                                <a id="top-categories" name="top-categories"></a>
                                <div className="sorter-wrapper">
                                    <div>
                                        <div>
                                            <ContentLotType />
                                            {type === 'Đấu giá' ? <ContentAuction /> :
                                                (type === 'Cửa hàng') ? <ContentTheShop /> :
                                                    <ContentAll />
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