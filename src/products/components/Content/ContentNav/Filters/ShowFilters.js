import React, { useEffect } from "react";
import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getAllCategories, searchTextSelector, productsRemainingCategorySelector, getTypeFiltersChange } from './../../../../redux/selector';
import { setResultsFilterChange, searchFilterChange, typeFiltersChange, setSearchingFilters, categoryFiltersChange } from './../../../../redux/actions';

const { Search } = Input;


const ShowFilters = () => {
    const dispatch = useDispatch();
    const handleCloseFilters = () => {
        document.getElementById('mySidenav').style.width = '0';
    };

    const searchText = useSelector(searchTextSelector);
    const type = useSelector(getTypeFiltersChange);

    const handleSearchTextChange = (e) => {
        dispatch(searchFilterChange(e.target.value));
    };

    const handleTypeChange = (e) => {
        dispatch(typeFiltersChange(e.target.value));
    };

    const handleCategoryChange = (value) => {
        dispatch(categoryFiltersChange(value));
    };

    const results = useSelector(productsRemainingCategorySelector);

    useEffect(() => {
        dispatch(setResultsFilterChange(results));
        dispatch(setSearchingFilters(true));
    }, [searchText, type])

    const categories = useSelector(getAllCategories);

    const colorCategories = ['blue', 'red', 'green', 'yellow']

    var color = colorCategories[Math.floor(Math.random() * colorCategories.length)];


    return (
        <div id="mySidenav" className="sidenav">
            <a href="#" className="closebtn">
                <i className="fa-regular fa-circle-xmark" onClick={handleCloseFilters}></i>
            </a>

            <Row justify='center' style={{ margin: 30 }}>
                <Col span={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                    >
                        Tìm kiếm
                    </Typography.Paragraph>
                    <Search placeholder='Tìm kiếm theo tên sản phẩm' onChange={handleSearchTextChange} />
                </Col>
                <Col sm={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                    >
                        Loại sản phẩm
                    </Typography.Paragraph>
                    <Radio.Group onChange={handleTypeChange}>
                        <Radio value='Tất cả'>Tất cả</Radio>
                        <Radio value='Đấu giá'>Đấu giá</Radio>
                        <Radio value='Cửa hàng'>Cửa hàng</Radio>
                    </Radio.Group>
                </Col>
                <Col sm={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                    >
                        Danh mục
                    </Typography.Paragraph>
                    <Select
                        mode='multiple'
                        allowClear
                        placeholder='Nhấn để chọn'
                        style={{ width: '100%' }}
                        onChange={handleCategoryChange}
                    >
                        {categories.map(category => (
                            <Select.Option key={category.id} value={category.title} label={category.title}>
                                <Tag color={color}>{category.title}</Tag>
                            </Select.Option>
                        ))}

                    </Select>
                </Col>
            </Row>
        </div>
    );
}

export default ShowFilters;