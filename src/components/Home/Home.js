import React, { useEffect, useState } from 'react';

const Home = () => {
    document.title='Store Front';
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/books')
        .then(res => res.json())
        .then(data => setBooks(data))
    }, [])
    return (
        <div>
            <div class="row row-cols-1 row-cols-md-4 g-4 ml-4 mr-4 home-img">
                {
                    books.map(book =>
                        <div class="col" style={{minWidth: '320px'}}>
                            <div class="card p-2">
                                <img src={book.img} class="card-img-top" alt="..."></img>
                                <div class="card-body">
                                    <div>
                                        <h5 class="card-title">{book.title}</h5>
                                        <p>{book.author}</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <h3 class='text-primary'>${book.price}</h3>
                                        <button class="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                }           
                
            </div>
        </div>
    );
};

export default Home;