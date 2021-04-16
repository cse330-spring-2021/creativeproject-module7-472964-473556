// import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Login from './Login';




function App() {

// useEffect(() => {
//   const loggedInUser = localStorage.getItem("user");
//   if (loggedInUser) {
//     const foundUser = JSON.parse(loggedInUser);
//     setUser(foundUser);
//   }

// }, []);
  return (
    <div className="App">
      <header className="App-header">
        
        {/* <Login/> */}
        {/* <Redirect from="/login" to="/home" /> */}
        <Home/>

      </header>
    </div>
  );
}

export default App;



