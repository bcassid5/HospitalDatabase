/*Insert a new treatment without specifying columns*/
INSERT INTO Treatments VALUES (
	26,
    'IBUPROFEN',
    'Advil',
    'Nonsteroidal anti-inflamatory drug (NSAID)'
);

SELECT * FROM Treatments
WHERE treatmentID=26;

/*Register a patient's visit to the hospital
spcify the columns to insert values into
dischargeDate is NULL*/
INSERT INTO Visit (visitNo, admissionDate, patientID) 
VALUES (
	1001,
    '2016-11-18',
    75
);

SELECT * FROM Visit
WHERE visitNo=1001;

/*
Insert a patient which requires an address to be added to the address table
*/
INSERT INTO Address VALUES (
	'5 Example Lane',
    'Someplace',
    '12345'
);

INSERT INTO Patient VALUES (
	'Me',
    'You',
    'M',
    '502',
    'meyou@anemail.com',
    '12345'
);

SELECT *
FROM Address a, Patient p
WHERE a.postcode = p.postcode
AND  a.postcode = '12345'
