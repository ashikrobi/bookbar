import React from 'react';

const Product = ({books, handleBuyNow}) => {

    const {img, title, author, price} = books;
    return (
        <div class="col" style={{minWidth: '320px'}}>
            <div class="card p-2">
                <img src={img} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <div>
                        <h5 class="card-title">{title}</h5>
                        <p>{author}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h3 class='text-primary'>${price}</h3>
                        <button class="btn btn-primary" onClick={() => handleBuyNow(books)}
                        >Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;