import React, { useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
 

function LoginComponent() {

    /* redirect functionality */
    const [redirect, setRedirect] = useState(false);

    /* code validation */
    let validator = new SimpleReactValidator();

    /* checks if a user is logged in */
    var loggedInUser;
    try{
      loggedInUser = localStorage.getItem("user");
    }
    catch(err){
      loggedInUser = null;
    }

    const checkLoggedIn = () => {
        if (loggedInUser) {
            return <Redirect to='/' />
        }
    }
    /* sets states for global use */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [user, setUser] = useState();

    /* sends info to server upon new account creation */
    const register= (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/register", {
            'username' : newUsername,
            'password' : newPassword
        })
        .then(response => response.data)
        .then(data => {
            if(data.success) {
                setUser(data.username)
                // store the user in localStorage
                localStorage.setItem('user', data.username);
                setRedirect(true);
            
            }
            else {
                alert("Username already taken");
            }
        })
        .catch(err => {
            console.error(err);
        });

        document.getElementById("newusername").innerHTML = "";
        document.getElementById("newpassword").innerHTML = "";
    };

    /* sends login info to server */
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login", {
            'username' : username,
            'password' : password
        })
        .then(response => response.data)
        .then(data => {
            if(data.success) {
                // set the state of the user
                setUser(data.username);
                // store the user in localStorage
                localStorage.setItem('user', data.username);
                console.log("hi");
                console.log("Successful Login: ", data.username);
                setRedirect(true);
            }
            else {
                alert("Username or password incorrect")
            }
        })
        .catch(err => {
            console.error(err);
        });

        document.getElementById("username").innerHTML = "";
        document.getElementById("password").innerHTML = "";
    };

    /* redirect to home page */
    const renderRedirect = () => {
        if (redirect) {
          return <Redirect to='/' />
        }
      }

    return (
        <div className="Login">
            {checkLoggedIn()}
            {renderRedirect()}
            <h1>Welcome!</h1>
            <h2>Login to Health Portal:</h2>
            <form onSubmit={login} method='POST'>
                <div className = "existingUser">
    
                    <input type="text" id="username" required value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username"/>
                    <input type="password" id="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
                    <input type="submit" id="existingUserLogin" value="Login"/>

                    {/* validating input form code */}
                    {validator.message('username', {username}, 'required')}
                    {validator.message('password',{password}, 'required')}
                </div>
            </form>

            <form onSubmit={register} method="POST">
                <div className = "newUser">
                    <label htmlFor="newusername">Don't have an account?</label>
                    <input type="text" id="newusername" required value={newUsername} onChange={e=>setNewUsername(e.target.value)} placeholder="Username" />
                    <input type="password" id="newpassword" required value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="Password"/>
                    <input type="submit" id="newUserButton" value ="Create!"/>

                    {/* validating input form code */}
                    {validator.message('newusername', {newUsername}, 'required')}
                    {validator.message('newpassword', {newPassword}, 'required')}
                </div>
            </form>
        </div>
    )
    }
             

export default LoginComponent;

