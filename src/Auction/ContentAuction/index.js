import {
    faCheck,
    faCircleInfo,
    faClock,
    faDollar,
    faDotCircle,
    faHeart,
    faPlus,
    faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import ProductService from '../../dashboard/services/productService';
import ProductMediaService from '../../dashboard/services/ProductImageService';
import LoadData from '../../products/components/Loading/LoadData';
import { Carousel } from '../../products/Hooks/Hooks';

function ContentAuctionDetail() {
    const auctionId = useParams();
    const [AuctionProduct, setAuctionProduct] = useState({
        Product: {},
        imageProductAuctions: [],
        loading: false,
    });
    useEffect(() => {
        try {
            async function getproduct() {
                setAuctionProduct({ ...AuctionProduct, loading: true });
                let productAuction = await ProductService.ProductById(auctionId.auctionId);
                let productImageAuction = await ProductMediaService.getListMedia(productAuction.data.id);
                setAuctionProduct({
                    ...AuctionProduct,
                    Product: productAuction.data,
                    imageProductAuctions: productImageAuction.data,
                    loading: false,
                });
            }
            getproduct();
        } catch (error) {}
    }, []);
    const { Product, imageProductAuctions, loading } = AuctionProduct;
    console.log('AuctionProduct: ', AuctionProduct);
    let max_visibility = imageProductAuctions.length;
    return (
        <div className="container">
            <link
                rel="stylesheet"
                media="screen"
                href="//d32bbtzitrctkc.cloudfront.net/assets/www/vendor/owl-carousel/owl-carousel-4594f4773699ea511c50fbe56ec64b9e668c3d2d6f0176d400b3cc784f94704d.css"
            />
            <link
                href="https://d2rbybg5ibx87t.cloudfront.net/images/664283/ios_small_thumb.jpeg?1665172721"
                rel="image_src"
                type="image/jpeg"
            />
            <a className="hidden" id="live-update-trigger" data-remote="true" href="/catalog_items/2522828">
                live-update-trigger
            </a>
            {loading ? (
                <LoadData />
            ) : (
                <div id="lot-body">
                    <div className="grid-x grid-margin-x" id="lot-page-redesign-2">
                        <div className="bid-button-mobile-wrapper">
                            <button className="button bid-button-mobile bid-button-item exp-1">BID</button>
                            <div className="reward-popup-mobile-full">
                                <div className="tt-arrow-down" />
                                <div className="reward-pp-left">
                                    <img
                                        src="//d32bbtzitrctkc.cloudfront.net/assets/www/icons/icon-gift3x-red-b122d3f505af1a3956bff4c219d2cf2cafe9c118f2f9ca18b9d7c44828efb93a.png"
                                        alt="Icon gift3x red"
                                    />
                                </div>
                                <div className="reward-pp-mid">
                                    <div className="reward-pp-title">
                                        Watching? Bid Now, Get đ<span className="reward-amount" />!
                                    </div>
                                    <div className="reward-pp-text">
                                        Bid before this lot closes and we'll give you đ
                                        <span className="reward-amount" />
                                    </div>
                                </div>
                                <div className="reward-pp-right">
                                    <div className="expire-tt">EXPIRES:</div>
                                    <div className="expire-text">Lot Close</div>
                                </div>
                            </div>
                            <div className="reward-popup-mobile-small">
                                <div className="tt-arrow-down" />
                                <div className="reward-pp-sm-icon">
                                    <img
                                        src="//d32bbtzitrctkc.cloudfront.net/assets/www/icons/icon-gift2x-white-3178e1c4447c2cbe58c2a58ba90562ea6b4d18a364e13eaafabfbbd9f528feab.png"
                                        alt="Icon gift2x white"
                                    />
                                </div>
                                <div className="reward-pp-sm-text">Available until lot close</div>
                            </div>
                        </div>
                        <div className="medium-7 medium-large-8 cell left-col">
                            <div className="lot-page-left">
                                <div className="lot-title">
                                    <h2>{Product.title}</h2>
                                </div>
                                <div className="lot-notice alert-info hide" />
                                <div className="lot-image-showcase">
                                    <div className="slide-image">
                                        <Carousel maxVisibility={max_visibility}>
                                            {imageProductAuctions.map((media, i) => (
                                                <img key={i} src={media.fileUrl} alt="" />
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="lot-detail">
                                    <div className="lot-content-alt">
                                        <div className="bidding-box-alt">
                                            <div className="bb-panel-header warning">Closing Soon</div>
                                            <div className="bb-element bb-time exp-1 warning">
                                                <div className="bb-icon">
                                                    <FontAwesomeIcon icon={faClock} />
                                                </div>
                                                <div className="bb-item">
                                                    <div className="bb-title">
                                                        <span>TIME LEFT...</span>
                                                    </div>
                                                    <div className="bb-content">
                                                        <div className="bb-counter bid-closing-soon">
                                                            <div className="closeness-wrapper exp-1">
                                                                <div className="bb-counter-unit close-large-unit">
                                                                    11
                                                                </div>
                                                                <span>h</span> :
                                                            </div>
                                                            <div className="closeness-wrapper exp-1">
                                                                <div className="bb-counter-unit close-medium-unit">
                                                                    47
                                                                </div>
                                                                <span>m</span> :
                                                            </div>
                                                            <div className="closeness-wrapper exp-1">
                                                                <div className="bb-counter-unit close-small-unit">
                                                                    37
                                                                </div>
                                                                <span>s</span>
                                                            </div>
                                                        </div>
                                                        <div className="bb-datetime exp-1">
                                                            <span className="time-left-close-date">
                                                                Oct.21, 03:24 pm EDT
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bb-element">
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
                                                                title
                                                                data-title="<div class='title-block'><b>About Current Bid</b></div> <div class='text-block'>The “Current Bid” is the current winning bid placed by an auction participant.</div> <div class='text-block'>If the auction closes at this price, this bid amount does not reflect additional taxes, shipping, or buyer’s premium. Please see the Conditions of Sale for details.</div>"
                                                            >
                                                                GIÁ HIỆN TẠI: <FontAwesomeIcon icon={faCircleInfo} />
                                                            </span>
                                                        </div>
                                                        <div className="bb-content">
                                                            <div
                                                                className="first-to-bid exp-1"
                                                                style={{ display: 'none' }}
                                                            >
                                                                Be the first to bid
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
                                                                        2,250 đ
                                                                    </div>
                                                                    <span className="bidder-identifier">
                                                                        <span
                                                                            className="winning-bidder exo-1 current-bid-label"
                                                                            data-view="placed-by"
                                                                            data-winner
                                                                            style={{
                                                                                lineHeight: 1,
                                                                                paddingTop: 0,
                                                                                paddingBottom: 0,
                                                                                fontSize: '13px',
                                                                            }}
                                                                        >
                                                                            cfitzy
                                                                        </span>
                                                                    </span>
                                                                    <div
                                                                        className="bid-link exp-1"
                                                                        style={{ lineHeight: 1, paddingTop: 0 }}
                                                                    >
                                                                        <a
                                                                            className="bid-box-bid-count"
                                                                            href="https://www.charitybuzz.com/catalog_items/2522828/bids"
                                                                        >
                                                                            13 Bids
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        className="reserve-max-bid"
                                                                        style={{ display: 'none' }}
                                                                    >
                                                                        Reserve not met
                                                                    </div>
                                                                    <div className="clear" />
                                                                </div>
                                                                <div className="max-bid" data-max>
                                                                    <div className="thirteen-font medium-gray max-bid-label">
                                                                        Your max bid
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
                                                <br />
                                                <div className="bb-icon">
                                                    {/* <i className="icon icon-tag" /> */}
                                                    <FontAwesomeIcon icon={faTag} />
                                                </div>
                                                <div className="bb-item">
                                                    <div className="bb-title bb-est-val">
                                                        <span
                                                        >
                                                            GIÁ ƯỚC TÍNH
                                                        </span>
                                                    </div>
                                                    <div className="bb-content">
                                                        <div className="est-val">2,500 đ</div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="bid-next-min"
                                                    style={{
                                                        textAlign: 'center',
                                                        fontSize: '13px',
                                                        color: '#788088',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <span className="next-min-bid-label">Giá thầu tối thiểu tiếp theo: &nbsp;</span>
                                                    <span className="next-min-bid" data-view="minimum-bid">
                                                        2,500 đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bidding-actions">
                                            <div className="watching">
                                                <b>41</b>
                                                <span>people watching</span>
                                            </div>
                                            <div id="your-impact">
                                                <div className="center-me">
                                                    <div className="your-impact-msg" />
                                                </div>
                                            </div>
                                            <div className="watchlist-action exp-1">
                                                <div className="watcher-btn">
                                                    <a
                                                        className="watch-button Add-to-Watchlist"
                                                        href="/catalog_items/2522828/toggle_watch"
                                                    >
                                                        <b
                                                            className="watching-plus"
                                                            style={{ fontStyle: 'normal', display: 'block !important' }}
                                                        >
                                                            <FontAwesomeIcon icon={faHeart} />
                                                        </b>
                                                        <span className="watch-type Add-to-Watchlist">
                                                            Add to Watchlist
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="social-network-action">
                                                <div id="share-this-lot">
                                                    <ul id="social-shares">
                                                        <li className="twitter-share">
                                                            <a href="https://twitter.com/intent/tweet?text=Enjoy a Round of Golf at Bethpage B...&url=https://www.charitybuzz.com/catalog_items/auction-enjoy-round-of-golf-at-bethpage-black-course-2522828">
                                                                <i className="icon-twitter" />
                                                            </a>
                                                        </li>
                                                        <li className="facebook-share">
                                                            <div id="fb-root" className=" fb_reset">
                                                                <div
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '-10000px',
                                                                        width: '0px',
                                                                        height: '0px',
                                                                    }}
                                                                >
                                                                    <div />
                                                                </div>
                                                            </div>
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
                                                <hr />
                                            </div>
                                            <div className="cs-action text">
                                                Questions about this lot?
                                                <a
                                                    className="ask-button"
                                                    href="/contacts/new?lot=auction-enjoy-round-of-golf-at-bethpage-black-course-2522828"
                                                >
                                                    Ask us.
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lot-tabs">
                                        <div className="lot-tab-item active" tab="lot-overview">
                                            Overview
                                        </div>
                                        <div className="lot-tab-item" tab="lot-rules">
                                            Conditions of Sale
                                        </div>
                                        <div className="lot-tab-item" tab="lot-shipping">
                                            Shipping &amp; Redemption
                                        </div>
                                    </div>
                                    <div className="lot-content">
                                        <div className="item lot-overview active">
                                            <div className="lot-donator">Thông tin phiên đấu giá:</div>
                                            <div className="lot-description">
                                                <p>{Product.description}</p>
                                            </div>
                                            <hr style={{ borderWidth: '1px' }} />
                                            <div className="new-terms-wrapper">
                                                <div className="new-term-item">
                                                    <div className="new-terms-title-mobile">Dates</div>
                                                    <div className="new-terms-detail">
                                                        <div className="new-terms-title">Dates</div>
                                                        <div className="new-terms-content">
                                                            <ul>
                                                                <li>Event expires on Oct 21, 2023.</li>
                                                                <li>
                                                                    Airfare will occur within the following date
                                                                    range(s): <br /> Oct 21, 2022 to Oct 06, 2023
                                                                </li>
                                                            </ul>
                                                            {/* <hr className="desktop" /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="new-term-item">
                                                <div className="new-terms-title-mobile">Additional Lot Details</div>
                                                <div className="new-terms-detail">
                                                    <div className="new-terms-title">
                                                        Additional Lot
                                                        <br />
                                                        Details
                                                    </div>
                                                    <div className="new-terms-content">
                                                        <ul>
                                                            <li>Valid for 2 people.</li>
                                                            <li>Participants must be 21 years or older.</li>
                                                            <li>Approximate duration: 4 hours.</li>
                                                            <li>
                                                                Includes 2 JetBlue roundtrip travel certificates (each
                                                                certificate is valid for 1 roundtrip).
                                                            </li>
                                                            <li>Seat class: Core.</li>
                                                            <li>
                                                                <strong>
                                                                    JetBlue travel certificate blackout dates: click
                                                                    here for&nbsp;
                                                                    <a
                                                                        href="https://lifecycle-newsletter.s3.amazonaws.com/pdfs/2022_Blackout_Dates.pdf"
                                                                        target="_blank"
                                                                    >
                                                                        2022
                                                                    </a>
                                                                    &nbsp;and&nbsp;
                                                                    <a
                                                                        href="https://lifecycle-newsletter.s3.amazonaws.com/pdfs/2023_BLACKOUT_DATES_.pdf"
                                                                        target="_blank"
                                                                    >
                                                                        2023
                                                                    </a>
                                                                    .
                                                                </strong>
                                                            </li>
                                                            <li>
                                                                <strong>
                                                                    AIRFARE IS SUBJECT TO JETBLUE'S STANDARD FLIGHT
                                                                    TRAVEL CERTIFICATE TERMS &amp; CONDITIONS.
                                                                    CLICK&nbsp;
                                                                    <a
                                                                        href="https://lifecycle-newsletter.s3.amazonaws.com/_design/a-team/jetblue_091219/JetBlue%20terms%20and%20conditions.pdf"
                                                                        target="_blank"
                                                                    >
                                                                        HERE
                                                                    </a>
                                                                    &nbsp;TO VIEW.
                                                                </strong>
                                                            </li>
                                                            <li>
                                                                Location restrictions: JetBlue travel certificates are
                                                                valid for round-trip travel to any of JetBlue's 100+
                                                                destinations.
                                                            </li>
                                                            <li>
                                                                Airfare does not have to be used in conjunction with
                                                                this package. Redeemed travel is subject to
                                                                availability, blackout dates, and capacity controls.
                                                            </li>
                                                            <li>Flight taxes are not included.</li>
                                                        </ul>
                                                        <div className="lot-id">Lot #2522828</div>
                                                        <hr className="desktop" />
                                                    </div>
                                                </div>
                                            </div> */}
                                            </div>

                                            <hr style={{ borderWidth: '1px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="medium-5 medium-large-4 cell right-col">
                            <div className="bidding-tool">
                                <div id="space-holder-for-live-stream" />
                                <div className="bid-mask exp-1" />
                                <div className="bidding-box-nav">
                                    <div className="close-btn">Close</div>
                                </div>
                                <div className="bidding-box exp-1 " lot-id={2522828} needs-float="true">
                                    <div className="bb-panel-header warning">Closing Soon</div>
                                    <div className="bb-row bb-time exp-1 warning">
                                        <div className="bb-icon">
                                            <FontAwesomeIcon icon={faClock} />
                                        </div>
                                        <div className="bb-item">
                                            <div className="bb-title">
                                                <span>TIME LEFT...</span>
                                            </div>
                                            <div className="bb-content">
                                                <div className="bb-counter bid-closing-soon">
                                                    <div className="closeness-wrapper exp-1">
                                                        <div className="bb-counter-unit close-large-unit">11</div>
                                                        <span>h</span> :
                                                    </div>
                                                    <div className="closeness-wrapper exp-1">
                                                        <div className="bb-counter-unit close-medium-unit">47</div>
                                                        <span>m</span> :
                                                    </div>
                                                    <div className="closeness-wrapper exp-1">
                                                        <div className="bb-counter-unit close-small-unit">37</div>
                                                        <span>s</span>
                                                    </div>
                                                </div>
                                                <div className="bb-datetime exp-1">
                                                    <span className="time-left-close-date">Oct.21, 03:24 pm EDT</span>
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
                                                            title
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
                                                                    2,250 đ
                                                                </div>
                                                                <span className="bidder-identifier">
                                                                    <hr/>
                                                                </span>
                                                                <div
                                                                    className="bid-link exp-1"
                                                                    style={{ lineHeight: 1, paddingTop: 0 }}
                                                                >
                                                                    <a className="bid-box-bid-count" href="#">
                                                                        13 Giá thầu
                                                                    </a>
                                                                </div>
                                                                <div
                                                                    className="reserve-max-bid"
                                                                    style={{ display: 'none' }}
                                                                >
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
                                                        GIÁ ƯỚC TÍNH
                                                    </span>
                                                </div>
                                                <div className="bb-content">
                                                    <div className="est-val">2,500 đ</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bb-row bb-place-bid bb-desktop">
                                            <div className="bb-item" id="bid-box-wrapper">
                                                <h3 className="bad-auth" style={{ display: 'none' }} />
                                                <form
                                                    className="lot-form"
                                                    style={{ margin: 0 }}
                                                    data-view="new-bid"
                                                    data-item-id={2522828}
                                                    data-item-slug="auction-enjoy-round-of-golf-at-bethpage-black-course-2522828"
                                                    id="new_bid"
                                                    action="https://www.charitybuzz.com/catalog_items/2522828/bids"
                                                    acceptCharset="UTF-8"
                                                    method="post"
                                                >
                                                    <input name="utf8" type="hidden" defaultValue="✓" />
                                                    <input
                                                        type="hidden"
                                                        name="authenticity_token"
                                                        defaultValue="fF+nZLV2GZ0bcLzEEptUztjR/rqCxqd1p0ZM0nA3c9kb/O6Wup0PmR7x0krt38lqId/eZH/mDQ/CeckF1OCauw=="
                                                    />
                                                    <div className="bid-wrapper">
                                                        <div className="bid-box grid-x" id="bid-box">
                                                            <div className="icon-cell cell small-1">
                                                                {/* <div className="icon-wrapper icon-dollar-sign"> */}
                                                                {/* <i className="icon icon-dollar" /> */}
                                                                <FontAwesomeIcon
                                                                    icon={faDollar}
                                                                    className="iconDollar"
                                                                />
                                                                {/* </div> */}
                                                            </div>
                                                            <div className="bid-amt cell small-7">
                                                                <input
                                                                    id="bid-field"
                                                                    className="bid-input-field big-numbers exp-1"
                                                                    name="bid[amount]"
                                                                    placeholder="2,500 or more"
                                                                />
                                                            </div>
                                                            <div className="bid-min-btn cell small-4">
                                                                <button className="button next-min-bid-flag">
                                                                    <span>ĐẤU THẦU NHỎ NHẤT</span>
                                                                </button>
                                                            </div>
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
                                                    <div className="bid-next-min-exp exp-1">
                                                        <span className="next-min-bid-label">
                                                            Giá thầu tối thiểu tiếp theo: &nbsp;
                                                        </span>
                                                        <span className="next-min-bid" data-view="minimum-bid">
                                                            2,500 đ
                                                        </span>
                                                    </div>
                                                    <div className="bid-animation-wrapper relative-wrapper overflow-hidden">
                                                        <button
                                                            className="float-center button expanded bid-button exp-1"
                                                            id="bid-button"
                                                        >
                                                            ĐẤU THẦU
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
                                        <button
                                            className="button success expanded float-center confirm-button"
                                            id="confirm-button"
                                        >
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
                                        When purchasing items like this from The Shop, there is no bidding. Get what you
                                        want, when you want it.
                                    </div>
                                    <div className="close-impact-box-btn">
                                        <button className="button info expanded float-center confirm-button">
                                            GOT IT!
                                        </button>
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
                                    <div className="watching">
                                        <b>41</b>
                                        <span>people watching</span>
                                    </div>
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
                                                {/* <b
                                                className="watching-plus"
                                                style={{ fontStyle: 'normal', display: 'block !important' }}
                                            > */}
                                                <FontAwesomeIcon icon={faHeart} />
                                                {/* </b> */}
                                            </div>
                                            <span className="watch-type Add-to-Watchlist">THÊM VÀO DANH SÁCH THEO DÕI</span>
                                        </a>
                                        {/* </div> */}
                                    </div>
                                    <div className="social-network-action">
                                        <div id="share-this-lot">
                                            <ul id="social-shares">
                                                <li className="twitter-share">
                                                    <a href="https://twitter.com/intent/tweet?text=Enjoy a Round of Golf at Bethpage B...&url=https://www.charitybuzz.com/catalog_items/auction-enjoy-round-of-golf-at-bethpage-black-course-2522828">
                                                        <i className="icon-twitter" />
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
                                        {/* <hr /> */}
                                    </div>
                                    {/* <div className="cs-action text">
                                    Questions about this lot?
                                    <a
                                        className="ask-button"
                                        href="/contacts/new?lot=auction-enjoy-round-of-golf-at-bethpage-black-course-2522828"
                                    >
                                        Ask us.
                                    </a>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="related-lots" style={{ clear: 'both' }} className="unactionable-lots">
                        <div id="related-lots-title" style={{}}>
                            <h2>NẾU BẠN THÍCH NHIỀU HƠN...</h2>
                        </div>
                        <div className="lots-wrapper">
                            <div className="loading-signal">
                                <i className="icon-spin icon-spinner">&nbsp;</i>
                            </div>
                            <div
                                id="display-related-lots"
                                className="template-wrapper grid-x grid-margin-x"
                                data-view="related-lots"
                            >
                                <div className="individual-item-view cell medium-3">
                                    <div className="item" id={2522803}>
                                        <a
                                            href="/catalog_items/auction-limited-edition-titos-vodka-william-murray-golf-2522803"
                                            id="item-link-2522803"
                                        >
                                            <div className="item-wrapper">
                                                <div className="catalog-item-image">
                                                    <img
                                                        src="https://d2rbybg5ibx87t.cloudfront.net/images/662799/home_page_thumb.jpeg?1664917965"
                                                        alt=""
                                                    />
                                                    <div
                                                        data-tooltip="data-tooltip"
                                                        title="Bid quick! Closing soon."
                                                        className="item-time-flag"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="catalog-item-info">
                                                    <span className="title">
                                                        Limited Edition Titos’ Vodka William Murray Golf Bag &amp; 2
                                                        JetBlue Roundtrip Travel Certificates
                                                    </span>
                                                    <span className="price">Giá hiện tại: 2,200 đ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="individual-item-view cell medium-3">
                                    <div className="item" id={2522810}>
                                        <a
                                            href="/catalog_items/auction-4-vip-red-sox-tickets-to-2023-home-game-pre-2522810"
                                            id="item-link-2522810"
                                        >
                                            <div className="item-wrapper">
                                                <div className="catalog-item-image">
                                                    <img
                                                        src="https://d2rbybg5ibx87t.cloudfront.net/images/662973/home_page_thumb.jpeg?1664982211"
                                                        alt=""
                                                    />
                                                    <div
                                                        data-tooltip="data-tooltip"
                                                        title="Bid quick! Closing soon."
                                                        className="item-time-flag"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="catalog-item-info">
                                                    <span className="title">
                                                        4 VIP Red Sox Tickets to a 2023 Home Game, Pre-Game Tour, 4
                                                        JetBlue Roundtrip Travel Certificates &amp; More
                                                    </span>
                                                    <span className="price">Giá hiện tại: 3,350 đ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="individual-item-view cell medium-3">
                                    <div className="item" id={2522812}>
                                        <a
                                            href="/catalog_items/auction-4-vip-club-level-seats-patriots-vs-jets-game-on-2522812"
                                            id="item-link-2522812"
                                        >
                                            <div className="item-wrapper">
                                                <div className="catalog-item-image">
                                                    <img
                                                        src="https://d2rbybg5ibx87t.cloudfront.net/images/663004/home_page_thumb.jpeg?1664983766"
                                                        alt=""
                                                    />
                                                    <div
                                                        data-tooltip="data-tooltip"
                                                        title="Bid quick! Closing soon."
                                                        className="item-time-flag"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="catalog-item-info">
                                                    <span className="title">
                                                        4 VIP Club Level Seats the Patriots vs. Jets Game on October 30,
                                                        2022 at MetLife Stadium with 4 JetBlue Roundtrip Travel...
                                                    </span>
                                                    <span className="price">Giá hiện tại: 3,100 đ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="individual-item-view cell medium-3">
                                    <div className="item" id={2522827}>
                                        <a
                                            href="/catalog_items/auction-enjoy-round-of-golf-at-bethpage-black-course-2522827"
                                            id="item-link-2522827"
                                        >
                                            <div className="item-wrapper">
                                                <div className="catalog-item-image">
                                                    <img
                                                        src="https://d2rbybg5ibx87t.cloudfront.net/images/664278/home_page_thumb.jpeg?1665172671"
                                                        alt=""
                                                    />
                                                    <div
                                                        data-tooltip="data-tooltip"
                                                        title="Bid quick! Closing soon."
                                                        className="item-time-flag"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="catalog-item-info">
                                                    <span className="title">
                                                        Enjoy a Round of Golf at the Bethpage Black Course with JetBlue
                                                        Executives in NY with 2 JetBlue Roundtrip Travel Certificates
                                                    </span>
                                                    <span className="price">Giá hiện tại: 3,750 đ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="row hp-pagination">
                                <div className="medium-6 small-centered columns">
                                    <div
                                        className="pagination"
                                        data-view="more-lots-button"
                                        style={{ display: 'none' }}
                                    >
                                        <a className="more-items animated pulse" rel="next" href>
                                            <span className="loading-appended-items">
                                                <i className="icon-spin icon-spinner">&nbsp;</i>
                                            </span>
                                            <span className="more-items-count" />
                                            More Lots
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="double-br">
                                <br />
                                <br />
                            </div>
                            <div className="clearfix" />
                        </div>
                        <div id="popular-lots-title" style={{}}>
                            <h2>MỘT SỐ PHIÊN ĐẤU GIÁ NỔI TIẾNG</h2>
                        </div>
                        <div className="lots-wrapper">
                            <div className="loading-signal">
                                <i className="icon-spin icon-spinner">&nbsp;</i>
                            </div>
                            <div
                                id="display-popular-lots"
                                className="template-wrapper grid-x grid-margin-x"
                                data-view="popular-lots"
                            >
                                <div className="individual-item-view cell medium-3">
                                    <div className="item" id={2522802}>
                                        <a
                                            href="/catalog_items/auction-3-night-stay-at-marriott-beach-resort-in-2522802"
                                            id="item-link-2522802"
                                        >
                                            <div className="item-wrapper">
                                                <div className="catalog-item-image">
                                                    <img
                                                        src="https://d2rbybg5ibx87t.cloudfront.net/images/662745/home_page_thumb.jpeg?1664917125"
                                                        alt=""
                                                    />
                                                    <div
                                                        data-tooltip="data-tooltip"
                                                        title="Bid quick! Closing soon."
                                                        className="item-time-flag"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="catalog-item-info">
                                                    <span className="title">
                                                        3 Night Stay at Marriott Beach Resort in Curacao with 2 JetBlue
                                                        Roundtrip Travel Certificates
                                                    </span>
                                                    <span className="price">Giá hiện tại: 3,255 đ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="individual-item-view cell medium-3">
                                    <div className="item" id={2535000}>
                                        <a
                                            href="/catalog_items/auction-2-vip-ufc-281-tickets-in-dana-whites-personal-2535000"
                                            id="item-link-2535000"
                                        >
                                            <div className="item-wrapper">
                                                <div className="catalog-item-image">
                                                    <img
                                                        src="https://d2rbybg5ibx87t.cloudfront.net/images/663076/home_page_thumb.png?1664985962"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="catalog-item-info">
                                                    <span className="title">
                                                        2 VIP UFC 281 Tickets in Dana White’s Personal VIP Section on
                                                        Nov 12 in NY
                                                    </span>
                                                    <span className="price">Giá hiện tại: 5,750 đ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="individual-item-view cell medium-3">
                                    <div className="item" id={2522829}>
                                        <a
                                            href="/catalog_items/auction-one-year-of-jetblue-mosaic-status-with-2-2522829"
                                            id="item-link-2522829"
                                        >
                                            <div className="item-wrapper">
                                                <div className="catalog-item-image">
                                                    <img
                                                        src="https://d2rbybg5ibx87t.cloudfront.net/images/663367/home_page_thumb.jpeg?1664998772"
                                                        alt=""
                                                    />
                                                    <div
                                                        data-tooltip="data-tooltip"
                                                        title="Bid quick! Closing soon."
                                                        className="item-time-flag"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="catalog-item-info">
                                                    <span className="title">
                                                        One Year of JetBlue Mosaic Status with 2 JetBlue Roundtrip
                                                        Travel Certificates
                                                    </span>
                                                    <span className="price">Giá hiện tại: 3,850 đ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="individual-item-view cell medium-3">
                                    <div className="item" id={2536514}>
                                        <a
                                            href="/catalog_items/auction-billy-gibbons-of-zz-top-signed-gibson-sg-guitar-2536514"
                                            id="item-link-2536514"
                                        >
                                            <div className="item-wrapper">
                                                <div className="catalog-item-image">
                                                    <img
                                                        src="https://d2rbybg5ibx87t.cloudfront.net/images/664476/home_page_thumb.jpeg?1665506547"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="catalog-item-info">
                                                    <span className="title">
                                                        Billy Gibbons of ZZ Top Signed Gibson SG Guitar
                                                    </span>
                                                    <span className="price">Giá hiện tại: 4,350 đ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="row hp-pagination">
                                <div className="medium-6 small-centered columns">
                                    <div
                                        className="pagination"
                                        data-view="more-lots-button"
                                        style={{ display: 'none' }}
                                    >
                                        <a className="more-items animated pulse" rel="next" href>
                                            <span className="loading-appended-items">
                                                <i className="icon-spin icon-spinner">&nbsp;</i>
                                            </span>
                                            <span className="more-items-count" />
                                            More Lots
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="double-br">
                                <br />
                                <br />
                            </div>
                            <div className="clearfix" />
                        </div>
                        <div id="bestdeal-lots-title" style={{ display: 'none' }}>
                            <h2>PEOPLE WHO LIKED THIS LOT ALSO LIKED</h2>
                        </div>
                        <div className="lots-wrapper">
                            <div className="loading-signal">
                                <i className="icon-spin icon-spinner">&nbsp;</i>
                            </div>
                            <div
                                id="display-bestdeal-lots"
                                className="template-wrapper grid-x grid-margin-x"
                                data-view="bestdeal-lots"
                                style={{ display: 'none' }}
                            ></div>
                            <div className="row hp-pagination">
                                <div className="medium-6 small-centered columns">
                                    <div
                                        className="pagination"
                                        data-view="more-lots-button"
                                        style={{ display: 'none' }}
                                    >
                                        <a className="more-items animated pulse" rel="next" href>
                                            <span className="loading-appended-items">
                                                <i className="icon-spin icon-spinner">&nbsp;</i>
                                            </span>
                                            <span className="more-items-count" />
                                            More Lots
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="double-br">
                                <br />
                                <br />
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContentAuctionDetail;
