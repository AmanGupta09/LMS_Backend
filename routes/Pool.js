var mysql=require("mysql")

var Pool=mysql.createPool({
host:'localhost',
port:3306,
user:'root',
password:'123',
database:'lms',
connectionLimit:100
})
module.exports=Pool