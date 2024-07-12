DROP TABLE IF EXISTS issued_certificates;
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS forums;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id                 SERIAL PRIMARY KEY,
    username          VARCHAR(50)  NOT NULL UNIQUE,
    password           VARCHAR(100) NOT NULL,
    email              VARCHAR(100) NOT NULL UNIQUE,
    user_type          VARCHAR(20)  NOT NULL CHECK (user_type IN ('student', 'instructor', 'admin')),
    first_name         VARCHAR(50)  NOT NULL,
    last_name          VARCHAR(50)  NOT NULL,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses
(
    id                 SERIAL PRIMARY KEY,
    course_name        VARCHAR(100) NOT NULL,
    course_description TEXT,
    course_code        VARCHAR(20)  NOT NULL UNIQUE,
    instructor_id      INT          NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lessons
(
    id                 SERIAL PRIMARY KEY,
    lesson_name        VARCHAR(100) NOT NULL,
    lesson_description TEXT,
    lesson_content     TEXT,
    course_id          INT          NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments
(
    id                     SERIAL PRIMARY KEY,
    assignment_name        VARCHAR(100) NOT NULL,
    assignment_description TEXT,
    due_date               DATE         NOT NULL,
    course_id              INT          NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE submissions
(
    id              SERIAL PRIMARY KEY,
    assignment_id   INT NOT NULL REFERENCES assignments (id) ON DELETE CASCADE,
    student_id      INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_path       VARCHAR(200),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE grades
(
    id            SERIAL PRIMARY KEY,
    submission_id INT NOT NULL REFERENCES submissions (id) ON DELETE CASCADE,
    grade         DECIMAL(5, 2),
    feedback      TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments
(
    id                         SERIAL PRIMARY KEY,
    student_id                 INT  NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    course_id                  INT  NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
    enrollment_date            DATE NOT NULL,
    created_at                 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at                 TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE certificates
(
    id               SERIAL PRIMARY KEY,
    course_id        INT REFERENCES courses (id) ON DELETE CASCADE,
    certificate_name VARCHAR(100) NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE issued_certificates
(
    id             SERIAL PRIMARY KEY,
    certificate_id INT  NOT NULL REFERENCES certificates (id) ON DELETE CASCADE,
    user_id        INT  NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    issue_date     DATE NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insert admin to db
INSERT INTO users (username, password, email, user_type, first_name, last_name, created_at, updated_at)
VALUES ('Admin', 'Admin@123', 'admin@example.com', 'admin', 'ADMIN', 'TESTER', NOW(), NOW());
