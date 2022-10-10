import React from "react";
import LotType from "./LotType/LotType";
import SortBy from "./SortBy/SortBy";


const ContentLotType = () => {
    return (
        <div className="grid-x simple-filters-wrapper">
            <div className="simple-filters compact cell medium-12 grid-x grid-padding-x">
                <LotType />
                <SortBy />
            </div>
        </div>
    );
}

export default ContentLotType;