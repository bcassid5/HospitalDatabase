/*global $*/
var username = "";
var password = "";

function myLoginClick(){
    password = $("#pass").val();
    username = $("#user").val();
    //$.post("http://localhost:8080/login", {user: username, pass: password});
    $.ajax({
        url:  "http://localhost:8080/login",
        method: "POST",
        data: {"pass":password, "user":username},
        success: function(result) {
            if (result[0].myCount=="1"){
                $("#user").val("");
                $("#pass").val("");
                $("#header2").text("Welcome to the Hospital Database");
                $("#paragraph1").text("Select a function below:");
                $('#loginForm').hide();
                $('#choices').css("visibility", "visible");
            } else {
                $("#paragraph1").text("Incorrect username or password.");
            }
        },
        error: function(results){
            alert('error');
        }
    });
}

function hideAll(){
    $("#current").css("visibility", "hidden");
    $("#currentTable").empty();

    $("#most").css("visibility", "hidden");
    $("#mostTable").empty();

    $("#addPatient").css("visibility","hidden");
    $("#fName").val("");
    $("#lName").val("");
    $("#gender").val("");
    $("#email").val("");
    $("#street").val("");
    $("#city").val("");
    $("#postcode").val("");
    $("#addConfirmation").text("");

    $("#getPatient").css("visibility", "hidden");
    $("#patientNotFound").text("");
    $("#patientInformationTable").empty();
    $("#fNamePatient").val("");
    $("#lNamePatient").val("");

    $("#dischargePatient").css("visibility", "hidden");
    $("#patientDischargedConfirmation").text("");
    $("#patientNotFoundD").text("");

    $("#patientRecords").css("visibility", "hidden");
    $("#patientNameDisplay").text("");
    $("#patientRecordsTable").empty();
    $("#fNamePR").val("");
    $("#lNamePR").val("");

}

function logOut(){
    hideAll();
    username="";
    password="";
    $("#header2").text("");
    $("#paragraph1").text("");
    $('#choices').css("visibility", "hidden");
    $('#loginForm').show();
}

function getPatientsInHospital(){
    $.ajax({
        url:  "http://localhost:8080/selectPatientsInHospital",
        method: "GET",
        success: function(result) {
            hideAll();
            $("#current").css("visibility", "visible");
            $("#currentTable").append("<th>First Name</th><th>Last Name</th><th>Gender</th><th>Admission Date</th>");
            for(var i=0;i<result.length;i++){
                $("#currentTable").append("<tr><td>"+result[i].fName+"</td><td>"+result[i].lName+"</td><td>"+result[i].gender+"</td><td>"+result[i].admissionDate.substring(0,10)+"</td></tr>");
            }
        },
        error: function(results){
            alert('error');
        }
    });
}

function getMostInHospital(){
    hideAll();
    $.ajax({
        url:  "http://localhost:8080/patientMostInHospital",
        method: "GET",
        success: function(result) {
            $("#most").css("visibility", "visible");
            $("#mostTable").append("<th>Patient ID</th><th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>Street</th><th>City</th><th>Postcode</th><th>Total Visits</th>");
            for(var i=0;i<result.length;i++){
                $("#mostTable").append("<tr><td>"+result[i].patientID+"</td><td>"+result[i].fName+"</td><td>"+result[i].lName+"</td><td>"+result[i].gender+"</td><td>"+result[i].email+"</td><td>"+result[i].street+"</td><td>"+result[i].city+"</td><td>"+result[i].postcode+"</td><td>"+result[i].TotalVisits+"</td></tr>");
            }
        },
        error: function(results){
            alert('error');
        }
    });
}

function displayAddPatientScreen(){
    hideAll();
    $("#addPatient").css("visibility","visible");
}

function addNewPatient(){
    var fName = $("#fName").val();
    //alert(fName);
    var lName = $("#lName").val();
    //alert(lName);
    var gender = $("#gender").val();
    //alert(gender);
    var email = $("#email").val();
    //alert(email);
    var street = $("#street").val();
    //alert(street);
    var city = $("#city").val();
    //alert(city);
    var postcode=$("#postcode").val();
    //alert(postcode);

    var err = false;

    if(!(gender == "M" || gender == "F")){
        alert("Gender must be M or F. Please fix the mistakes.");
        err = true;
    }
    if(postcode.length < 5){
        alert("Postcode must be 5 digits. Please fix the mistakes.");
        err = true;
    }
    if (fName == "" || lName == "" || gender == "" || email == "" || street == "" || city == ""){
        alert("Some data fields are empty! Please insert all data.");
        err = true;
    }

    //alert(err);
    if(!err){
        //alert("no errors");
        $.ajax({
            url:  "http://localhost:8080/addingPatient",
            method: "POST",
            data: {"fName":fName, "lName":lName, "gender":gender, "email":email, "street":street, "city":city, "postcode":postcode},
            success: function(result) {
                $("#addConfirmation").text("Patient successfully added");

            },
            error: function(results){
                alert('error');
            }
        });
    }
}

function findPatient(){
    hideAll();
    $("#getPatient").css("visibility", "visible");
}

function getPatient(){
    var fName = $("#fNamePatient").val();
    var lName = $("#lNamePatient").val();
    var err = false;
    if (fName == "" || lName == ""){
        alert("Some data fields are empty! Please insert all data.");
        err = true;
    }

    if(!err){
        //alert("no errors");
        $.ajax({
            url:  "http://localhost:8080/findPatient",
            method: "POST",
            data: {"fName":fName, "lName":lName},
            success: function(result) {
                if(result.length==0){
                    $("#patientNotFound").text("Patient with name "+fName+" "+lName+" is not in the database");
                } else{
                    $("#patientInformationTable").append("<th>Patient ID</th><th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>Street</th><th>City</th><th>Postcode</th>");
                    for(var i=0;i<result.length;i++){
                        $("#patientInformationTable").append("<tr><td>"+result[i].patientID+"</td><td>"+result[i].fName+"</td><td>"+result[i].lName+"</td><td>"+result[i].gender+"</td><td>"+result[i].email+"</td><td>"+result[i].street+"</td><td>"+result[i].city+"</td><td>"+result[i].postcode+"</td></tr>");
                    }
                }
            },
            error: function(results){
                alert('error');
            }
        });
    }
}

function dischargePatientDisplay(){
    hideAll();
    $("#dischargePatient").css("visibility", "visible");
}

function dischargePatient(){
    $("#patientNotFoundD").text("");
    $("#patientDischargedConfirmation").text("");
    var fName = $("#fNameD").val();
    var lName = $("#lNameD").val();
    var dischargeDate = $("#dischargeDate").val();
    var err = false;
    if (fName == "" || lName == "" || dischargeDate == ""){
        alert("Some data fields are empty! Please insert all data.");
        err = true;
    }
    if(dischargeDate[4]!="-"||dischargeDate[7]!="-"||dischargeDate.length!=10){
        alert("Discharge date must be in the format YYYY-MM-DD");
        err=true;
    }

    if(!err){
        //alert("no errors");
        $.ajax({
            url:  "http://localhost:8080/findPatient",
            method: "POST",
            data: {"fName":fName, "lName":lName},
            success: function(result) {
                if(result.length==0){
                    $("#patientNotFoundD").text("Patient with name "+fName+" "+lName+" is not in the database");
                } else{
                    $.ajax({
                        url:  "http://localhost:8080/dischargePatient",
                        method: "POST",
                        data: {"fName":fName, "lName":lName, "dischargeDate":dischargeDate},
                        success: function(result) {
                            $("#patientDischargedConfirmation").text("Patient successfully discharged");
                        },
                        error: function(results){
                            alert('error');
                        }
                    });
                }
            },
            error: function(results){
                alert('error');
            }
        });
    }
}

function displayPatientRecordsScreen(){
    hideAll();
    $("#patientRecords").css("visibility", "visible");
}

function viewRecords(){
    $("#patientNotFoundD").text("");
    var fName = $("#fNamePR").val();
    var lName = $("#lNamePR").val();
    var err = false;
    if (fName == "" || lName == ""){
        alert("Some data fields are empty! Please insert all data.");
        err = true;
    }

    if(!err){
        $.ajax({
            url:  "http://localhost:8080/findPatient",
            method: "POST",
            data: {"fName":fName, "lName":lName},
            success: function(result) {
                if(result.length==0){
                    $("#patientNotFoundD").text("Patient with name "+fName+" "+lName+" is not in the database");
                } else{
                    $.ajax({
                        url:  "http://localhost:8080/selectPatientRecords",
                        method: "POST",
                        data: {"fName":fName, "lName":lName},
                        success: function(result) {
                            if(result.length==0){
                                $("#patientNameDisplay").text("Patient"+lName+", "+fName+" currently has no records. ");
                            } else{
                                $("#patientNameDisplay").text("Patient records for patient "+lName+", "+fName+": ");
                                $("#patientRecordsTable").append("<th>Record ID</th><th>Date Added</th><th>Record Notes</th><th>Admission Date</th><th>Discharge Date</th><th>Visit Number</th><th>Room ID</th><th>Treatment</th><th>Company</th><th>Treatment Description</th><th>Creating Staff First Name</th><th>Creating Staff Last Name</th><th>Creating Staff Role</th>");
                                for(var i=0;i<result.length;i++){
                                    $("#patientRecordsTable").append("<tr><td>"+result[i].recordID+"</td><td>"+result[i].dateAdded.substring(0,10)+"</td><td>"+result[i].notes+"</td><td>"+result[i].admissionDate.substring(0,10)+"</td><td>"+result[i].dischargeDate.substring(0,10)+"</td><td>"+result[i].visitNo+"</td><td>"+result[i].roomID+"</td><td>"+result[i].treatmentType+"</td><td>"+result[i].title+"</td><td>"+result[i].description+"</td><td>"+result[i].fName+"</td><td>"+result[i].lName+"</td><td>"+result[i].roleName+"</td></tr>");
                                }
                            }
                        },
                        error: function(result){
                            alert('error in records');
                        }
                    });
                }
            },
            error: function(result){
                alert('error in patient check');
            }
        });
    }
}

