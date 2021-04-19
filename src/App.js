// import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Login from './Login';
import { Redirect } from 'react-router-dom';




function App() {

  //const [loggedInUser, setLoggedInUser] = useState(""); 

  var loggedInUser;
  try{
    loggedInUser = localStorage.getItem("user");
  }
  catch(err){
    loggedInUser = null;
  }
  
  
  // return(
  //   <div className="App">
  //       <header className="App-header">
          
  //         <Login/>
  //         {/* <Redirect from="/login" to="/home" /> */}
  //         {/* <Home/> */}

  //       </header>
  //     </div>
  // )

  
  
    if (loggedInUser) {
      //const foundUser = JSON.parse(loggedInUser);
      //setUser(foundUser);
      

      return(
        <div className="App">
          <header className="App-header">
          
            <Home/>

         </header>
       </div>
        
      )
    }
    else{
      // localStorage.clear();
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



