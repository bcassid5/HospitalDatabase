CREATE SCHEMA hospital;

CREATE TABLE Address (
    addressID INT auto_increment,
	street VARCHAR(100) not null,
    city VARCHAR(100) not null,
    postcode INT(5),
    PRIMARY KEY (addressID)
);

CREATE TABLE Patient(
    patientID INT auto_increment,
	fName VARCHAR(30) not null,
    lName VARCHAR(30) not null,
    gender ENUM('M', 'F'),
    email VARCHAR(255),
    addressID INT not null,
    PRIMARY KEY (patientID),
    FOREIGN KEY (addressID) REFERENCES Address(addressID)
);

CREATE TABLE Visit(
	visitNo INT auto_increment,
    admissionDate DATE not null,
    dischargeDate DATE,
    patientID INT not null,
    PRIMARY KEY (visitNO),
    FOREIGN KEY (patientID) REFERENCES Patient(patientID)
);

CREATE TABLE Department(
	departmentID INT auto_increment,
    departmentName VARCHAR(30) not null,
    PRIMARY KEY (departmentID)
);

CREATE TABLE Room (
	roomID INT auto_increment,
    roomType VARCHAR(20),
    departmentID INT not null,
    PRIMARY KEY (roomID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
);

CREATE TABLE Role (
	roleID INT auto_increment,
    roleName VARCHAR(20) not null,
    PRIMARY KEY (roleID)
);

CREATE TABLE Staff (
    staffID INT auto_increment,
    fName VARCHAR(30) not null,
    lName VARCHAR(30) not null,
    staffPassword VARCHAR(20) not null,
    gender ENUM('M', 'F'),
    departmentID INT not null,
    addressID INT not null,
    role INT not null,
    PRIMARY KEY (staffID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID),
    FOREIGN KEY (addressID) REFERENCES Address(addressID),
    FOREIGN KEY (role) REFERENCES Role(roleID)
);

CREATE TABLE Treatments (
	treatmentID INT auto_increment,
    treatmentType VARCHAR(300) not null,
    title VARCHAR(200) not null,
    description VARCHAR(400),
    PRIMARY KEY (treatmentID)
);

CREATE TABLE PatientRecord (
    recordID INT auto_increment,
	dateAdded DATE not null,
    notes VARCHAR(400),
	visitNo INT not null,
	roomID INT not null,
	treatmentID INT not null,
	creator INT not null,
    PRIMARY KEY (recordID),
    FOREIGN KEY (visitNo) REFERENCES Visit(visitNo),
    FOREIGN KEY (roomID) REFERENCES Room(roomID),
    FOREIGN KEY (treatmentID) REFERENCES Treatments(treatmentID),
    FOREIGN KEY (creator) REFERENCES Staff(staffID)
);

CREATE TABLE ParticipatesIn (
	participantType VARCHAR(20) not null,
    recordID INT not null,
    staffID INT not null,
    PRIMARY KEY (recordID, staffID),
    FOREIGN KEY (recordID) REFERENCES PatientRecord(recordID),
    FOREIGN KEY (staffID) REFERENCES Staff(staffID)
);