import { faCheck, faCircleInfo, faClock, faDollar, faHeart, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Moment from 'moment';
import { NumericFormat } from 'react-number-format';
import { isNumber } from '../../products/Hooks/Hooks';
import ValidationQuantity from '../../products/utils/ValidationQuantity';
import BidService from '../../dashboard/services/BidService';
import { Link, useParams } from 'react-router-dom';
import AuctionService from '../../dashboard/services/AuctionService';
import { useSelector } from 'react-redux';
import { getAccount } from '../../products/redux/selector';
import { toast, ToastContainer } from 'react-toastify';

function ComponentAuction(props) {
    Moment.locale('vi');
    const { auction } = props;

    const product = { ...auction.product };
    // const account = { ...auction.account };

    const account = useSelector(getAccount);

    const [timeAuction, setTimeAuction] = useState([]);
    const [Price, setPrice] = useState(0);
    const currentPrice = auction.currentPrice;
    const [checkPrice, setCheckPrice] = useState(true);
    const [errorMess, setErrorMess] = useState('');
    const [state, setState] = useState({ bids: [], auction: {} });
    const [rerender, setRerender] = useState(false);
    const [closeAction, setCloseAction] = useState(false);

    const { auctionId } = useParams();
    const [bid, setBid] = useState({
        id: 0,
        email: account.email,
        bidPrice: 0,
        account: { id: account.id },
        auction: { id: auction.id },
        deleted: false,
        estimatePrice: 0,
    });

    let diffTime = Math.abs(new Date(auction.auctionEndTime).valueOf() - new Date().valueOf());
    // const [diffTime, setDiffTime] = useState(Math.abs(new Date(auction.auctionEndTime).valueOf() - new Date().valueOf()));
    let days = diffTime / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let secs = (minutes % 1) * 60;
    setTimeout(() => {
        if (
            Math.floor(days) == 0 &&
            Math.floor(hours) == 0 &&
            Math.floor(minutes) == 0 &&
            Math.floor(secs) == 0
        ) {
            setCloseAction(true);
            // setDiffTime(0);
        } else {
            setTimeAuction([
                Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)
                // Math.floor(0), Math.floor(0), Math.floor(0), Math.floor(0)
            ]);
        }
    }, 1000);


    useEffect(() => {
        if (!isNumber(Price)) {
            setCheckPrice(false);
            setErrorMess('Giá phải là một số nguyên');
            return;
        }

        if (state.bids.length !== 0) {
            if (Price < state.bids[0].bidPrice + state.bids[0].bidPrice * 0.12) {
                setCheckPrice(false);
                setErrorMess(`Bạn phải đấu thầu lơn hơn giá hiện tại lớn hơn 12% đ`);
                return;
            }
        }

        setCheckPrice(true);
    }, [Price]);

    useEffect(() => {
        async function getListBid() {
            if (rerender) {
                BidService.postCreateBid(bid).then((res) => {
                    toast.success("Đặt giá thành công")
                }).catch((res) => {
                    toast.warn(res.response.data.exceptionMessage)
                });
            }
            let AuctionAPI = await AuctionService.getAuctionById(auctionId);
            let listBid = await BidService.getBidByAuctionId(auction.id);
            setState({ ...state, bids: listBid.data, auction: AuctionAPI.data });
        }
        getListBid();
        setRerender(false);
    }, [rerender]);

    const handleMinAuction = () => {
        let priceAuction = (state.bids[0].bidPrice + state.bids[0].bidPrice * 0.12001).toFixed();
        setPrice(priceAuction);
    };

    const handleBid = () => {
        let bidPrice = Number(document.querySelector('#bid').value);
        if (!isNumber(bidPrice)) {
            setErrorMess('Giá phải là một số nguyên');
            return;
        }
        if (Price < (state.bids[0].bidPrice + state.bids[0].bidPrice * 0.12).toFixed()) {
            setCheckPrice(false);
            setErrorMess(`Bạn phải đấu thầu lơn hơn giá hiện tại lớn hơn 12% đ`);
            return;
        }
        let subBid = { ...bid, bidPrice: bidPrice, estimatePrice: state.bids[0].estimatePrice };
        setBid({ ...subBid });
        setRerender(true);
        setPrice(0);
    };
    return (
        <div className="medium-5 medium-large-4 cell right-col">
            <div className="bidding-tool">
                <div id="space-holder-for-live-stream" />
                <div className="bid-mask exp-1" />
                <div className="bidding-box-nav">
                    <div className="close-btn">Close</div>
                </div>
                <div className="bidding-box exp-1 ">
                    {closeAction ? (
                        <div className="bb-panel-header warning">Closing Soon</div>
                    ) : (
                        <div className="bb-panel-header success bg-success" style={{color: '#fff'}}>Going on</div>
                    )}
                    <div className="bb-row bb-time exp-1 warning">
                        <div className="bb-icon">
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div className="bb-item">
                            <div className="bb-title">
                                <span>THỜI GIAN CÒN LẠI...</span>
                            </div>
                            <div className="bb-content">
                                <div className="bb-counter bid-closing-soon">
                                    <div className="closeness-wrapper exp-1">
                                        {closeAction ? (
                                            <span>
                                                Phiên đấu giá đã kết thúc
                                            </span>
                                        ) : (
                                            <span>
                                                {timeAuction[0]}d : {timeAuction[1]}h : {timeAuction[2]}m : {timeAuction[3]}
                                                s
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="bb-datetime exp-1">
                                    <p>Thời gian kết thúc:</p>
                                    <span className="time-left-close-date">
                                        {Moment(state.auction.auctionEndTime).format('DD-MM-YYYY HH:MM:SS')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bb-rows-wrapper">
                        <div className="bb-row bb-current-bid exp-1">
                            <div className="bb-icon">
                                {/* <i className="icon icon-ok-sign" /> */}
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className="bb-item">
                                <div className="current-bidder">
                                    <div className="bb-title is-label">
                                        <span
                                            aria-haspopup="true"
                                            className="current-bid bid-box-label"
                                            data-allow-html="true"
                                            data-position="left"
                                            data-tooltip2
                                            data-title="<div class='title-block'><b>About Current Bid</b></div> <div class='text-block'>The “Current Bid” is the current winning bid placed by an auction participant.</div> <div class='text-block'>If the auction closes at this price, this bid amount does not reflect additional taxes, shipping, or buyer’s premium. Please see the Conditions of Sale for details.</div>"
                                        >
                                            GIÁ HIỆN TẠI: <FontAwesomeIcon icon={faCircleInfo} />
                                        </span>
                                    </div>
                                    <div className="bb-content">
                                        <div className="first-to-bid exp-1" style={{ display: 'none' }}>
                                            Hãy là người đầu tiên đấu giá:
                                        </div>
                                        <div className="has-bids" style={{ display: 'block' }}>
                                            <div className="bid-data">
                                                <div
                                                    className="winning-amount big-numbers exp-1"
                                                    data-view="current-price"
                                                    style={{
                                                        lineHeight: 1,
                                                        paddingTop: 0,
                                                        paddingBottom: 0,
                                                    }}
                                                >
                                                    <NumericFormat
                                                        value={state.bids.length === 0 ? '' : state.bids[0].bidPrice}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' đ'}
                                                    />
                                                </div>
                                                <span className="bidder-identifier">
                                                    <hr />
                                                </span>
                                                <div
                                                    className="bid-link exp-1"
                                                    style={{ lineHeight: 1, paddingTop: 0 }}
                                                >
                                                    <Link
                                                        to={`/bid/${auction.id}`}
                                                        className="bid-box-bid-count"
                                                        href="#"
                                                    >
                                                        {state.bids.length} Giá thầu
                                                    </Link>
                                                </div>
                                                <div className="reserve-max-bid" style={{ display: 'none' }}>
                                                    Reserve not met
                                                </div>
                                                <div className="clear" />
                                            </div>
                                            <div className="max-bid" data-max>
                                                <div className="thirteen-font medium-gray max-bid-label">
                                                    Đấu thầu tối đa của bạn
                                                </div>
                                                <div className="max-bid-number">
                                                    <span />
                                                </div>
                                                <div className="clear" />
                                            </div>
                                            <div className="clear" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bb-row bb-next-bid exp-1">
                            <div className="bb-icon">
                                <i className="icon icon-plus-sign-alt" />
                            </div>
                            <div className="bb-item">
                                <div className="bb-title">
                                    <span>GIÁ THẦU TỐI THIỂU TIẾP THEO</span>
                                </div>
                                <div className="bb-content">
                                    <div className="next-min-bid" data-view="minimum-bid">
                                        2,500 đ
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bb-row bb-est-val exp-1">
                            <div className="bb-icon">
                                {/* <i className="icon icon-tag" /> */}
                                <FontAwesomeIcon icon={faTag} />
                            </div>
                            <div className="bb-item">
                                <div className="bb-title">
                                    <span
                                        aria-haspopup="true"
                                        data-allow-html="true"
                                        data-position="left"
                                        data-tooltip2
                                        title
                                        data-title="<div class='title-block'><b>About Estimates</b></div> <div class='text-block'>Estimate is based on various factors which may include past or expected sale prices of similar items in other auctions. Any listed estimate is not a guarantee of the actual selling price of this auction, or a representation of actual retail or other value.</div>"
                                    >
                                        GIÁ ƯỚC TÍNH:
                                    </span>
                                </div>
                                <div className="bb-content">
                                    <div className="est-val">
                                        <NumericFormat
                                            value={state.bids.length === 0 ? '' : state.bids[0].estimatePrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' đ'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bb-row bb-place-bid bb-desktop">
                            <div className="bb-item" id="bid-box-wrapper">
                                <h3 className="bad-auth" style={{ display: 'none' }} />
                                <form
                                    className="lot-form"
                                    style={{ margin: 0 }}
                                    id="new_bid"
                                    acceptCharset="UTF-8"
                                // method="post"
                                >
                                    <div className="bid-wrapper">
                                        <div className="bid-box grid-x" id="bid-box">
                                            <div className="icon-cell cell small-1">
                                                {/* <div className="icon-wrapper icon-dollar-sign"> */}
                                                {/* <i className="icon icon-dollar" /> */}
                                                <FontAwesomeIcon icon={faDollar} className="iconDollar" />
                                                {/* </div> */}
                                            </div>
                                            <div className="bid-amt cell small-7">
                                                <input
                                                    id="bid"
                                                    onChange={(e) => {
                                                        setPrice(e.target.value);
                                                    }}
                                                    value={Price}
                                                    className="bid-input-field big-numbers exp-1"
                                                    name="bid"
                                                    placeholder="Vui lòng nhập giá thầu..."
                                                />
                                            </div>
                                            <div className="bid-min-btn cell small-4">
                                                <button
                                                    type="button"
                                                    className="button next-min-bid-flag"
                                                    onClick={handleMinAuction}
                                                >
                                                    <span>ĐẤU THẦU NHỎ NHẤT</span>
                                                </button>
                                            </div>
                                            {checkPrice ? null : <ValidationQuantity message={errorMess} />}
                                            <input
                                                autoComplete="off"
                                                id="paid_entry_lot_id"
                                                type="hidden"
                                                name="bid[paid_entry_lot_id]"
                                            />
                                        </div>
                                        <div
                                            className="careted-flag"
                                            data-js-behavior="has-tooltipish"
                                            id="next-min-bid-flag"
                                            style={{ display: 'none' }}
                                            title="Click to bid next increment"
                                        />
                                    </div>
                                    <div className="bid-animation-wrapper relative-wrapper overflow-hidden">
                                        <button
                                            className="float-center button expanded bid-button exp-1"
                                            id="bid-button"
                                            type="button"
                                            onClick={handleBid}
                                        >
                                            ĐẤU GÍA
                                        </button>
                                    </div>
                                    <div className="bid-pending-icon">
                                        <i className="icon-spin icon-spinner" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bidding-box-confirm bidding-box-overlay exp-1">
                    <div className="close-btn">x</div>
                    <div className="your-bid">
                        <div className="title">ĐẤU THẦU CỦA BẠN</div>
                        <div className="amount exp-1" />
                    </div>
                    <div className="confirm-bid-msg">
                        By clicking <b>Confirm Bid</b> you commit to <br />
                        purchase this lot if you are the winning bidder.
                    </div>
                    <div className="confirm-bid-btn" id="confirm-bid">
                        <button className="button success expanded float-center confirm-button" id="confirm-button">
                            CONFIRM BID
                        </button>
                    </div>
                </div>
                <div className="bidding-box-impact bidding-box-overlay">
                    <div className="bb-impact-title-row text-center">
                        <i className="fal fa-info-circle" aria-hidden="true" />
                        <span>
                            Learn more about <b>The Shop</b>
                        </span>
                    </div>
                    <div className="impact-desc">
                        When purchasing items like this from The Shop, there is no bidding. Get what you want, when you
                        want it.
                    </div>
                    <div className="close-impact-box-btn">
                        <button className="button info expanded float-center confirm-button">GOT IT!</button>
                    </div>
                </div>
                <div className="bidding-box-raisebid bidding-box-overlay exp-1">
                    <div className="close-btn">x</div>
                    <div className="winning-title">
                        You increased
                        <br />
                        your max bid!
                    </div>
                    <div className="winning-icon">
                        {/* <i className="icon icon-ok-sign" /> */}
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                </div>
                <div className="bidding-box-outbid bidding-box-overlay exp-1">
                    <div className="close-btn">x</div>
                    <div className="outbid-title">You were outbid!</div>
                    <div className="outbid-icon">
                        <i className="icon icon-exclamation-sign" />
                    </div>
                    <div className="outbid-switch-regular">
                        <div className="outbid-msg">
                            Bidders can set a Max Bid that will automatically
                            <br />
                            place bids for them up to their designated amount.
                        </div>
                        <div className="outbid-learnmore">
                            <a href="/faqs#faq-max-bid">Learn more about max bids</a>
                        </div>
                    </div>
                    <div className="outbid-switch-reserve" style={{ display: 'none' }}>
                        <div className="outbid-msg">
                            This lot has a reserve amount bidding
                            <br />
                            much reach in order to be won.
                        </div>
                        <div className="outbid-learnmore">
                            <a href="/faqs#faq-reserve-bid">Learn more about Reserve bids</a>
                            <br />
                        </div>
                    </div>
                    <div className="bb-row bb-place-bid">
                        <div className="bb-icon" />
                        <div className="bb-item bid-box-wrapper">
                            <h3 className="bad-auth" style={{ display: 'none' }} />
                            <div className="bid-wrapper">
                                <div className="bid-box">
                                    <span className="icon-wrapper">
                                        <i className="icon icon-dollar" />
                                    </span>
                                    <input
                                        type="text"
                                        name="amount"
                                        defaultValue
                                        autoComplete="off"
                                        data-min-bid
                                        className="bid-input-field exp-1 bid-input-field-dup big-numbers"
                                        pattern="[0-9]*"
                                        placeholder="2,500 or more"
                                    />
                                </div>
                                <div className="bid-next-min-exp exp-1">
                                    <span className="next-min-bid-label">Giá thầu tối thiểu tiếp theo: &nbsp;</span>
                                    <span className="next-min-bid" data-view="minimum-bid">
                                        2,500 đ
                                    </span>
                                </div>
                            </div>
                            <div className="bid-animation-wrapper relative-wrapper overflow-hidden">
                                <button className="button expanded float-center bid-button bid-button-dup exp-1">
                                    ĐẤU THẦU
                                </button>
                            </div>
                            <div className="bid-pending-icon">
                                <i className="icon-spin icon-spinner" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bidding-actions">
                    {/* <div className="watching">
                        <b>41</b>
                        <span>people watching</span>
                    </div> */}
                    <div id="your-impact">
                        <div className="center-me">
                            <div className="your-impact-msg" />
                        </div>
                    </div>
                    <div className="watchlist-action exp-1">
                        {/* <div className="watcher-btn"> */}
                        <a
                            className="watch-button watcher-btn Add-to-Watchlist"
                            style={{ border: 'none' }}
                            href="/catalog_items/2522828/toggle_watch"
                        >
                            <div className="relative-wrapper watch-wrapper Add-to-Watchlist">
                                <FontAwesomeIcon icon={faHeart} />
                                {/* </b> */}
                            </div>
                            <span className="watch-type Add-to-Watchlist">THÊM VÀO DANH SÁCH THEO DÕI</span>
                        </a>
                        {/* </div> */}
                    </div>
                    {/* <div className="social-network-action">
                        <div id="share-this-lot">
                            <ul id="social-shares">
                                <li className="twitter-share">
                                    <a href="https://twitter.com/intent/tweet?text=Enjoy a Round of Golf at Bethpage B...&url=https://www.charitybuzz.com/catalog_items/auction-enjoy-round-of-golf-at-bethpage-black-course-2522828">
                                        <i className="icon-twitter" />
                                        <FontAwesomeIcon icon={faTextWidth} />
                                    </a>
                                </li>
                                <li className="facebook-share">
                                    <div id="fb-root" />
                                    <a
                                        data-fb-url="https://www.charitybuzz.com/catalog_items/auction-enjoy-round-of-golf-at-bethpage-black-course-2522828"
                                        href="#"
                                    >
                                        <i className="icon-facebook" />
                                    </a>
                                </li>
                                <li className="email-share">
                                    <a
                                        className="twitter addthis_button_email  emailShare opacHover"
                                        href="http://www.addthis.com/bookmark.php"
                                        target="_blank"
                                        title="Email"
                                    >
                                        <i className="icon-envelope" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
            <ToastContainer autoClose={1500}/>
        </div>
    );
}

export default ComponentAuction;
