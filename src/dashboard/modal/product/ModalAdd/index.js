import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CategoryService from '../../../services/category';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ProductService from '../../../services/productService';
import FileService from '../../../services/FileService';
import ProductMediaService from '../../../services/productImageService';
let flag = false;
let listImg = ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'];

function ModalAddProduct(props) {
    const { show, handleClose } = props;
    const [category, setCategory] = useState({
        loading: false,
        categorys: [],
        errorMessage: '',
    });

    const [stateImg, setStateImg] = useState(false);

    const [radio, setRadio] = useState(true);
    const [submitFrm, setSubmitFrm] = useState({
        action: true,
        available: 0,
        image: '',
        moderation: false,
        price: 0,
        slug: '',
        sold: 0,
        title: '',
        viewed: 0,
        category: {
            id: 0,
        },
        description: '',
    });

    //upload multi image cloudinary
    const handleUpload = (e) => {
        listImg.shift();
        async function uploadAvatar() {
            for (let i = 0; i < e.target.files.length; i++) {
                setStateImg(true);
                let uploadResult = await FileService.Upload(e.target.files[i]);
                listImg.push(uploadResult.data.url);
                setStateImg(false);
            }
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
                async function postData(submitFrm) {
                    setCategory({ ...category, loading: true });
                    let result = await ProductService.AddProduct(submitFrm);
                    listImg.reverse();
                    async function saveAvatar() {
                        for (let i = 0; i < listImg.length; i++) {
                            let img = {
                                id: 0,
                                fileUrl: listImg[i],
                            };
                            await ProductMediaService.AddMedia(img);
                            
                        }
                        listImg = []
                    }
                    saveAvatar();
                }
                postData(submitFrm);
                setCategory({ ...category, loading: false });
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);
    // Validate from add
    const handleReset = () => {
        document.querySelector('#image').value = '';
        formik.handleReset();
    };

    const formik = useFormik({
        initialValues: {
            action: true,
            available: 0,
            image: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg',
            moderation: false,
            price: 0,
            slug: '',
            sold: 0,
            title: '',
            viewed: 0,
            category: {
                id: 0,
            },
            description: '',
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .min(5, 'tên sản phẩm nhỏ nhất là 5 kí tự!')
                .max(25, 'tên sản phẩm nhỏ nhất là 25 kí tự!')
                .required('Bạn phải nhập tên sản phẩm vào!'),
            price: yup
                .number('Vui lòng nhập số!')
                .min(10000, 'Vui lòng nhập giá trên 10000 VNĐ!')
                .max(999900000, 'Vui lòng nhập giá dưới 999900000 VNĐ!')
                .required('Vui lòng nhập giá!'),
            available: yup
                .number('Vui lòng nhập số!')
                .min(10, 'Số lượng nhỏ nhất là 10!')
                .max(200, 'Số lượng lớn nhất là 200!')
                .required('Vui lòng nhập số lượng!'),
            action: yup.string(),
            image: yup.mixed(),
            description: yup.string(),
        }),
        onSubmit: (product) => {
            product.action = radio;
            console.log('product add: ', product);
            flag = true;
            product.category.id = Number(document.querySelector('#category').value);
            setSubmitFrm(product);
            handleReset();
        },
    });

    const { loading, categorys, errorMessage } = category;

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Add Product</Modal.Title>
            </Modal.Header>
            {loading ? (
                <span className="spinner-border text-warning"></span>
            ) : (
                <form multiple="multiple" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    {/* <form> */}
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
                            </ul>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                        Tên sản phẩm
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        id="addTitle"
                                        placeholder="Vui lòng nhập tên sản phẩm..."
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                        Giá
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        id="addPrice"
                                        placeholder="Vui lòng nhập giá..."
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-4">
                                    <label
                                        htmlFor="addAvailable"
                                        className="form-label text-dark font-weight-bold ml-2"
                                    >
                                        Số Lượng
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formik.values.available}
                                        onChange={formik.handleChange}
                                        name="available"
                                        id="addAvailable"
                                        placeholder="Vui lòng nhập số lượng..."
                                    />
                                </div>
                                <div className="form-check form-switch mb-3 col-4">
                                    <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                        Bày bán/Đấu giá
                                    </label>
                                    <div className="form-check">
                                        <label className="form-check-label" htmlfor="flexRadioDefault1">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="action"
                                                checked
                                                id="flexRadioDefault1"
                                                value={true}
                                                onClick={() => setRadio(true)}
                                            />
                                            Bán
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label" htmlfor="flexRadioDefault2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="action"
                                                // onInput={handleChange}
                                                id="flexRadioDefault2"
                                                value={false}
                                                onClick={() => setRadio(false)}
                                            />
                                            Đấu giá
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3 col-4">
                                    <label
                                        htmlFor="addCateglory"
                                        className="form-label text-dark font-weight-bold ml-2"
                                    >
                                        Thể loại
                                    </label>
                                    <select
                                        className="form-select select"
                                        id="category"
                                        name="category.id"
                                        value={formik.values.category.id}
                                        onChange={formik.handleChange}
                                    >
                                        <option value={0} key={0} defaultChecked disabled>
                                            Chọn
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
                                <div className="mb-3 col-12">
                                    <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                        Images
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple="multiple"
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        placeholder="Vui lòng chọn file..."
                                        onInput={handleUpload}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-12">
                                    <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                        Mô tả
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
                        <Button type="reset" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {stateImg ? (
                            <Button type="submit" className="btn btn-primary">
                                <span className="spinner-border text-info"></span>
                            </Button>
                        ) : (
                            <Button type="submit" className="btn btn-primary">
                                Create
                            </Button>
                        )}
                    </Modal.Footer>
                </form>
            )}
        </Modal>
    );
}

export default ModalAddProduct;
