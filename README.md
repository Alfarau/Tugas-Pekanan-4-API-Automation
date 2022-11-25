# Tugas-Pekanan-4-API-Automation
Tugas Bootcamp Sanbercode
Alfarau Al Ababil
alfarau.id@gmail.com

script:
    - npx mocha .\API\script\api-adequateshop.js
    - npx mocha .\API\script\api-bookings.js
    - npx mocha .\API\script\api-adequateshop.js --reporter mochawesome
    - npx mocha .\API\script\api-bookings.js --reporter mochawesome
