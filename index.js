import React from 'react';
import ReactDOM from 'react-dom';


function login(props) {
    return (
        <div className="login">
            <div className="getUsername">
                {props.user}
            </div>
            <div className="getPassword">
                {props.password}
            </div>
        </div>

    );
}

const loggingIn = {
    user: 'user1',
    password: 'user1password'
}

ReactDOM.render(
    <login
        user={loggingIn.user}
        password={logging.password}
        />,
        document.getElementById('root')

);

// function login() {
//     const logInElement = (
//         // Survey Login
//         <div>
//            <h1>Login:</h1>
           
//            <input type="text" id="username" placeholder="Username"/>
//            <input type="password" id="password" placeholder="Password"/>
//            {/* <button id="existingUserButton" onclick="login()">Login</button><br> */}
           
//            <label for="newusername">Don't have an account?</label>
//            <input type="text" id="newusername" placeholder="Username" />
//            <input type="password" id="newpassword" placeholder="Password"/>
//            {/* <button id="newUserButton" onclick="createAccount()">Create</button> */}
//        </div>
//     );

//     ReactDOM.render(element, document.getElementById('root'));
// }

