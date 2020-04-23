// 1. Mount react into this project - done
// 2. Create a form component in react.js - done
// 3. Write a logic for collecting input values using useState hook
// 4. Write an AJAX request to submit data from React to Express
// 5. Create a dummy JSON database
// 6. Add new data from AJAX request to JSON database



const Table = () => {

    const [ success, setSuccess ] = React.useState({
      status: 'success',
      show: false
    })

    const [ data, setData ] = React.useState([])

    const [ html, setHtml ] = React.useState(0)
    const [ css, setCss ] = React.useState(0)
    const [ js, setJs ] = React.useState(0)

    const [ changed, setChanged ] = React.useState(false)

    const handleUpdateSkills = (e) => {

        setChanged(true)

        console.log(e.target.name, e.target.value)
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'html'){
            setHtml(value)
        }

        if (name === 'css'){
            setCss(value)
        }

        if (name === 'js'){
            setJs(value)
        }

        return;
    }

    const handleFetchData = () => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                setData(JSON.parse(this.responseText))
                setSuccess({
                  status: 'success',
                  show: false
                })
            } else {
                setSuccess({
                  status: 'error',
                  show: true
                })
            }
        };
        xhttp.open("GET", "/inquiries", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }

    const handleFetchSkills = () => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                setHtml(JSON.parse(this.responseText).html)
                setCss(JSON.parse(this.responseText).css)
                setJs(JSON.parse(this.responseText).js)
            }
        };
        xhttp.open("GET", "/skills", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }

    const handleMarkRead = (_id) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
                let arr = [...data];
                const index = arr.findIndex(el => {
                  console.log(el.id == _id)
                  return el.id == _id;
                });
                arr[index].Status = 'Read';
                console.log('new array: ', arr)
                setData(arr)
                setSuccess({
                  status: 'success',
                  show: false
                })
            } else {
                setSuccess({
                  status: 'error',
                  show: true
                })
            }
        };
        xhttp.open("PUT", "/inquiries", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({message_id: _id}));
    }

    const handleDelete = (_id) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
                let arr = [...data];
                const index = arr.findIndex(el => {
                  console.log(el.id == _id)
                  return el.id == _id;
                });
                arr.splice(index, 1);
                console.log('new array: ', arr)
                setData(arr)
                setSuccess({
                  status: 'success',
                  show: false
                })
            } else {
                setSuccess({
                  status: 'error',
                  show: true
                })
            }
        };
        xhttp.open("DELETE", "/inquiries", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({message_id: _id}));
    }

    const handlePostSkills = (e) => {
      e.preventDefault()
          let xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  console.log(this.responseText)
                  setChanged(false)
              }
          };
          xhttp.open("PUT", "/skills", true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(JSON.stringify({html, css, js}));

    }

    React.useEffect(() => {
      handleFetchData()
      handleFetchSkills()
    }, [])

    return (
      <React.Fragment>
        <h1>Professional Inquiries</h1>

        <table id="customers">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.First_Name}</td>
                <td>{item.Last_Name}</td>
                <td>{item.Email}</td>
                <td>{item.Message}</td>
                <td>{item.Status}</td>
                <td>
                  <button disabled={item.Status === 'Read'} onClick={() => handleMarkRead(item.id)}>Mark as Read</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          })}

        </table>
        <div style={{margin: '100px'}}>

        </div>

        <h1>Adjust Skills</h1>

        <form>
          <label>HTML</label><br/>
          <input type="number" name="html" placeholder="HTML (%)" onChange={handleUpdateSkills} value={html} />%

          <br/>
          <br/>

          <label>CSS</label><br/>
          <input type="number" name="css" placeholder="CSS (%)" onChange={handleUpdateSkills} value={css} />%

          <br/>
          <br/>

          <label>Java Script</label><br/>
          <input type="number" name="js" placeholder="Java Script (%)" onChange={handleUpdateSkills} value={js} />%

          <br/>
          <br/>

          <button type="submit" className="btn" onClick={handlePostSkills} disabled={!changed}>{changed ? "Save" : "Saved 👌"}</button>
        </form>

      </React.Fragment>
    )
}

ReactDOM.render(<Table />, document.getElementById('inquiries'));
