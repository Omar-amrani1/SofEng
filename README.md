### Basic notes for running

Get "https://nodejs.org/en/"

In a console, run 

>npm install mysql2

Get the relevant repository or installer from "https://dev.mysql.com/doc/mysql-getting-started/en/"

Create 'hss_smart_rentals' database (empty)

Restore the included dump with

>mysql -u root -p password < C:\Location\To\dump.sql
>
(use the password you setup MySql with)

If you used a different password or using a separate user, change credentials used in app.js
