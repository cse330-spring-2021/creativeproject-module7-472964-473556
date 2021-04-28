import React, { useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
 

function LoginComponent() {

    const [redirect, setRedirect] = useState(false);

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [user, setUser] = useState();

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
                console.log(user);
                console.log("hi");
                console.log("Successful Login: ", data.username);

                setRedirect(true);
            
            }
            else {
                alert("Username already taken");
            }
        })
        .catch(err => {
            console.error(err);
        });

        document.getElementById("newUsername").innerHTML = "";
        document.getElementById("newPassword").innerHTML = "";
    };

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

    const renderRedirect = () => {
        if (redirect) {
          return <Redirect to='/' />
        }
      }


    return (
        <div className="Login">
            {checkLoggedIn()}
            {renderRedirect()}
            <h1>Login:</h1>
            <form onSubmit={login} method='POST'>
                <div className = "existingUser">
    
                    <input type="text" id="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username"/>
                    <input type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
                    <input type="submit" id="existingUserLogin" value="Login"/>
                    {/* login button will fetch in different component --> go to home if logged in */}
                </div>
            </form>

            <form onSubmit={register} method="POST">
                <div className = "newUser">
                    <label htmlFor="newusername">Don't have an account?</label>
                    <input type="text" id="newusername" value={newUsername} onChange={e=>setNewUsername(e.target.value)} placeholder="Username" />
                    <input type="password" id="newpassword" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="Password"/>
                    <input type="submit" id="newUserButton" value ="Create!"/>
                </div>
            </form>
        </div>
    )
    }
             

export default LoginComponent;

