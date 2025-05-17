const db = require('./db');
const { faker } = require('@faker-js/faker');

for (let i=0; i<20; i++) {
    const userName = faker.name.fullName();
    const email = faker.internet.email();
    const password = 'password'
;
    const sql = "INSERT INTO users (userName, password, email) VALUES (?, ?, ?)";

    db.query(sql, [userName, password, email], (err, results)=>{
        if(err) {
            console.log("Data insert error");
        }else{
            console.log("Insert users successully!");
        }
    })
}