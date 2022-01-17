var express = require('express');
var router = express.Router();
var pool= require('./Pool')
var upload= require('./Multer')

router.post('/displayallcoursesbyid',function(req, res) {
    pool.query("select * from courses where departmentid=?",[req.body.departmentid],function(error,result){
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
  router.post('/addsubject',function(req, res, next) {
    pool.query("insert into subjects (departmentid, courseid, semester, subjectname, type, subjectmarks) values(?,?,?,?,?,?)",[req.body.departmentid,req.body.courseid,req.body.semester,req.body.subjectname,req.body.type,req.body.subjectmarks],function(error,result){
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
  router.post('/displayallsemesterbyid',function(req, res) {
    pool.query("select * from courses where courseid=?",[req.body.courseid],function(error,result){
    console.log(req.body)
      if(error)
    {   console.log(error)
        res.status(500).json({result:[]})
    }
    else
    { console.log(req.result)
      res.status(200).json({result:result})
    }
  })
  });
  router.get('/displayallsubjects',function(req, res) {
    pool.query("select S.*,(select D.departmentname from department D where D.departmentid=S.departmentid) as departmentname,(select C.coursename from courses C where C.courseid=S.courseid) as coursename from subjects S",function(error,result){
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
 
  router.post('/editsubjectdata',function(req, res, next) {
    pool.query("update subjects set departmentid=?, courseid=?, semester=?, subjectname=?, type=?, subjectmarks=? where subjectid=?",[req.body.departmentid,req.body.courseid,req.body.semester,req.body.subjectname,req.body.type,req.body.subjectmarks,req.body.subjectid],function(error,result){
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

router.post('/deletesubject',function(req, res, next) {
    pool.query("delete from subjects where subjectid=?",[req.body.subjectid],function(error,result){
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

  router.post('/displayallsubjectsbycourseid',function(req, res) {
    pool.query("select * from subjects where courseid=?",[req.body.courseid],function(error,result){
    console.log(req.body)
      if(error)
    {   console.log(error)
        res.status(500).json({result:[]})
    }
    else
    { console.log(req.result)
      res.status(200).json({result:result})
    }
  })
  });

module.exports = router;