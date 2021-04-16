
function CheckLogin() {
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            return(
                <Home/>
            )
        }
        else {
            return (
                <Login/>
            )
        }
    }, []);
}

export default CheckLogin;