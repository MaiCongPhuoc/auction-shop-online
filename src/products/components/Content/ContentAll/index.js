import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Posts from './Posts';
import Pagination from './Pagination';

function PagingProducts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('http://localhost:8080/api/products');
            setPosts(res.data);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // console.log(posts);

    const indexOfLastPost = currentPage * postsPerPage;
    // console.log("indexOfLastPost: ", indexOfLastPost);

    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // console.log("indexOfFirstPost: ", indexOfFirstPost);

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    console.log('currentPosts: ', currentPosts);

    return (
        <div className="container mt-5">
            <h1 className="text-primary mn-3">My Posts</h1>
            <Posts products={currentPosts} loading={loading} />
            <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={posts.length} />
        </div>
    );
}
export default PagingProducts;
