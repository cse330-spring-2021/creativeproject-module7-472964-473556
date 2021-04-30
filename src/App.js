
import './App.css';
import Form from './Form';
import Login from './Login';
import Home from './Home';
import { Redirect } from 'react-router-dom';




function App() {

  /* checks if a user is logged in */
  var loggedInUser;
  try{
    loggedInUser = localStorage.getItem("user");
  }
  catch(err){
    loggedInUser = null;
  }
  /* if a user is logged in, go to home page */
    if (loggedInUser) {
      return(
        <div className="App">
          <header className="App-header">
          
            <Home/>

         </header>
       </div>
      )
    }
    else{
  /* if a user is not logged in, go to login page */
      return(
        <div className="App">
          <header className="App-header">
          
          <Redirect push to="/login"/>

         </header>
       </div>
        
      )
    }
}

export default App;



