/*View 1:
Display the patients that stayed in a certain month
*/
CREATE VIEW PatientsInMay2015
AS SELECT *
FROM Patient
WHERE patientID IN (
	SELECT patientID
	FROM Visit
	WHERE admissionDate>='2016-05-01'
	AND admissionDate<='2016-05-31'
	AND dischargeDate>='2016-05-01'
	AND dischargeDate<='2016-05-31');
    
SELECT *
FROM PatientsInMay2015;

/*View 2:
Create a view with certain infor from patient table
and use this view to get the patients currently checked into the hospital
*/
CREATE VIEW PatientSubset
AS SELECT fName, lName, gender, email, patientID
FROM Patient;

SELECT p.*, v.admissionDate
FROM PatientSubset p, Visit v
WHERE p.patientID=v.patientID
AND v.dischargeDate IS NULL;

/*inserting into the view*/
INSERT INTO PatientSubset
VALUES('John', 'Smith', 'M', 'jsmith10@example.com', 501);

select *  FROM PatientSubset;