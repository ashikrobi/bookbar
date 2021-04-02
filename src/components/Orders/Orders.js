import React, { useContext } from 'react';
import { orderContext } from '../../App';

const Orders = () => {
    document.title='Orders';
    const [order] = useContext(orderContext);
    const {title, price} = order[0];
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
                        <td>{title}</td>
                        <td>1</td>
                        <td>${price}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>${price}</td>
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