import React from 'react';
import { Provider } from 'react-redux';
import store from '../products/redux/store';
import Header from '../products/components/Header/Header';
import './asset/css/contact.css';
const Contact = () => {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <div className="contact-user">
                <div className="mt-4">
                    <h3 className="text-center align-items-center animate-charcter">
                        Chào mừng bạn đã ghé thăm Auctions Shop <br />
                        <br />
                        Chúng tôi rất vui khi nghe ý kiến đóng góp của bạn!
                    </h3>
                </div>
                <section id="contact-detail" className="row px-4">
                    <div className="details col-sm-12 col-md-6 col-lg-6">
                        <h2 style={{ textAlign: 'center' }}>Liên Hệ Với Chúng Tôi</h2>
                        <h3 style={{ textAlign: 'center' }}>Trụ Sở Chính</h3>
                        <div>
                            <li>
                                <i className="fa-solid fa-map-location-dot"></i>
                                <p>Trung tâm Auctions Shop Online tại 28 Nguyễn Tri Phương, phường Phú Hội</p>
                            </li>
                            <li>
                                <i className="fa-solid fa-envelope"></i>
                                <a href="https://gmail.google.com">auctionshophptp@gmail.com</a>
                            </li>
                            <li>
                                <i className="fa-solid fa-phone-alt"></i>
                                <p>0987654321 - 0123456789</p>
                            </li>
                            <li>
                                <i className="fa-solid fa-clock"></i>
                                <p>Thứ 2 đến Thứ 6: 08:00 - 18:00</p>
                            </li>
                        </div>
                    </div>

                    <div className="map col-sm-12 col-md-6 col-lg-6">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.216661395802!2d107.59015174962272!3d16.46456338858195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a13c00686347%3A0x312e8ccbe67acf98!2zMjggTmd1eeG7hW4gVHJpIFBoxrDGoW5nLCBQaMO6IEjhu5lpLCBUaMOgbmggcGjhu5EgSHXhur8sIFRo4burYSBUaGnDqm4gSHXhur8sIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1667474207417!5m2!1svi!2s"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="map"
                        ></iframe>
                    </div>
                </section>
            </div>
        </Provider>
    );
};

export default Contact;
