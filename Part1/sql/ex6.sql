/*Move all nurse type staff from department i to department 10
Updates multiple specific rows*/
UPDATE Staff
SET departmentID=10
WHERE departmentID=6
AND role = 2;

SELECT departmentID, COUNT(*) AS NumStaffInDepartment
FROM Staff
GROUP BY departmentID;

/*THIS IS ALL ONE DATA MODIFICATION IN MULTIPLE LINES*/
/*We update the staff table by adding a new column, filling
the columns with data, and then updating just a certain staff
role to have a raise!*/

ALTER TABLE Staff
ADD salary INT unsigned;

UPDATE Staff
SET salary=150000
WHERE role=1;

UPDATE Staff
SET salary = 75000
WHERE role=2;

UPDATE Staff
SET salary = 1.05*salary
WHERE role=1;

/*Deleting all patient record associated with a visit*/
SELECT *
FROM patientrecord
where visitNo = 1001;

DELETE FROM PatientRecord
WHERE visitNo =  1001;