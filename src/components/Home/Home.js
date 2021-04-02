import React, { useContext, useEffect, useState } from 'react';
import { orderContext } from '../../App';
import Product from '../Product/Product';

const Home = () => {
    document.title='Store Front';
    const [books, setBooks] = useState([]);
    const [order, setOrder] = useContext(orderContext);
    useEffect(() => {
        fetch('http://localhost:5000/books')
        .then(res => res.json())
        .then(data => setBooks(data))
    }, [])
    const handleBuyNow = (product) => {
        console.log(product);
        const newOrder = [...order, product];
        setOrder(newOrder);
    }
    return (
        <div>
            {
                books.length === 0 && 
                <div class="spinner-border text-primary" role="status">
                </div>
            }
            <div class="row row-cols-1 row-cols-md-4 g-4 ml-4 mr-4 home-img">
                {
                    books.map(book =>
                        <Product 
                        books={book}
                        handleBuyNow={handleBuyNow}
                        ></Product>
                        )
                }           
                
            </div>
        </div>
    );
};

export default Home;