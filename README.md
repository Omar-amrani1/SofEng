## Notes

The tables "availability" and "room" do the same thing. I've used the room table for checking and changing status, but this can be aended if anyone wishes



### Basic notes for running

Get "https://nodejs.org/en/"

In a console, run 

>npm install mysql2

Get the relevant repository or installer from "https://dev.mysql.com/downloads/" (Refer to "https://dev.mysql.com/doc/mysql-getting-started/en/" to identify which one to use)

Create 'hss_smart_rentals' database (empty)

Restore the included dump with

>mysql -u root -p password < C:\Location\To\dump.sql
>
(use the password you setup MySql with)

If you used a different password or using a separate user, change credentials used in app.js


### Things that I haven't started doing yet

Mess around with "styles.css" to make pages look nicer (may need to add html containers for layout styling)

Replace sent password with SHA-256 hash in script.js ; Add table in sql for storing hash to compare

Create the 'landlord_property' table mentioned in the EDR ; Branch from logon script ('/login' fetch in script.js) depending on if landlord or regular user
