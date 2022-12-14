CREATE TABLE IF NOT EXISTS Requests (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  USER_ID INTEGER NOT NULL,
  SUBJECT VARCHAR(20) NOT NULL,
  DESCRIPTION VARCHAR(256),
  CATEGORY VARCHAR(10) NOT NULL,
  PRIORITY VARCHAR(6) NOT NULL,
  STATUS VARCHAR(7) NOT NULL,
  COMMENT VARCHAR(500)
);