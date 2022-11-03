import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProductMediaService from '../../../services/ProductImageService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Swal from 'sweetalert2';
import ProductService from '../../../services/productService';

function ModalDetailProduct(props) {
    const { showModal, idProduct, handleCloseModeration } = props;
    const [product, setProduct] = useState([]);
    const [imageProduct, setImageProduct] = useState([
        {
            id: 0,
            fileUrl: '',
        },
    ]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    // console.log('imageProduct: ', imageProduct);

    useEffect(() => {
        if (showModal) {
            try {
                async function getImage() {
                    let imageData = await ProductMediaService.getListMedia(idProduct);
                    setImageProduct(imageData.data);
                    console.log('imageData.data: ', imageData.data);
                    let pro = await ProductService.ProductById(idProduct);
                    setProduct(pro.data);
                }
                getImage();
            } catch (error) {
                console.log(error);
            }
        }
    }, [showModal]);

    const notify = () =>
        Swal.fire({
            title: 'Bạn chắc không?',
            text: 'Bạn sẽ không hoàn tác lại!',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi muốn duyệt',
        }).then((result) => {
            if (result.isConfirmed) {
                async function getModeration() {
                    let moderation = await ProductService.ModerationProduct(idProduct);
                    console.log('moderation.data: ', moderation.data);
                }
                getModeration();
                Swal.fire('<br/> Đã kiểm duyệt!', 'Bạn đã kiểm duyệt sản phẩm này.', 'Thành công!').then(() =>
                    handleCloseModeration(),
                );
            }
        });

    return (
        <Modal show={showModal} onHide={handleCloseModeration} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {product === [] ? (
                    ''
                ) : (
                    <div className="row g-0">
                        {/* image */}
                        <div className="col-md-4 ">
                            <Slider {...settings}>
                                {imageProduct.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.fileUrl}
                                        className="img-fluid rounded-start"
                                        alt="Ảnh sản phẩm"
                                    />
                                ))}
                            </Slider>
                        </div>

                        <div className="col-md-7 ml-5">
                            <div className="row">
                                <h5 className="col-sm-4">Title:</h5>
                                <p className="col-sm-8">{product.title}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Ngày Tạo:</h5>
                                <p className="col-sm-8">{product.createdAt}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Người tạo:</h5>
                                <p className="col-sm-8">{product.createdBy}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Ngày Sửa Đổi Gần Nhất</h5>
                                <p className="col-sm-8">{product.updateAt}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Người Sửa Đổi:</h5>
                                <p className="col-sm-8">{product.updateBy}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Đấu Giá / Bán</h5>
                                <p className="col-sm-8">{product.action ? 'Đấu Giá' : 'Bán'}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Số Lượng Còn Lại</h5>
                                <p className="col-sm-8">{product.available}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Đã Kiểm Duyệt:</h5>
                                <p className="col-sm-8">{product.moderation ? 'Đã kiểm duyệt' : 'Chưa kiểm duyệt'}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Giá:</h5>
                                <p className="col-sm-8">{product.price}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Đã bán:</h5>
                                <p className="col-sm-8">{product.sold}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Thể Loại:</h5>
                                <p className="col-sm-8">{product.category && product.category.title}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-4">Mô tả:</h5>
                                <p className="col-sm-8">{product.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={notify}>
                    Kiểm duyệt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetailProduct;
