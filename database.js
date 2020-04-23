const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port:     '3300',
  password : 'muhammad123$'
});

connection.query('CREATE Database IF NOT EXISTS muhammad;', (err) => {
  if (err) throw err;
  console.log('Default database created.');
  connection.query("USE muhammad", (err) => {
    if (err) throw err;
    console.log('database in use: muhammad')  


    // Create Tables

    connection.query('CREATE TABLE IF NOT EXISTS Inquiries (id int UNSIGNED AUTO_INCREMENT PRIMARY KEY, First_Name varchar(255),Last_Name varchar(255),Email varchar(255),Message varchar(255), Status varchar(255) DEFAULT "New");', (err) => {
      if (err) throw err;
      console.log('Inquiries TABLE created.');
    });

    connection.query('CREATE TABLE IF NOT EXISTS Skills (id int UNSIGNED AUTO_INCREMENT PRIMARY KEY, html int,css int,js int);', (err) => {
      if (err) throw err;
      console.log('Skills TABLE created.');
    });

    connection.query("SELECT * FROM Skills WHERE id = 1", (err, result) => {
      if (err) throw err;
      //console.log(result);
      if (result.length > 0){
        console.log('Default skills record: ', result[0])
        return;
      } else {
        connection.query("INSERT INTO Skills (html, css, js) VALUES (55, 35, 15)", (err) => {
          if (err) throw err;
          console.log('default Skills record created')
        })
      }
    })
  })

});

// Setup connection



module.exports = connection;
