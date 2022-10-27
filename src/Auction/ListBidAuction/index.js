import React, { useEffect, useState } from 'react';
import Header from '../../products/components/Header/Header';
import { useParams } from 'react-router-dom';
import BidService from '../../dashboard/services/BidService';
import Moment from 'moment';
import { NumericFormat } from 'react-number-format';

function ListBidAuction() {
    Moment.locale('vi');
    const { auctionId } = useParams();
    const [timeAuction, setTimeAuction] = useState([]);
    const [bids, setBids] = useState([]);
    useEffect(() => {
        async function getListBid() {
            let bid = await BidService.getBidByAuctionId(auctionId);
            setBids(bid.data);
        }
        getListBid();
    }, []);
    setTimeout(() => {
        let diffTime = Math.abs(new Date(bids[0].auction.auctionEndTime).valueOf() - new Date().valueOf());
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        setTimeAuction([Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]);
    }, 1000);

    console.log('bids: ', bids);
    // let diffTime = new Date();
    return (
        <>
            <Header className="product-client" />
            <div className="base-width main-yield" style={{ padding: '135px 0 0 0' }}>
                <div className="top-flash-bar" />
                <div className="pages" data-pages-shell>
                    <link
                        rel="stylesheet"
                        media="screen"
                        href="//d32bbtzitrctkc.cloudfront.net/assets/www/lot/bid_history-d2ba948c7a6a31c46ed6ba8464bec62af9b5fb08487dc1e6903413e8da58f3a1.css"
                    />
                    <div className="grid-x grid-margin-x"></div>
                    <div className="bid-history2">
                        <div className="history-summary">
                            <h2>Lịch sử đấu giá</h2>
                            <div className="title-desc">
                                <h2>Sản phẩm: {bids.length === 0 ? '' : bids[0].auction.product.title}</h2>
                                <p>
                                    <span className="bold">Người đấu giá cuối cùng: </span>{' '}
                                    {bids.length === 0 ? '' : bids[0].createdBy}
                                </p>
                            </div>
                            <div className="summary-wrapper">
                                <div className="summary-blocks grid-x grid-margin-x">
                                    <div className="summary-block cell small-3">
                                        <div className="summary-title">
                                            <b>Giá lớn nhất:</b>
                                        </div>
                                        <div className="summary-text">{bids.length === 0 ? '' : <NumericFormat
                                                value={bids[0].bidPrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' đ'}
                                            />}
                                        </div>
                                    </div>
                                    <div className="summary-block cell small-3">
                                        <div className="summary-title">
                                            <b>Phiên đấu giá</b>
                                        </div>
                                        <div className="summary-text">{bids.length}</div>
                                    </div>
                                    <div className="summary-block cell small-6">
                                        <div className="summary-title">
                                            <b>Thời gian còn lại</b>
                                        </div>
                                        <div className="summary-text">
                                            {timeAuction[0]}d : {timeAuction[1]}h : {timeAuction[2]}m : {timeAuction[3]}
                                            s
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="history-list show-for-medium">
                            <div className="grid-x grid-padding-x bid-header">
                                <div className="cell small-1 col-rank">THỨ HẠNG</div>
                                <div className="cell small-5 col-info">NGƯỜI ĐẤU THẦU</div>
                                <div className="cell small-2 col-info col-amt">SỐ TIỀN</div>
                                <div className="cell small-2 col-info">NGÀY</div>
                                <div className="cell small-2 col-info">THỜI GIAN</div>
                            </div>
                            {bids.map((bid, index) => (
                                <div className="grid-x grid-padding-x bid-row winner" key={bid.id}>
                                    <div className="cell small-1 col-rank">
                                        <div className="rank">{index + 1}</div>
                                    </div>
                                    <div className="cell small-5 col-info col-name">
                                        <div className="customer-name">{bid.createdBy}</div>
                                    </div>
                                    <div className="cell small-2 col-info col-amt">
                                        <div className="text-bidamt">
                                            <NumericFormat
                                                value={bid.bidPrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' đ'}
                                            />
                                        </div>
                                    </div>
                                    <div className="cell small-2 col-info col-date">
                                        {Moment(bid.createdAt).format('DD-MM-YYYY')}
                                    </div>
                                    <div className="cell small-2 col-info col-time">
                                        {Moment(bid.createdAt).format('hh:mm:ss')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListBidAuction;
