

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
      <nav>
        <ul>
          <li><a href="/">About Me</a></li>
          <li><a href="/resume" >Resume</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/contact">Contact</a></li>
          {checkLoggedIn() ?
            <React.Fragment>

             <li><a href="/inquiry">Admin Page</a></li>
             <li><a href="#" onClick={() => handleLogout()}>Logout</a></li>

            </React.Fragment>
             :
             <React.Fragment>
             <li><a href="/login">Login</a></li>
             </React.Fragment>
           }
        </ul>
      </nav>
  )
}

ReactDOM.render(<Nav />, document.getElementById('navbar'));
