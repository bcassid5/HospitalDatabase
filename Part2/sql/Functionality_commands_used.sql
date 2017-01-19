#allow staff to login to the database, by determining if staff is in the database
SELECT COUNT(*) AS myCount 
FROM Staff 
WHERE staffID=? 
AND staffPassword=?;

#select patients currently in the hopital
SELECT p.fName, p.lName, p.gender, p.email, p.patientID, v.admissionDate, v.dischargeDate
FROM Patient p, Visit v
WHERE p.patientID=v.patientID
AND v.dischargeDate IS NULL;

#adding a new patient
INSERT INTO Address (street, city, postcode) VALUES (?,?,?);
INSERT INTO Patient (fName, lName, gender, email, addressID) VALUES (?, ?, ?, ?, ?);

#view all records for a specific patient
SELECT p.recordID, p.dateAdded, p.notes, p.visitNo, p.roomID, v.admissionDate, v.dischargeDate, t.treatmentType, t.title, t.description, s.fName, s.lName, r.roleName 
FROM PatientRecord p, Staff s, Role r, Treatments t, Visit v 
WHERE p.creator=s.staffID 
AND r.roleID=s.role 
AND t.treatmentID=p.treatmentID
AND v.visitNo=p.visitNo 
AND v.patientID=(SELECT patientID 
                FROM Patient 
                WHERE fName = ? 
                AND lName=?);
                
#find the patient who has been in the hospital the most
SELECT p.fName, p.lName, p.patientID, p.gender, p.email, a.street, a.city, a.postcode, COUNT(*) AS TotalVisits 
FROM Visit v, Patient p, Address a 
WHERE v.patientID=p.patientID 
AND a.addressID=p.addressID 
GROUP BY patientID 
HAVING COUNT(*) = (SELECT MAX(a.CNT) 
					FROM (SELECT COUNT(*) AS CNT 
                    FROM Visit GROUP BY (patientID)) AS a);
                    
#discharge a patient from the hospital
UPDATE Visit 
SET dischargeDate = ? 
WHERE patientID = (SELECT patientID 
					FROM Patient 
                    WHERE fName = ? 
                    AND lName=?);

#find patient
SELECT p.fName, p.lName, p.patientID, p.gender, p.email, a.street, a.city, a.postcode 
FROM Patient p, Address a 
WHERE fName=? 
AND lName=? 
AND p.addressID = a.addressID;