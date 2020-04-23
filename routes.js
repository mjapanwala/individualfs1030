const app = require('express')();
const database = require('./public/database.json')
const fs = require('fs')
const connection = require('./database')

app.get('/', (req, res) => res.sendFile(__dirname + '/public/views/index.html'))
app.get('/contact', (req, res) => res.sendFile(__dirname + '/public/views/Contact.html'))
app.get('/portfolio', (req, res) => res.sendFile(__dirname + '/public/views/Portfolio.html'))
app.get('/resume', (req, res) => res.sendFile(__dirname + '/public/views/Resume.html'))
app.get('/inquiry', (req, res) => res.sendFile(__dirname + '/public/views/Inquiries.html'))
app.get('/login', (req, res) => res.sendFile(__dirname + '/public/views/Login.html'))

app.get('/inquiries', (req, res) => {
  connection.query('Select * from Inquiries', (err, result) => {
    if (err){
      console.log(err);
      return res.status(400).send('Bad Request')
    }
    console.log(`Returned ${result.length} entries from the DB`);
    return res.status(200).send(result)
  })
})

app.post('/inquiries', (req, res) => {

    if (req.body){
        connection.query(`INSERT INTO Inquiries (First_Name, Last_Name, Email, Message) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', "${req.body.message}")`, function (error, results, fields) {
          if (error){
            console.log(error);
            return res.status(400).send('Bad Request')
          }
          console.log('Successfully inserted new record into Inquiry table');
          return res.status(200).send('success')
        });
    } else {
        res.status(400).send('Bad Request')
    }
})

app.put('/inquiries', (req, res) => {

    if (req.body){
        connection.query(`UPDATE Inquiries SET Status='Read' Where id=${req.body.message_id}`, (err) => {
          if (err){
            console.log(err);
            return res.status(400).send('Bad Request')
          }
          console.log(`Successfully updated a record with an ID ${req.body.message_id}`);
          return res.status(200).send('success')
        });
    } else {
        res.status(400).send('Bad Request')
    }
})

app.delete('/inquiries', (req, res) => {

    if (req.body){
        connection.query(`DELETE FROM Inquiries Where id=${req.body.message_id}`, (err) => {
          if (err){
            console.log(err);
            return res.status(400).send('Bad Request')
          }
          console.log(`Successfully deleted a record with an ID ${req.body.message_id}`);
          return res.status(200).send('success')
        });
    } else {
        res.status(400).send('Bad Request')
    }
})

app.get('/skills', (req, res) => {
  connection.query('Select * from Skills Where id=1', (err, result) => {
    if (err){
      console.log(err);
      return res.status(400).send('Bad Request')
    }
    console.log(`Returned ${result.length} entries from the DB`);
    return res.status(200).send(result[0])
  })
})

app.put('/skills', (req, res) => {

    if (req.body){
        connection.query(`UPDATE Skills SET html=${req.body.html}, css=${req.body.css}, js=${req.body.js} Where id=1`, (err) => {
          if (err){
            console.log(err);
            return res.status(400).send('Bad Request')
          }
          console.log(`Successfully updated default skills record`);
          return res.status(200).send('success')
        });
    } else {
        res.status(400).send('Bad Request')
    }
})

module.exports = app;
