import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Posts from './Posts';
import Pagination from './Pagination';
import { ALL_PRODUCTS } from './../../../service/API';

function PagingProducts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(ALL_PRODUCTS);
            setPosts(res.data);
            setLoading(false);
        };

        fetchPosts();
    }, []);


    const indexOfLastPost = currentPage * postsPerPage;

    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        window.scrollTo(0, 400);
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Posts products={currentPosts} loading={loading} />
            <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={posts.length} />
        </>
    );
}
export default PagingProducts;
