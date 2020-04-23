// 1. Mount react into this project - done
// 2. Create a form component in react.js - done
// 3. Write a logic for collecting input values using useState hook
// 4. Write an AJAX request to submit data from React to Express
// 5. Create a dummy JSON database
// 6. Add new data from AJAX request to JSON database



const Table = () => {

    const [ skills, setSkills ] = React.useState({ id: 1, html: 55, css: 35, js: 15 })


    const handleFetchData = () => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log(JSON.parse(this.responseText))
              setSkills(JSON.parse(this.responseText))

            }
        };
        xhttp.open("GET", "/skills", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }
    //
    // const handleMarkRead = (_id) => {
    //     let xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function() {
    //         if (this.readyState == 4 && this.status == 200) {
    //             console.log(this.responseText)
    //             let arr = [...data];
    //             const index = arr.findIndex(el => {
    //               console.log(el.id == _id)
    //               return el.id == _id;
    //             });
    //             arr[index].Status = 'Read';
    //             console.log('new array: ', arr)
    //             setData(arr)
    //             setSuccess({
    //               status: 'success',
    //               show: false
    //             })
    //         } else {
    //             setSuccess({
    //               status: 'error',
    //               show: true
    //             })
    //         }
    //     };
    //     xhttp.open("PUT", "/inquiries", true);
    //     xhttp.setRequestHeader("Content-type", "application/json");
    //     xhttp.send(JSON.stringify({message_id: _id}));
    // }
    //
    // const handleDelete = (_id) => {
    //     let xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function() {
    //         if (this.readyState == 4 && this.status == 200) {
    //             console.log(this.responseText)
    //             let arr = [...data];
    //             const index = arr.findIndex(el => {
    //               console.log(el.id == _id)
    //               return el.id == _id;
    //             });
    //             arr.splice(index, 1);
    //             console.log('new array: ', arr)
    //             setData(arr)
    //             setSuccess({
    //               status: 'success',
    //               show: false
    //             })
    //         } else {
    //             setSuccess({
    //               status: 'error',
    //               show: true
    //             })
    //         }
    //     };
    //     xhttp.open("DELETE", "/inquiries", true);
    //     xhttp.setRequestHeader("Content-type", "application/json");
    //     xhttp.send(JSON.stringify({message_id: _id}));
    // }
    //
    React.useEffect(() => {
      handleFetchData()
    }, [])

    return (
        <div class="skillsthatkills">
          <p>HTML</p>
          <div class="skillbar">
            <div class="skills html" style={{width: `${skills.html}%`}}>{skills.html}%</div>
          </div>

          <p>CSS</p>
          <div class="skillbar">
            <div class="skills css" style={{width: `${skills.css}%`}}>{skills.css}%</div>
          </div>

          <p>JavaScript</p>
          <div class="skillbar">
            <div class="skills js" style={{width: `${skills.js}%`}}>{skills.js}%</div>
          </div>
        </div>
    )
}

ReactDOM.render(<Table />, document.getElementById('skills'));
