// 1. Mount react into this project - done
// 2. Create a form component in react.js - done
// 3. Write a logic for collecting input values using useState hook
// 4. Write an AJAX request to submit data from React to Express
// 5. Create a dummy JSON database
// 6. Add new data from AJAX request to JSON database



const Form = () => {

    const [ firstName, setFirstName ] = React.useState('')
    const [ lastName, setLastName ] = React.useState('')
    const [ email, setEmail ] = React.useState('')
    const [ message, setMessage ] = React.useState('')

    const [showMessage, setShowMessage] = React.useState('none')

    const handleUpdate = (e) => {

        console.log(e.target.name, e.target.value)
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'firstName'){
            setFirstName(value)
        }

        if (name === 'lastName'){
            setLastName(value)
        }

        if (name === 'email'){
            setEmail(value)
        }

        if (name === 'message'){
            setMessage(value)
        }

        return;
    }

    const clearState = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setMessage('')
        return;
    }

    // this.state = {
    //     firstName: 'James'
    // }

    // handleFirstNameChange = () => {
    //     this.setState({firstName: 'Bill'})
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                setShowMessage('success')
                clearState()
            } else {
                setShowMessage('error')
            }
        };
        xhttp.open("POST", "/inquiries", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            firstName, lastName, email, message
        }));
    }



    return (
      <div class="container2">
        <form>

            {showMessage === 'success' &&
                <p style={{color: 'green'}}>Message successful</p>
            }

            {showMessage === 'error' &&
                <p style={{color: 'red'}}>Message failed. Try again later</p>
            }

            <label>First Name</label>
            <input type="text" name="firstName" class="field-divided" placeholder="First Name" onChange={handleUpdate} value={firstName}/>

            <label>Last Name</label>
            <input type="text" name="lastName" class="field-divided" placeholder="Last Name" onChange={handleUpdate} value={lastName} />

            <label>Email</label>
            <input type="email" name="email" class="field-long" placeholder="Email" onChange={handleUpdate} value={email} />

            <label>Inquiry</label>
            <textarea name="message" style={{height:"200px"}} id="field5" class="field-long field-textarea" placeholder="Your message" value={message} onChange={handleUpdate}>{message}</textarea>

            <input onClick={handleSubmit} type="submit" value="Submit" />
        </form>
      </div>
    )
}

ReactDOM.render(<Form />, document.getElementById('react'));
