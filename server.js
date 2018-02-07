const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
//const sse = require('./model/sse');
const port = process.env.PORT || 5000;
const InUseList = [
  {
    id: 1,
    inUse: false,
    lastUpdate: -1,
    duration: 0,
  },
  {
    id: 0,
    inUse: false,
    lastUpdate: -1,
    duration: 0,
  },
  {
    id: 'B3FA',
    inUse: false,
    lastUpdate: -1,
    duration: 0,
  },
  {
    id: 'B3FB',
    inUse: false,
    lastUpdate: -1,
    duration: 0,
  },
  {
    id: 4,
    inUse: false,
    lastUpdate: -1,
    duration: 0,
  },
  {
    id: 5,
    inUse: false,
    lastUpdate: -1,
    duration: 0,
  }];

// get index of toilet
var findIdx = (id) => {
  return InUseList.findIndex(obj => obj.id === id);
};

// // write log when 
var writeToFile = (str) => {
  fs.app
  fs.appendFile('data.txt', new Date() + str + '\n', function (err) {
    if (err) {
      // append failed
      console.log('log saved failed');
    } else {
      console.log('log saved');
    }
  })
};

// var writeToFile = (sText) => { 
//   var fso = new ActiveXObject("Scripting.FileSystemObject"); 
//   var s = fso.CreateTextFile("./data.txt", true); 
//   s.WriteLine(new Date() + sText); 
//   s.Close(); 
// } 
  

// get body from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

// get
app.get('/api/status', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send({ toiletlist: InUseList });
});

// app.get('/connect',function(req,res){
//     sse.loginSSE(req,res);
// });

// app.get('/api/updates', sseExpress, function(req, res) {
//   res.sse([{
//     data: 'hello'
//   }, {
//     // send id to user
//     event: 'connected',
//     data: {
//       id: 123
//     }
//   }]);
// });

// // post change
// app.post('/api/change', (req, res, next)=>
// {
//     if(req.body.name)
//     {
//         sse.sendSSE({name:req.body.name});
//         res.end();
//     }
// });


// post
app.post('/api/status', (req, res) => {
  var data = {
    id: req.body.id,
    inUse: req.body.inUse,
    lastUpdate: -1,
    duration: 0,
  };

  // check arguments
  if (data.id == undefined || data.inUse == undefined) {
    res.send('Bad input arguments');
    return;
  }

  res.send({
    id: data.id,
    inUse: data.inUse
  });

  let index = findIdx(data.id);
  let updateTime = new Date().getTime();
  data.lastUpdate = updateTime;

  // print log 
  console.log('call time:' + new Date(), ' id:' + data.id, ' inUse:' + data.inUse);
  console.log('index in Array = ' + findIdx(data.id));
  data.inUse = (data.inUse) === 'true' || (data.inUse) === 'True';

  // check toilet id existence
  if (index !== -1) {
    if(data.inUse) console.log("toilet:" + data.id," 有人在使用")
    else console.log("toilet:" + data.id," 目前是空的")
    let prevData = InUseList[index];

    // check status change 
    if (prevData.inUse !== data.inUse) {
      writeToFile(JSON.stringify(prevData));
      console.log('status changed!');
      data.duration = 0;
    } else {
      let diffSec = (updateTime - prevData.lastUpdate) / 1000;
      if(diffSec > 30)  writeToFile('id:' + data.id + ' has no data update for 30 seconds');
      data.duration = prevData.duration + diffSec;
      console.log('duration:', data.duration);
    }
    InUseList[index] = data;
  }
  // insert new data 
  // else {
  //   InUseList.push(data);
  // }


});


app.listen(port, () => console.log(`Listening on port ${port}`));
