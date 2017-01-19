CREATE TABLE Address (
	street VARCHAR(100),
    city VARCHAR(100),
    postcode INT(5),
    PRIMARY KEY (postcode)
);

CREATE TABLE Patient(
	fName VARCHAR(30),
    lName VARCHAR(30),
    gender CHAR(1),
    patientID INT,
    email VARCHAR(255),
    postcode INT(5),
    PRIMARY KEY (patientID),
    FOREIGN KEY (postcode) REFERENCES Address(postcode)
);

CREATE TABLE Visit(
	visitNo INT,
    admissionDate DATE,
    dischargeDate DATE,
    patientID INT,
    PRIMARY KEY (visitNO),
    FOREIGN KEY (patientID) REFERENCES Patient(patientID)
);

CREATE TABLE Department(
	departmentID INT,
    departmentName VARCHAR(30),
    PRIMARY KEY (departmentID)
);

CREATE TABLE Room (
	roomID INT,
    roomType VARCHAR(20),
    departmentID INT,
    PRIMARY KEY (roomID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
);

CREATE TABLE Role (
	roleID INT,
    roleName VARCHAR(20),
    PRIMARY KEY (roleID)
);

CREATE TABLE Staff (
    fName VARCHAR(30),
    lName VARCHAR(30),
    staffID INT,
    staffPassword VARCHAR(20),
    gender CHAR(1),
    departmentID INT,
    postcode INT(5),
    role INT,
    PRIMARY KEY (staffID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID),
    FOREIGN KEY (postcode) REFERENCES Address(postcode),
    FOREIGN KEY (role) REFERENCES Role(roleID)
);

CREATE TABLE Treatments (
	treatmentID INT,
    treatmentType VARCHAR(30),
    title VARCHAR(20),
    description VARCHAR(400),
    PRIMARY KEY (treatmentID)
);

CREATE TABLE PatientRecord (
	dateAdded DATE,
    recordID INT,
    notes VARCHAR(400),
	visitNo INT,
	roomID INT,
	treatmentID INT,
	creator INT,
    PRIMARY KEY (recordID),
    FOREIGN KEY (visitNo) REFERENCES Visit(visitNo),
    FOREIGN KEY (roomID) REFERENCES Room(roomID),
    FOREIGN KEY (treatmentID) REFERENCES Treatments(treatmentID),
    FOREIGN KEY (creator) REFERENCES Staff(staffID)
);

CREATE TABLE ParticipatesIn (
	participantType VARCHAR(20),
    recordID INT,
    staffID INT,
    PRIMARY KEY (recordID, staffID),
    FOREIGN KEY (recordID) REFERENCES PatientRecord(recordID),
    FOREIGN KEY (staffID) REFERENCES Staff(staffID)
);