-- Database export via SQLPro (https://www.sqlprostudio.com/allapps.html)
-- Exported by sajid at 31-05-2022 05:45.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.


-- BEGIN TABLE student_study_groups
DROP TABLE IF EXISTS student_study_groups;
CREATE TABLE `student_study_groups` (
  `studentStudyGroupID` int NOT NULL AUTO_INCREMENT,
  `studentID` int NOT NULL,
  `groupID` int NOT NULL,
  PRIMARY KEY (`studentStudyGroupID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserting 5 rows into student_study_groups
-- Insert batch #1
INSERT INTO student_study_groups (studentStudyGroupID, studentID, groupID) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 2, 3),
(4, 5, 2),
(5, 5, 1);

-- END TABLE student_study_groups

-- BEGIN TABLE students
DROP TABLE IF EXISTS students;
CREATE TABLE `students` (
  `studentID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `email` varchar(400) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `studentAddDate` datetime DEFAULT NULL,
  `studentChangeDate` datetime DEFAULT NULL,
  `dateOfBirth` datetime DEFAULT NULL,
  `placeOfBirth` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`studentID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserting 2 rows into students
-- Insert batch #1
INSERT INTO students (studentID, name, email, sex, studentAddDate, studentChangeDate, dateOfBirth, placeOfBirth) VALUES
(4, 'asasdf', 'aaaa@aa.com', 'asdfasdf', '2022-05-30 23:36:20', '2022-05-30 23:36:20', '2022-06-01 00:00:00', NULL),
(5, 'a', 'admin@xeride.com', 'a', '2022-05-30 23:40:30', '2022-05-30 23:40:30', '2022-06-01 00:00:00', 'aaaaaaaaaa');

-- END TABLE students

-- BEGIN TABLE study_groups
DROP TABLE IF EXISTS study_groups;
CREATE TABLE `study_groups` (
  `groupID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `leaderOfGroup` varchar(400) DEFAULT NULL,
  `subject` varchar(20) DEFAULT NULL,
  `timeOfStudy` datetime DEFAULT NULL,
  `noOfStudents` int unsigned DEFAULT NULL,
  PRIMARY KEY (`groupID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserting 5 rows into study_groups
-- Insert batch #1
INSERT INTO study_groups (groupID, name, leaderOfGroup, subject, timeOfStudy, noOfStudents) VALUES
(1, 'Lame Gamer Boys', 'William', 'lame gamer boys', '2022-05-10 18:45:14', 0),
(2, 'Biologist', 'William', 'biologist', '2022-05-10 18:45:14', 0),
(3, 'Chemistry Capital', 'William', 'chemistry Capital', '2022-05-10 18:45:14', 0),
(4, 'Web Designer', 'William', 'web Designer', '2022-05-10 18:45:14', 0),
(5, 'Black Magicians', 'William', 'black Magician', '2022-05-10 18:45:14', 0);

-- END TABLE study_groups

