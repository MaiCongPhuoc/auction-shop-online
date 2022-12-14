import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CategoryService from '../../../services/Category';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import FileService from '../../../services/FileService';
import '../../modal.css';
import 'react-toastify/dist/ReactToastify.css';
import ProductService from '../../../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, getShowAddProduct } from '../../../../products/redux/selector';
import { setShowAddProduct } from '../../../../products/redux/actions';
let flag = false;
let listImg = ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'];

function ModalAddProduct() {
    const account = useSelector(getAccount);
    const dispatch = useDispatch();
    const [category, setCategory] = useState({
        loading: false,
        categorys: [],
        errorMessage: '',
    });

    const [stateImg, setStateImg] = useState(false);

    const [radio, setRadio] = useState(false);
    const [submitFrm, setSubmitFrm] = useState({
        action: true,
        available: 0,
        image: '',
        moderation: false,
        price: 0,
        estimatePrice: 0,
        slug: '',
        sold: 0,
        title: '',
        viewed: 0,
        category: {
            id: 0,
        },
        description: '',
        images: [],
    });

    const handleUpload = (e) => {
        listImg.shift();
        async function uploadAvatar() {
            for (let i = 0; i < e.target.files.length; i++) {
                setStateImg(true);
                let uploadResult = await FileService.Upload(e.target.files[i]);
                listImg.push(uploadResult.data.url);
            }
            setTimeout(() => {
                setStateImg(false);
            }, 1000 * 2);
        }
        uploadAvatar();
    };

    useEffect(() => {
        try {
            setCategory({ ...category, loading: true });
            async function getCate() {
                let category = await CategoryService.getCategory();
                setCategory({ ...categorys, categorys: category.data, loading: false });
            }
            getCate();
        } catch (error) {
            setCategory({ ...categorys, errorMessage: error.message, loading: false });
        }
    }, []);

    useEffect(() => {
        if (flag) {
            try {
                listImg.reverse();
                async function postData(submitFrm) {
                    setCategory({ ...category, loading: true });
                    await ProductService.AddProduct(submitFrm);
                }
                postData(submitFrm);
                setCategory({ ...category, loading: false });
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);
    const handleCloseAddProduct = () => {
        dispatch(setShowAddProduct(false));
        document.querySelector('#image').value = '';
        listImg = ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'];
        formik.handleReset();
    };

    const handleResetFrom = () => {
        document.querySelector('#image').value = '';
        listImg = ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'];
        formik.handleReset();
    };
    const formik = useFormik({
        initialValues: {
            action: radio,
            available: 1,
            image: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg',
            moderation: true,
            price: 0,
            estimatePrice: 0,
            slug: '',
            sold: 0,
            title: '',
            viewed: 0,
            category: {
                id: 0,
            },
            description: '',
            countday: '0',
            cheatMoney: 0,
            images: ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'],
            createdBy: '',
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .min(5, 'T??n s???n ph???m t???i thi???u l?? 5 k?? t???!')
                .max(25, 'T??n s???n ph???m t???i ??a l?? 25 k?? t???!')
                .required('B???n ph???i nh???p t??n s???n ph???m v??o!'),
            price: yup
                .number('Vui l??ng nh???p s???!')
                .required('Vui l??ng nh???p gi??!')
                .moreThan(99999, 'S???n ph???m c?? gi?? nh??? nh???t l??: 100.000 ??'),
            estimatePrice: yup.number('Vui l??ng nh???p s???!'),
            available: radio
                ? null
                : yup
                      .number('Vui l??ng nh???p s???!')
                      .required('Vui l??ng nh???p s??? l?????ng!')
                      .moreThan(1, 'S??? l?????ng s???n ph???m nh??? nh???t l?? 1')
                      .lessThan(199, 'S??? l?????ng l???n nh???t l?? 200'),
            action: yup.string(),
            image: yup.mixed(),
            description: yup.string(),
            cheatMoney: yup
                .number()
                .required('vui l??ng nh???p ti???n qu???')
                .moreThan(499999, 'Ti???n qu??? nh??? nh???t l?? 500.000'),
        }),
        onSubmit: (product) => {
            product.createdBy = account.email;
            if (radio) {
                product.action = radio;
                product.available = 1;
                listImg.reverse();
                product.image = listImg[0];
                product.images = listImg;
                flag = true;
                product.category.id = Number(document.querySelector('#category').value);
                product.estimatePrice = document.querySelector('#estimatePrice').value;
                product.estimatePrice = document.querySelector('#countday').value;
                setSubmitFrm(product);
                handleResetFrom();
            } else {
                product.action = radio;
                listImg.reverse();
                product.image = listImg[0];
                product.images = listImg;
                flag = true;
                product.category.id = Number(document.querySelector('#category').value);
                setSubmitFrm(product);
                handleResetFrom();
            }
        },
    });

    const { loading, categorys } = category;
    const showAddProduct = useSelector(getShowAddProduct);
    return (
        <Modal show={showAddProduct} onHide={handleCloseAddProduct} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Th??m m???i s???n ph???m</Modal.Title>
            </Modal.Header>
            {loading ? (
                <span className="spinner-border text-warning"></span>
            ) : (
                <form multiple="multiple" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    <Modal.Body>
                        <div className="frmError">
                            <ul>
                                {formik.errors.title && formik.touched.title && (
                                    <li className="error">{formik.errors.title}</li>
                                )}
                                {formik.errors.price && formik.touched.price && (
                                    <li className="error">{formik.errors.price}</li>
                                )}
                                {formik.errors.available && formik.touched.available && (
                                    <li className="error">{formik.errors.available}</li>
                                )}
                                {formik.errors.category && formik.touched.category && (
                                    <li className="error">{formik.errors.category}</li>
                                )}
                                {formik.errors.image && formik.touched.image && (
                                    <li className="error">{formik.errors.image}</li>
                                )}
                                {formik.errors.estimatePrice && formik.touched.estimatePrice && (
                                    <li className="error">{formik.errors.estimatePrice}</li>
                                )}
                                {formik.errors.cheatMoney && formik.touched.cheatMoney && (
                                    <li className="error">{formik.errors.cheatMoney}</li>
                                )}
                            </ul>
                        </div>
                        <div className="modal-body">
                            {radio ? (
                                <div className="row">
                                    <div className="col-6 d-flex">
                                        <div className="col-6">
                                            <label
                                                htmlFor="addTitle"
                                                className="form-label text-dark font-weight-bold ml-2"
                                            >
                                                T??n s???n ph???m
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                id="addTitle"
                                                placeholder="Vui l??ng nh???p t??n s???n ph???m..."
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label
                                                htmlFor="addPrice"
                                                className="form-label text-dark font-weight-bold ml-2"
                                            >
                                                Gi?? kh???i ??i???m:
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                id="addPrice"
                                                placeholder="Vui l??ng nh???p gi??..."
                                                value={formik.values.price}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <div className="col-6">
                                            <label
                                                htmlFor="addTitle"
                                                className="form-label text-dark font-weight-bold ml-2"
                                            >
                                                Gi?? ?????c t??nh:
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="estimatePrice"
                                                id="estimatePrice"
                                                placeholder="Vui l??ng nh???p gi?? ?????c t??nh..."
                                                value={formik.values.estimatePrice}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label
                                                htmlFor="addPrice"
                                                className="form-label text-dark font-weight-bold ml-2"
                                            >
                                                Ng??y k???t th??c:
                                            </label>
                                            <select
                                                className="form-select select select-bg-ori"
                                                id="countday"
                                                name="countday"
                                                value={formik.values.countday}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="1" key="1">
                                                    1
                                                </option>
                                                <option value="2" key="2">
                                                    2
                                                </option>
                                                <option value="3" key="3">
                                                    3
                                                </option>
                                                <option value="4" key="4">
                                                    4
                                                </option>
                                                <option value="5" key="5">
                                                    5
                                                </option>
                                                <option value="6" key="6">
                                                    6
                                                </option>
                                                <option value="7" key="7">
                                                    7
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-6">
                                        <label
                                            htmlFor="addTitle"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            T??n s???n ph???m
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            id="addTitle"
                                            placeholder="Vui l??ng nh???p t??n s???n ph???m..."
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label
                                            htmlFor="addPrice"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Gi??
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            id="addPrice"
                                            placeholder="Vui l??ng nh???p gi??..."
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                            )}
                            {/* </div> */}
                            <div className="row">
                                {radio ? (
                                    <div className="mb-3 col-4">
                                        <input
                                            type="hidden"
                                            className="form-control"
                                            value={5}
                                            onChange={formik.handleChange}
                                            name="available"
                                            id="addAvailable"
                                            placeholder="Vui l??ng nh???p s??? l?????ng..."
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-3 col-4">
                                        <label
                                            htmlFor="addAvailable"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            S??? L?????ng
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formik.values.available}
                                            onChange={formik.handleChange}
                                            name="available"
                                            id="addAvailable"
                                            placeholder="Vui l??ng nh???p s??? l?????ng..."
                                        />
                                    </div>
                                )}
                                <div className="form-check form-switch mb-3 col-4">
                                    <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                        B??y b??n/?????u gi??
                                    </label>
                                    <div className="form-check">
                                        <label className="form-check-label" htmlfor="flexRadioDefault1">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="action"
                                                {...(radio && 'checked')}
                                                id="flexRadioDefault1"
                                                value={true}
                                                onClick={() => setRadio(true)}
                                            />
                                            ?????u gi??
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label" htmlfor="flexRadioDefault2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="action"
                                                {...(radio && 'checked')}
                                                // onInput={handleChange}
                                                id="flexRadioDefault2"
                                                value={false}
                                                onClick={() => setRadio(false)}
                                            />
                                            B??n
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3 col-4">
                                    <label
                                        htmlFor="addCateglory"
                                        className="form-label text-dark font-weight-bold ml-2"
                                    >
                                        Th??? lo???i
                                    </label>
                                    <select
                                        className="form-select select select-bg-ori"
                                        id="category"
                                        name="category.id"
                                        value={formik.values.category.id}
                                        onChange={formik.handleChange}
                                    >
                                        <option value={0} key={0} defaultChecked disabled>
                                            Ch???n
                                        </option>
                                        {categorys.map((category) => (
                                            <option value={category.id} key={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                        ???nh{' '}
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple="multiple"
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        placeholder="Vui l??ng ch???n file..."
                                        onInput={handleUpload}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="cheatMoney" className="form-label text-dark font-weight-bold ml-2">
                                        Ti???n qu???:
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formik.values.cheatMoney}
                                        onChange={formik.handleChange}
                                        name="cheatMoney"
                                        id="cheatMoney"
                                        placeholder="Vui l??ng nh???p s??? l?????ng..."
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="row d-flex justify-content-around">
                                    {listImg.map((image, index) => (
                                        <div className="col-3 imgAdd" key={index} style={{ height: '200px' }}>
                                            <img
                                                src={image}
                                                alt=""
                                                onClick={() => document.querySelector('#image').click()}
                                                className="imgproduct"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-12">
                                    <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                        M?? t???
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="3"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="reset" variant="secondary w-auto" className="" onClick={handleCloseAddProduct}>
                            ????ng
                        </Button>
                        {stateImg ? (
                            <Button type="submit" className="btn btn-primary">
                                <span className="spinner-border text-info"></span>
                            </Button>
                        ) : (
                            <Button type="submit" className="btn btn-primary">
                                Th??m
                            </Button>
                        )}
                        <ToastContainer autoClose={1500} />
                    </Modal.Footer>
                </form>
            )}
        </Modal>
    );
}

export default ModalAddProduct;
