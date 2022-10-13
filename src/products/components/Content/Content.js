import React from "react";
import './../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../../../../node_modules/bootstrap/dist/js/bootstrap.js'
import ContentLotType from './ContentNav/ContentLotType';
import ContentAll from "./ContentAll/ContentAll";
import ContentAuction from './ContentAuction/ContentAuction';
import ContentTheShop from './ContentTheShop/ContentTheShop';
import './content.css';
import { useSelector } from 'react-redux/es/exports';
import { getType } from "../../redux/selector";
import { getSearchingFilters } from './../../redux/selector';
import ContentResultFilters from "./ContentResultFilters/ContentResultFilters";
import InfoProductModal from "../../Modal/InfoProductModal";



const Content = () => {

    const type = useSelector(getType);

    const searchStatus = useSelector(getSearchingFilters);

    

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

                                            {searchStatus ? (<ContentResultFilters />) : (
                                                type === 'Đấu giá' ? <ContentAuction /> :
                                                    (type === 'Cửa hàng') ? <ContentTheShop /> :
                                                        <ContentAll />)}

                                            <InfoProductModal />
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