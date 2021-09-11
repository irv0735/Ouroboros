CREATE DATABASE lucid_db;

USE lucid_db;

CREATE TABLE site_user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name CHAR(30) NOT NULL,
  last_name CHAR(50) NOT NULL,
  birthday DATE
)

CREATE TABLE user_journal (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  site_user_id INT,
  journal_entry TEXT,
  assessed_feeling VARCHAR(50),
  FOREIGN KEY (site_user_id)
  REFERENCES site_user(id)
  ON DELETE SET NULL
) 

CREATE TABLE daily_stat (
  id INT NOT NULL AUTO-INCREMENT PRIMARY KEY,
  site_user_id INT,
  sleep_hours INT,
  stat_day DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  user_feeling VARCHAR(50),
  meditate BOOLEAN DEFAULT 0,
  FOREIGN KEY (site_user_id)
  REFERENCES site_user(id)
  ON DELETE SET NULL
)