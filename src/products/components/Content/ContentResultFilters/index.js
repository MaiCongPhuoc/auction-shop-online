import React, { useState, useEffect } from 'react';

import Posts from './Posts';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import { productsRemainingCategorySelector } from './../../../redux/selector';

function PagingResultFilters() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const products = useSelector(productsRemainingCategorySelector);


    useEffect(() => {
        const fetchPosts = async () => {
            setPosts(products);
        };

        fetchPosts();
    }, [products]);


    const indexOfLastPost = currentPage * postsPerPage;

    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Posts products={currentPosts} />
            <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={posts.length} />
        </>
    );
}
export default PagingResultFilters;
