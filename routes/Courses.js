var express = require('express');
var router = express.Router();
var pool= require('./Pool')
var upload= require('./Multer')

router.post('/addcourse',upload.single('courseicon'),function(req, res, next) {
    pool.query("insert into courses (departmentid, coursename, nosemester, feepersemester, icon) values(?,?,?,?,?)",[req.body.department,req.body.coursename,req.body.semesterno,req.body.feepersemester,req.filename],function(error,result){
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
  router.get('/displayallcourses',function(req, res) {
    pool.query("select C.*,(select D.departmentname from department D where D.departmentid=C.departmentid)as departmentname from courses C",function(error,result){
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
  router.post('/editcoursedata',function(req, res, next) {
    pool.query("update courses set departmentid=?, coursename=?, nosemester=?, feepersemester=? where courseid=?",[req.body.departmentid,req.body.coursename,req.body.semesterno,req.body.feepersemester,req.body.courseid],function(error,result){
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
  router.post('/editcourseicon',upload.single('courseicon'),function(req, res, next) {
    pool.query("update courses set icon=? where courseid=?",[req.filename,req.body.courseid],function(error,result){
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
  router.post('/deletecourse',function(req, res, next) {
    pool.query("delete from courses where courseid=?",[req.body.courseid],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    {
      res.status(200).json({result:true,msz:'Deleted Successfully....'})
    }
  })
  });

module.exports = router;