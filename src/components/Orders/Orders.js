import React from 'react';

const Orders = () => {
    document.title='Orders';
    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Book Name</td>
                        <td>1</td>
                        <td>$234</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>$234</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><button class="btn btn-primary">Checkout</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Orders;