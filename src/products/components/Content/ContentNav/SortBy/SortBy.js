import React from "react";

const SortBy = () => {
    return (
        <div className="filter-item small cell small-12 medium-4 large-offset-1">
            <div className="filter-sort f-sort-list">
                <div>
                    <div>
                        <div className="filter-title">Bộ lọc</div>
                        <div className="selected" id="sortBy">
                            <span>Closing Next </span>
                            <i className="fa-solid fa-caret-down"></i>
                        </div>
                        <div className="list hidden">
                            <div className="list-item">Best Content</div>
                            <div className="list-item">Closing Next</div>
                            <div className="list-item">Newly Added</div>
                            <div className="list-item">Estimate (high to low)</div>
                            <div className="list-item">Estimate (low to high)</div>
                            <div className="list-item">Bid Count (high to low)</div>
                            <div className="list-item">Bid Count (low to high)</div>
                            <div className="list-item">Current price (high to low)</div>
                            <div className="list-item">Current price (low to high)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortBy;