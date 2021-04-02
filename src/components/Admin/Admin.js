import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faThLarge } from '@fortawesome/free-solid-svg-icons'

const Admin = () => {
    document.title='Admin Panel';
    const [books, setNewBooks] = useState({
        title: '',
        author: '',
        img: '',
        price: 0
    });
    const handleBlur = (event) => {
        console.log(event.target.value);
        const newBookInfo = {...books};
        newBookInfo[event.target.name] = event.target.value;
        setNewBooks(newBookInfo);
        // console.log(books);
    }
    const handleSubmit = (event) => {
        const newBook = {...books};
        fetch('https://apricot-sundae-34567.herokuapp.com/addBooks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBook)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })

        event.preventDefault();
    }
    return (
        <div class='row'>
            <div class='col-md-2 ml-5 shadow-lg p-3 mb-5 bg-body rounded border border-primary bg-primary bg-gradient text-white'>
                <h4 class='text-uppercase mb-5 ml-5'>Book Shop</h4>
                <h5 class='ml-5'><span class='mr-2'><FontAwesomeIcon icon={faThLarge}/></span>Manage books</h5>
                <h5 class='ml-5'><span class='mr-2'><FontAwesomeIcon icon={faPlus}/></span>Add book</h5>
                <h5 class='ml-5'><span class='mr-2'><FontAwesomeIcon icon={faPen}/></span>Edit book</h5>
            </div>
            
            <div class='col-md-9 ml-5 shadow-lg p-3 mb-5 bg-body rounded border border-primary'>
                <h4 class='mb-3'>Add book</h4>
                <form onSubmit={handleSubmit} class='col-md-6 offset-md-3'>
                    <div class='mb-3'>
                        <label>Book Name</label>
                        <input onBlur={handleBlur} type="text" name="title" id="title" class="form-control" required/>
                    </div>
                    <div class='mb-3'>
                        <label>Author Name</label>
                        <input onBlur={handleBlur} type="text" name="author" id="author" class="form-control" required/>
                    </div>
                    <div class='mb-3'>
                        <label>Add Price</label>
                        <input onBlur={handleBlur} type="text" name="price" id="price" class="form-control" required/>
                    </div>
                    <div class='mb-3'>
                        <label>Add Photo URL</label>
                        <input onBlur={handleBlur} type="url" name="img" id="img" class="form-control" required/>
                    </div>
                    <div>
                    <button type="submit" class='btn btn-primary mb-3'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin;