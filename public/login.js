// 1. Mount react into this project - done
// 2. Create a form component in react.js - done
// 3. Write a logic for collecting input values using useState hook
// 4. Write an AJAX request to submit data from React to Express
// 5. Create a dummy JSON database
// 6. Add new data from AJAX request to JSON database


const Login = () => {

  const [ username, setUsername ] = React.useState('')
  const [ password, setPassword ] = React.useState('')

  const [showMessage, setShowMessage] = React.useState('none')

  const handleUpdate = (e) => {

      console.log(e.target.name, e.target.value)
      const name = e.target.name;
      const value = e.target.value;

      if (name === 'username'){
          setUsername(value)
      }

      if (name === 'password'){
          setPassword(value)
      }

      return;
  }

  // const clearState = () => {
  //     setFirstName('')
  //     setLastName('')
  //     return;
  // }

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'Muhammad' && password === 'student'){
      localStorage.setItem('loggedIn', 'true');
      window.location.href = '/inquiry'
    } else {
      setShowMessage('error')
    }
  }

  // this.state = {
  //     firstName: 'James'
  // }

  // handleFirstNameChange = () => {
  //     this.setState({firstName: 'Bill'})
  // }

  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     let xhttp = new XMLHttpRequest();
  //     xhttp.onreadystatechange = function() {
  //         if (this.readyState == 4 && this.status == 200) {
  //             setShowMessage('success')
  //             clearState()
  //         } else {
  //             setShowMessage('error')
  //         }
  //     };
  //     xhttp.open("POST", "/inquiries", true);
  //     xhttp.setRequestHeader("Content-type", "application/json");
  //     xhttp.send(JSON.stringify({
  //         firstName, lastName, email, message
  //     }));
  // }



  return (

      <form className="login-container">
          {showMessage === 'success' &&
              <p style={{color: 'green'}}>Message successful</p>
          }

          {showMessage === 'error' &&
              <p style={{color: 'red'}}>Your combination of email and password is incorrect</p>
          }

            <div >
              <h2>Login to your account</h2>
              <form>
                <input type="text" name="username" placeholder="Your username" onChange={handleUpdate} value={username} />
                <input type="password" name="password" placeholder="Your password" onChange={handleUpdate} value={password} />
                <button type="submit" className="btn" onClick={(e) => handleLogin(e)}>Login</button>
              </form>
            </div>

        </form>
  )
}





ReactDOM.render(<Login />, document.getElementById('login'));
