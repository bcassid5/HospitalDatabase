/*Select all patient record columns that have been created by staff member 14*/
SELECT *
FROM PatientRecord
WHERE creator=14;

/*select the patient's first name, last name, gender, email, patient ID, admission date and discharge date
for patients that are currently staying in the hospital*/
SELECT p.fName, p.lName, p.gender, p.email, p.patientID, v.admissionDate, v.dischargeDate
FROM Patient p, Visit v
WHERE p.patientID=v.patientID
AND v.dischargeDate IS NULL;

/*select all patient information of patients that stayed in the hospital during the month of may in 2016*/
SELECT *
FROM Patient
WHERE patientID IN (
	SELECT patientID
	FROM Visit
	WHERE admissionDate>='2016-05-01'
	AND admissionDate<='2016-05-31'
	AND dischargeDate>='2016-05-01'
	AND dischargeDate<='2016-05-31');
    
/*count the number of staff from a specific department*/
SELECT COUNT(*) AS StaffInDepartment
FROM Staff
WHERE departmentID = (
	SELECT departmentID
    FROM Department
    WHERE departmentID=11);

/*count the number of rooms in each department*/
SELECT departmentID, COUNT(*) AS NumRoomsInDepartment
FROM Room
GROUP BY departmentID;





