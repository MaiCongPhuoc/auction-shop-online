import React, { useEffect } from "react";
import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getAllCategories, searchTextSelector, getTypeFiltersChange, productsRemainingSortSelector, getSortFiltersChange } from './../../../../redux/selector';
import { setResultsFilterChange, searchFilterChange, typeFiltersChange, setSearchingFilters, categoryFiltersChange, sortFiltersChange } from './../../../../redux/actions';

const { Search } = Input;


const ShowFilters = () => {
    const dispatch = useDispatch();
    const handleCloseFilters = () => {
        document.getElementById('mySidenav').style.width = '0';
    };

    const searchText = useSelector(searchTextSelector);
    const type = useSelector(getTypeFiltersChange);
    const sort = useSelector(getSortFiltersChange);

   

    const handleSearchTextChange = (e) => {
        dispatch(searchFilterChange(e.target.value));
    };

    const handleTypeChange = (e) => {
        dispatch(typeFiltersChange(e.target.value));
    };

    const handleSortByPrice = (e) => {
        dispatch(sortFiltersChange(e.target.value));
    };

    const handleCategoryChange = (value) => {
        dispatch(categoryFiltersChange(value));
    };

    const results = useSelector(productsRemainingSortSelector);

    useEffect(() => {
        dispatch(setResultsFilterChange(results));
        dispatch(setSearchingFilters(true));
    }, [searchText, type, sort])

    const categories = useSelector(getAllCategories);

    const colorCategories = ['blue', 'red', 'green', 'yellow']

    var color = colorCategories[Math.floor(Math.random() * colorCategories.length)];


    return (
        <div id="mySidenav" className="sidenav">
            <a href="#" className="closebtn">
                <i style={{fontSize: 'inherit'}} className="fa-regular fa-circle-xmark" onClick={handleCloseFilters}></i>
            </a>

            <Row justify='center' style={{ margin: 30 }}>
                <Col span={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                    >
                        T??m ki???m
                    </Typography.Paragraph>
                    <Search placeholder='T??m ki???m theo t??n s???n ph???m' onChange={handleSearchTextChange} />
                </Col>
                <Col sm={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                    >
                        Lo???i s???n ph???m
                    </Typography.Paragraph>
                    <Radio.Group onChange={handleTypeChange}>
                        <Radio value='T???t c???'>T???t c???</Radio>
                        <Radio value='?????u gi??'>?????u gi??</Radio>
                        <Radio value='C???a h??ng'>C???a h??ng</Radio>
                    </Radio.Group>
                </Col>
                <Col sm={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                    >
                        Danh m???c
                    </Typography.Paragraph>
                    <Select
                        mode='multiple'
                        allowClear
                        placeholder='Nh???n ????? ch???n'
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