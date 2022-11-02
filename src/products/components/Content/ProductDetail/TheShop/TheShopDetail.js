import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from './../../../../service/Product/ProductService';
import LoadData from '../../../Loading/LoadData';
import { Carousel } from '../../../../Hooks/Hooks';
import BuyComponent from './BuyComponent';

function TheShopDetail() {
    const productSlug = useParams();

    console.log("productSlug", productSlug);
    const [theShop, setTheShop] = useState({
        product: {},
        productMedias: [],
        loading: true,
    });

    useEffect(() => {
        try {
            console.log('aaa');
            setTheShop({ ...theShop, loading: true });
            async function getData() {
                let productRes = await ProductService.getProductBySlug(productSlug.slug);
                let productMediasRes = await ProductService.getAllMediaByProductId(productRes.data.id);


                setTheShop({
                    ...theShop,
                    product: productRes.data,
                    productMedias: productMediasRes.data,
                    loading: false,
                });
            }
            getData();
        } catch (error) {}
    }, []);

    const { product, productMedias, loading } = theShop;
    let max_visibility = theShop.productMedias.length;
    return (
        <div className="pages" id="productTheShop" style={{ marginTop: '160px' }}>
            {loading ? (
                <LoadData />
            ) : (
                <div id="lot-body">
                    <div className="grid-x grid-margin-x" id="lot-page-redesign-2">
                        <div className="medium-7 medium-large-8 cell left-col">
                            <div className="lot-page-left">
                                <div className="lot-title">
                                    <h2>{theShop.product.title}</h2>
                                </div>
                                <div className="lot-image-showcase">
                                    <div className="slide-image">
                                        <Carousel maxVisibility={max_visibility}>
                                            {productMedias.map((media, i) => (
                                                <img key={i} src={media.fileUrl} alt="" />
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="lot-detail">
                                    <div className="lot-tabs">
                                        <div className="lot-tab-item" tab="lot-overview">
                                            Tổng quan
                                        </div>
                                        <div className="lot-tab-item" tab="lot-rules">
                                            Điều kiện bán hàng
                                        </div>
                                        <div className="lot-tab-item" tab="lot-shipping">
                                            Giao hàng &amp; Đổi trả
                                        </div>
                                    </div>
                                    <div className="lot-content">
                                        <div className="item lot-overview active">
                                            <div className="lot-donator">Thông tin sản phẩm:</div>
                                            <div className="lot-description">
                                                <p>{product.description}</p>
                                            </div>
                                            <hr style={{ borderWidth: '1px' }} />
                                            <div className="new-terms-wrapper">
                                                <div className="new-term-item">
                                                    <div className="new-terms-detail">
                                                        <div className="new-terms-title">Đánh giá</div>
                                                        <div className="new-terms-content col-12">
                                                            <ul>
                                                                <li
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                    }}
                                                                >
                                                                    <div className="fw-bold">Trung Trần: </div>
                                                                    <div> &nbsp; Được đỏ</div>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                    }}
                                                                >
                                                                    <div className="fw-bold">Phong Trần: </div>
                                                                    <div>Ok</div>
                                                                </li>
                                                                <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                                    <div className='fw-bold'>Phước Mai: </div>

                                                                    <div>Ok</div>
                                                                </li>
                                                                <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                                    <div className='fw-bold'>Hằng Đinh: </div>

                                                                    <div>Xịn</div>
                                                                </li>
                                                            </ul>
                                                            {/* <hr className="desktop" /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr style={{ borderWidth: '1px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <BuyComponent product={product} />
                        {/* Them component BUY */}
                    </div>

                    {/* more */}
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
                                        <a id="item-link-2522803">
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
                                        <a id="item-link-2522810">
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
                                        <a id="item-link-2522812">
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
                                        <a id="item-link-2522827">
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
                                        <a className="more-items animated pulse" rel="next">
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
                                        <a id="item-link-2522802">
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
                                        <a id="item-link-2535000">
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
                                        <a id="item-link-2522829">
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
                                        <a id="item-link-2536514">
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
                                        <a className="more-items animated pulse" rel="next">
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
                                        <a className="more-items animated pulse" rel="next">
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

export default TheShopDetail;
