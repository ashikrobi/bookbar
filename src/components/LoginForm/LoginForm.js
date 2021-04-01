import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import './LoginForm.css'
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const LoginForm = () => {
  document.title='login';
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    //using context to access user information here
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); 
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    var googleProvider = new firebase.auth.GoogleAuthProvider();

      const handleGoogleSignIn = () => {
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email: email};
            setLoggedInUser(signedInUser);
            history.replace(from);
        }).catch((error) => {
            var errorMessage = error.message;
            var email = error.email;
            console.log(errorMessage, email);
        });
      }
      const handleSubmit = (event) => {
          if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name)
            })
            .catch(error => {
                var errorMessage = error.message;
                const newUserInfo = {...user};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setUser(newUserInfo);
            })
          }

          if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
            const newUserInfo = {...user}
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            console.log('signed in user info', res.user);
            const {displayName, email} = res.user;
            const signedInUser = {name: displayName, email: email};
            setLoggedInUser(signedInUser);
            history.replace(from);
            })
            .catch((error) => {
            var errorMessage = error.message;
            const newUserInfo = {...user};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            setUser(newUserInfo);
            }); 
          }
          event.preventDefault();
      }

      const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
        })
        .then(() => {
          console.log('user name updated');
        })
        .catch((error) => {
          console.log(error);
        });
      }

      const handleBlur = (event) => {
          let isFieldValid = true;
          if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
          }
          if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = (isPasswordValid && passwordHasNumber);
          }
          if (isFieldValid) {
              const newUserInfo = {...user};
              newUserInfo[event.target.name] = event.target.value;
              setUser(newUserInfo);
          }
      }
      
    return (
        <div id="form-container" class="rounded border border-1">
            <form onSubmit={handleSubmit}>
                {newUser && 
                    <div class="mb-3">
                        <label for="userName" class="form-label">Name</label>
                        <input type="text" name='name' onBlur={handleBlur} class="form-control" id="userName"/>
                    </div>
                }
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="email" name='email' onBlur={handleBlur} class="form-control" id="inputEmail"/>
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Password</label>
                    <input type="password" name='password' onBlur={handleBlur} class="form-control" id="inputPassword"/>
                </div>
                <p style={{color: 'red'}}>{user.error}</p>
                {user.success && <p style={{color: 'green'}}>'Account {newUser ? 'created' : 'Logged In'} successfully'</p>}
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="checkRemember"/>
                    <label class="form-check-label" for="checkRemember">Remember Me</label>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary">{newUser ? 'Sign Up' : 'Sing In'}</button>
                    <p>Don't have an account? <p onClick={() => setNewUser(!newUser)} class="text-primary d-inline" id="create-account">Create an account</p></p>
                </div>
            </form>
            <br/>
            <p class="text-center">Or</p>
            <div>
                <button onClick={handleGoogleSignIn} class="border border-1 rounded-pill text-center btn btn-primary"><FontAwesomeIcon icon={faGoogle}/>Continue With Google
                </button>
            </div>
        </div>
    );
};

export default LoginForm;