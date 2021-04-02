import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Navigation = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <div class="container">
                <p class='navbar-brand text-uppercase'>Bookbar</p>
                {loggedInUser.email && <h5 class="mr-2">{loggedInUser.name}</h5>}
                <button class="navbar-toggler" data-toggle='collapse' data-target='#navbarNav'>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <Link class="nav-link" to="/home">Home</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" to="/orders">Orders</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" to="admin">Admin</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" to="deals">Deals</Link>
                        </li>
                        <li class="nav-item">
                            {loggedInUser.email && <button class='btn btn-outline-danger' onClick={() => setLoggedInUser({})}>Sign Out</button>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;