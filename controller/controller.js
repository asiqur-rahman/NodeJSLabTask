var express=require('express');
var router=express.Router();

var adminLogin={user:'admin',pass:'1234'};
var empList=[{empNo:0,empName:'asd',empPhone:'asd',empAddress:'asd',empDesig:'asd',empGender:'asd'}];
var cEmp=null;

//login -- controller
router.get('/',function(req,res){
  res.render('login',{
    title:'Login | CMS'
  });
});

router.post('/',function(req,res){
  if(req.body.username==adminLogin.user && req.body.password==adminLogin.pass){
    res.redirect('/aDashboard');
  }
  else if(req.body.username === req.body.password){
    res.redirect('/eDashboard?id='+req.body.username);
  }
  else{
    res.redirect('/');
  }
});

router.get('/aDashboard',function(req,res){
  res.render('aDashboard',{
    title:'Dashboard | CMS'
  });
  // res.send('clicked');
});


//Admin -- controller
router.get('/addEmployee',function(req,res){
  res.render('addEmployee',{
    title:'Add Employee | CMS'
  });
});

router.post('/addEmployee',function(req,res){
  empList.push({
    empNo:empList.length,
    empName:req.body.Name,
    empPhone:req.body.Phone,
    empAddress:req.body.Address,
    empDesig:req.body.Desig,
    empGender:req.body.Gender
  });
  res.redirect('/addEmployee');
});

router.get('/AllEmpList',function(req,res){
  res.render('AllEmpList',{
    title:'See Employee List | CMS',
    array:empList
  });
});

router.post('/AllEmpList',function(req,res){
  res.render('AllEmpList',{
    title:'See Employee List | CMS',
    array:empList
  });
});

router.get('/edit',function(req,res){
  //console.log(req.query.id);
  var id=req.query.id;

  res.render('aUpdate',{
    title:'Update | CMS',
    array:empList[findEmpById(id)]
  });
});

router.post('/edit',function(req,res){
  //console.log(req.query.id);
  var id=req.query.id;
      id=findEmp(id);
  empList[id].empName=req.body.Name,
  empList[id].empPhone=req.body.Phone,
  empList[id].empAddress=req.body.Address,
  empList[id].empDesig=req.body.Desig,
  empList[id].empGender=req.body.Gender

  res.redirect('/aDashboard');
});

router.get('/delete',function(req,res){
  //console.log(req.query.id);
  var id=req.query.id;

  res.render('aDelete',{
    title:'Delete | CMS',
    array:empList[id]
  });
});

router.post('/delete',function(req,res){
  //console.log(req.query.id);
  var id=req.query.id;
  delete empList[id];
  res.redirect('/aDashboard');
});

function findEmpById(num){
    for(var i=0; i<empList.length; i++){
      if(empList[i].empNo==num){
        return i;
      }
    }
}

function findEmpByName(name){
    for(var i=0; i<empList.length; i++){
      if(empList[i].empName==name){
        return i;
      }
    }


//Employee -- Controller
router.get('/eDashboard',function(req,res){
  if(cEmp!=null)
    cEmp=req.query.id;

  cEmp=findEmpByName(req.query.id);

  res.render('Employee/dashboard',{
    title:'Dashboard | CMS'
  });
});

router.get('/profile',function(req,res){
  if(cEmp!=null){

  }
  console.log('profile : '+cEmp);
  res.render('eProfile',{
    title:'Profile | CMS',
    array:empList[cEmp]
  });
});

router.post('/update',function(req,res){
  var id=cEmp;

  empList[id].empName=req.body.Name,
  empList[id].empPhone=req.body.Phone,
  empList[id].empAddress=req.body.Address,
  empList[id].empDesig=req.body.Desig,
  empList[id].empGender=req.body.Gender
  res.redirect('/eDashboard');
});

module.exports=router;
