import React, { useState, useEffect, useRef } from 'react';
import StarRating from './StarRating';
import './Review.css';
import ReviewService from './../../../../service/Reviews/ReviewService';
import { compareValues } from './../../../../Hooks/Hooks';
import { Rating } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getAccount } from '../../../../redux/selector';
import { useSelector } from 'react-redux';
import { setRating } from './../../../../redux/actions';

let flag = false;
function ReviewsProductShop({ product }) {
    const [state, setState] = useState({
        loading: false,
        errorMessage: '',
        reviews: [],
    });

    const account = useSelector(getAccount);

    const [rating, setRating] = useState(0);

    const [reloadReview, setReloadReview] = useState(false);

    const [submitFrm, setSubmitFrm] = useState({
        vote: '',
        review: '',
        account: account,
        product: product,
    });
    const handleSetRating = (int) => {
        setRating(int);
    };
    console.log('account: ', submitFrm.account);

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let review = await ReviewService.getAllReviews();
                setState({
                    ...state,
                    reviews: review.data,
                    loading: false,
                });
                console.log('goi lai');
            }
            getData();
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message,
            });
        }
    }, [reloadReview]);
    useEffect(() => {
        if (flag) {
            try {
                console.log('form: ', submitFrm);
                async function postData() {
                    await ReviewService.addReview(submitFrm);
                    // let review = await ReviewService.getAllReviews();
                    // setReloadReview(!reloadReview);
                    // setState({
                    //     ...state,
                    //     reviews: review.data,
                    //     loading: false,
                    // });
                    setReloadReview(!reloadReview);
                    setState({ ...state, loading: false });
                }
                postData();
                flag = false;
            } catch (error) {
                console.log('error: ', error);
            }
        }
    }, [submitFrm]);
    const { loading, reviews, errorMessage } = state;

    useEffect(() => {
        setSubmitFrm({
            ...submitFrm,
            vote: rating,
            //  review
        });
    }, [rating]);

    const handleReset = () => {
        formik.handleReset();
    };

    const formik = useFormik({
        initialValues: {
            vote: '',
            review: '',
            account: account,
            product: product,
        },
        validationSchema: yup.object({
            review: yup
                .string()
                .min(5, 'Đánh giá tối thiểu là 5 kí tự!')
                .max(200, 'Đánh giá loại tối đa là 20 kí tự!')
                .required('Đánh giá không được để trống!'),
        }),

        onSubmit: (product) => {
            console.log('submitFrm: ', submitFrm);
            setSubmitFrm({ ...product, vote: rating });
            handleReset();
            flag = true;
        },
    });
    return (
        <>
            <div className="col-12">
                <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    <div className="new-terms-title">
                        ĐÁNH GIÁ SẢN PHẨM: (Chọn mức độ):
                        <StarRating setNewRating={handleSetRating} />
                        <div className="new-terms-content col-12">
                            <ul>
                                {formik.errors.review && formik.touched.review && (
                                    <li className="error">{formik.errors.review}</li>
                                )}
                            </ul>
                            <textarea
                                value={formik.values.review}
                                onChange={formik.handleChange}
                                type="text"
                                placeholder="Nhập đánh giá của bạn"
                                name="review"
                                id="addReview"
                                cols="60"
                                rows="3"
                            ></textarea>
                            <button className="btn btn-primary" type="submit">
                                Gửi
                            </button>
                        </div>
                    </div>
                </form>
                <hr style={{ height: '5px', backgroundColor: 'black' }} />
            </div>
            {reviews.sort(compareValues('id', 'desc')).map((review) => (
                <div className="" key={review.id}>
                    {review.product.id === product.id ? (
                        <p>
                            <div>
                                {review.account.avatar} {review.account.username}{' '}
                            </div>
                            <Rating disabled name="simple-controlled" value={review.vote} />
                            <div>
                                {review.review} {review.createdAt}
                            </div>
                        </p>
                    ) : null}
                </div>
            ))}
        </>
    );
}

export default ReviewsProductShop;
