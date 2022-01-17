var express = require('express');
var router = express.Router();
var pool= require('./Pool')
var upload= require('./Multer')
var fs = require('fs');
/* GET home page. */
router.post('/adddepartment',upload.single('departmenticon'),function(req, res, next) {
  pool.query("insert into department (departmentname, departmenticon) values(?,?)",[req.body.departmentname,req.filename],function(error,result){
  if(error)
  {   console.log(error)
      res.status(500).json({result:false,msz:'Server Error....'})
  }
  else
  {
    res.status(200).json({result:true,msz:'Submitted....'})
  }
})
});
router.get('/displayalldepartment',function(req, res) {
  pool.query("select * from department",function(error,result){
  if(error)
  {   console.log(error)
      res.status(500).json({result:[]})
  }
  else
  {
    res.status(200).json({result:result})
  }
})
});
router.post('/editdepartmentdata',function(req, res, next) {
  pool.query("update department set departmentname=? where departmentid=?",[req.body.departmentname,req.body.departmentid],function(error,result){
  if(error)
  {   console.log(error)
      res.status(500).json({result:false,msz:'Server Error....'})
  }
  else
  {
    res.status(200).json({result:true,msz:'Edit Department Successfully....'})
  }
})
});
router.post('/editdepartmenticon',upload.single('departmenticon'),function(req, res, next) {
  pool.query("update department set departmenticon=? where departmentid=?",[req.filename,req.body.departmentid],function(error,result){
  if(error)
  {   console.log(error)
      res.status(500).json({result:false,msz:'Server Error....'})
  }
  else
  {
    res.status(200).json({result:true,msz:'Icon Edited Successfully....'})
  }
})
});
router.post('/deletedepartment',function(req, res, next) {
  pool.query("delete from department where departmentid=?",[req.body.departmentid],function(error,result){
  if(error)
  {   console.log(error)
      res.status(500).json({result:false,msz:'Server Error....'})
  }
  else
  {
    fs.unlink('d:/lms_backend/public/images'+req.body.departmenticon);
    res.status(200).json({result:true,msz:'Deleted Successfully....'})
  }
})
});


module.exports = router;
