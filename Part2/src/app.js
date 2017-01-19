var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//create a connection to the db
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hospital"
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to DB');
        return;
    }
    console.log('Connection established');
});


app.listen(8080, function(){
    console.log('App is listening on port 8080');
});

app.get('/', function (req, res) {
    res.sendFile('index.html', {'root': _dirname+'/public'});
});

app.post('/login', function(req, res){
    var pswrd = req.body.pass;
    console.log(pswrd);
    var uName = req.body.user;
    console.log(uName);


    con.query('SELECT COUNT(*) AS myCount FROM Staff WHERE staffID=? AND staffPassword=?', [uName, pswrd], function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');
        console.log(rows[0]);
        res.send(rows);
    });
});

app.get('/selectPatientsInHospital', function(req, res){
    con.query('SELECT p.fName, p.lName, p.gender, p.patientID, v.admissionDate FROM Patient p, Visit v WHERE p.patientID=v.patientID AND v.dischargeDate IS NULL;', function(err, rows){
        if(err) throw err;

        console.log('Data received from DB:\n');
        console.log(rows);
        res.json(rows);
    });
});

app.post('/selectPatientRecords', function(req, res){
    var fName = req.body.fName;
    console.log(fName);
    var lName = req.body.lName;
    console.log(lName);
   con.query('SELECT p.recordID, p.dateAdded, p.notes, p.visitNo, p.roomID, v.admissionDate, v.dischargeDate, t.treatmentType, t.title, t.description, s.fName, s.lName, r.roleName FROM PatientRecord p, Staff s, Role r, Treatments t, Visit v WHERE p.creator=s.staffID AND r.roleID=s.role AND t.treatmentID=p.treatmentID AND v.visitNo=p.visitNo AND v.patientID=(SELECT patientID FROM Patient WHERE fName=? AND lName=?);', [fName, lName], function(err, rows){
       console.log('Data received from DB:\n');
       console.log(rows);
       res.json(rows);
   });
});

app.get('/patientMostInHospital', function(req, res){
    con.query('SELECT p.fName, p.lName, p.patientID, p.gender, p.email, a.street, a.city, a.postcode, COUNT(*) AS TotalVisits FROM Visit v, Patient p, Address a WHERE v.patientID=p.patientID AND a.addressID=p.addressID GROUP BY patientID HAVING COUNT(*) = (SELECT MAX(a.CNT) FROM (SELECT COUNT(*) AS CNT FROM Visit GROUP BY (patientID)) AS a); ', function(err, rows){
        console.log('Data received from DB:\n');
        console.log(rows);
        res.json(rows);
    });
});

app.post('/dischargePatient', function(req, res){
    var date = req.body.dischargeDate;
    var fName = req.body.fName;
    var lName = req.body.lName;
    con.query('UPDATE Visit SET dischargeDate = ? WHERE patientID = (SELECT patientID FROM Patient WHERE fName = ? AND lName=?);', [date, fName, lName], function(err, rows){
        console.log('Data received from DB:\n');
        console.log(rows);
        res.json(rows);
    });
});

app.post('/addingPatient', function(req,res){
   var street = req.body.street;
   var city = req.body.city;
   var postcode = req.body.postcode;
   var fName = req.body.fName;
   var lName = req.body.lName;
   var gender = req.body.gender;
   var email = req.body.email;

   con.query('INSERT INTO Address (street, city, postcode) VALUES (?,?,?);', [street, city, postcode], function(err, res){
      if(err) throw err;
       con.query('INSERT INTO Patient (fName, lName, gender, email, addressID) VALUES (?, ?, ?, ?, ?);', [fName, lName, gender, email, res.insertId], function(err){
           if (err) throw err;
           console.log("inserted patient");
       });
   });
   res.json({message: "added patient"});
});

app.post('/findPatient', function(req, res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    con.query('SELECT p.fName, p.lName, p.patientID, p.gender, p.email, a.street, a.city, a.postcode FROM patient p, address a WHERE fName=? AND lName=? AND p.addressID = a.addressID;', [fName, lName], function(err, rows){
        console.log('Data received from DB:\n');
        console.log(rows);
        res.json(rows);
    });
});


//con.end();

module.exports = app;
