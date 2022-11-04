import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAccount, getReloadOrder } from "../../../redux/selector";
import Header from '../../Header/Header';
import SideBar from "./SideBar.tsx";
import ProductService from './../../../service/Product/ProductService';
import { toast, ToastContainer } from "react-toastify";
import MyProduct from "./MyProduct";
import OrdersDetailService from './../../../service/OrdersDetail/OrderDetail';
import { getMenu } from './../../../redux/selector';
import MyNotification from "./MyNotification";
import EmptyOrder from './../../Loading/EmptyOrder';
import LoadCart from "../../Loading/LoadCart";

function ShowMyShop() {
    const account = useSelector(getAccount);

    const [products, setProducts] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

    const [loading, setLoading] = useState(false);

    const menu = useSelector(getMenu);

    const reLoadOrder = useSelector(getReloadOrder);

    useEffect(() => {
        setLoading(true);
        try {
            ProductService.getProductsModeratedByCreatedBy(account.email).then((res) => {
                if (res.data.length > 0) {
                    setProducts(res.data);
                    setLoading(false);
                } else {
                    toast.warn(res.data.message);
                    setLoading(false);
                }
            }).catch((resp) => {
                toast.warn(resp.data.message);
                setLoading(false);
            });

            OrdersDetailService.getOrdersDetailByProductCreatedBy(account.email).then((res) => {
                setOrderDetails(res.data);
            }).catch((resp) => {
                toast.warn(resp.data.message);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <Header className="product-client" />
            <SideBar orderDetails={orderDetails} />
            {menu === 'myProduct' ? (
                (loading) ? <LoadCart /> : <MyProduct products={products}/>
            ) : (
                (loading) ? <LoadCart /> : <MyNotification orderDetails={orderDetails}/>
            )}
            <ToastContainer />
        </>
    );
}

export default ShowMyShop;