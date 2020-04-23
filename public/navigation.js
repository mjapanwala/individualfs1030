

const Nav = () => {

  const checkLoggedIn = () => {
    if (typeof localStorage.loggedIn !== 'undefined' && localStorage.loggedIn !== 'false'){
      return true;
    }
    return false;
  }

  const handleLogout = () => {
    console.log('logged out');
    localStorage.clear()
    window.location.href = '/';
  }

  return (
    <div class="navigation">
      <a href="/" style={{"color": "rgb(64, 29, 221)"}}>About Me</a>
      <a href="/resume" style={{"color": "rgb(64, 29, 221)"}}>Resume</a>
      <a href="/portfolio" style={{"color": "rgb(64, 29, 221)"}}>Portfolio</a>
      <a href="/contact" style={{"color": "rgb(64, 29, 221)"}}>Contact</a>
      {checkLoggedIn() ?
        <React.Fragment>
         <a href="#" style={{"color": "rgb(64, 29, 221)", 'float': 'right'}} onClick={() => handleLogout()}>Logout</a>
         <a href="/inquiry" style={{"color": "rgb(64, 29, 221)", 'float': 'right'}}>Admin Page</a>

        </React.Fragment>
         :
         <React.Fragment>
         <a href="/login" style={{"color": "rgb(64, 29, 221)", 'float': 'right'}}>Login</a>
         </React.Fragment>
       }
    </div>
  )
}

ReactDOM.render(<Nav />, document.getElementById('navbar'));
