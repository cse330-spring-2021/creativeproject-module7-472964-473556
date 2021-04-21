import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login';
import Form from './Form';

const routing = (  
  <Router>  
    <div>  
      {/* <Redirect push to="/login"/>  */}
      <div className="App">
          <header className="App-header">
          
          <Route exact path="/" component={App} />  
          <Route path="/login" component={Login} />  
          <Route path="/form" component={Form} />  

         </header>
       </div>
      
    </div>  
  </Router>  
)

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // document.getElementById('root')
  routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
