import React, { useState } from 'react';

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
        fetch('http://localhost:5000/addBooks', {
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
            <div class='col-md-3 col-sm-6' style={{border: "1px solid black"}}>
                <h4 class='text-uppercase'>Book Shop</h4>
                <h5>Manage books</h5>
                <h5>Add books</h5>
                <h5>Edit books</h5>
            </div>
            
            <div class='col-md-9 col-sm-6' style={{border: "1px solid black"}}>
                <h4 class='mb-3'>Add book</h4>
                <form onSubmit={handleSubmit}>
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