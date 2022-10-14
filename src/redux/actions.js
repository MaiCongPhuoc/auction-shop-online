const addProduct = (data) => {
    return {
        type: 'products/addproduct',
        payload: data
    }
}
export default addProduct;