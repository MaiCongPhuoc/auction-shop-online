import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ProductService from '../../services/productService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

let month1 = 0;
let month2 = 0;
let month3 = 0;
let month4 = 0;
let month5 = 0;
let month6 = 0;
let month7 = 0;
let month8 = 0;
let month9 = 0;
let month10 = 0;
let month11 = 0;
let month12 = 0;
function BarChart() {
    const month = new Date();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getListProduct() {
            let listProduct = await ProductService.getProducts();
            setProducts(listProduct.data);
            console.log('listProduct.data: ', listProduct.data);
        }
        getListProduct();
    }, []);

    for (let i = 0; i < products.length; i++) {
        if (month.getMonth(products[i].createdAt) === 0) {
            console.log('2022-1: ', month.getMonth(products[i].createdAt));
            month1 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 1) {
            console.log('2022-2: ', month.getMonth(products[i].createdAt));
            month2 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 2) {
            console.log('2022-3: ', month.getMonth(products[i].createdAt));
            month3 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 3) {
            console.log('2022-4: ', month.getMonth(products[i].createdAt));
            month4 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 4) {
            console.log('2022-5: ', month.getMonth(products[i].createdAt));
            month5 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 5) {
            console.log('2022-6: ', month.getMonth(products[i].createdAt));
            month6 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 6) {
            console.log('2022-7: ', month.getMonth(products[i].createdAt));
            month7 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 7) {
            console.log('2022-8: ', month.getMonth(products[i].createdAt));
            month8 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 8) {
            console.log('2022-9: ', month.getMonth(products[i].createdAt));
            month9 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 9) {
            console.log('2022-10: ', month.getMonth(products[i].createdAt));
            month10 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 10) {
            console.log('2022-11: ', month.getMonth(products[i].createdAt));
            month11 += products[i].sold * products[i].price;
        }
        if (month.getMonth(products[i].createdAt) === 11) {
            console.log('2022-12: ', month.getMonth(products[i].createdAt));
            month12 += products[i].sold * products[i].price;
        }
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const data = {
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        datasets: [
            {
                label: 'Bán ra',
                data: [
                    month1,
                    month2,
                    month3,
                    month4,
                    month5,
                    month6,
                    month7,
                    month8,
                    month9,
                    month10,
                    month11,
                    month12,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
            {
                label: 'Đấu giá',
                data: [15, 21, 6, 2, 5, 1, 5, 8, 13, 10, 16, 13],
                backgroundColor: [
                    'rgba(250, 102, 133, 0.4)',
                    'rgba(51, 165, 238, 0.4)',
                    'rgba(250, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(250, 159, 64, 0.4)',
                    'rgba(250, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(250, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(250, 159, 64, 0.4)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={options} data={data} />;
}

export default BarChart;
