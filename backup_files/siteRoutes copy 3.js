const router = require("express").Router();
const Sites = require("../models/sites");

//get sites ---------------------------------------------------------------------------------------------------

router.get('/sites', (req, res) => {
  Sites.find().exec((err, sites) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    return res.status(200).json({
      success: true,
      MobiAug: [50, 78, 90, 56, 45, 76, 98, 37, 87, 98, 76], // sample data sent from backend to front end as MobiAug

      chartDataForFrontEnd: getchartData(sites),  // Graph data of number of sites Mobilized in each month sending to front end Appwebsitevisits

    });
  });
});

// -------------------------------Mobilzed Data----------------------------------------------------------------

function getchartData(sites) {
  var chartData = []
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // let myarray = chartData, cumilative = [];

  for (var i = 0; i < 12; i++) {

  //  for (let j = 0, s = myarray[0]; j < myarray.length; j++,
  //   s += myarray[j]) cumilative.push(s);

      chartData[i] = {
              mobilizedData:sites.filter((obj) => (obj["Mobilized"] === month[i])).length,
              installedData:sites.filter((obj) => (obj["Installed"] === month[i])).length,
              commissionedData:sites.filter((obj) => (obj.Commissioned_date.split('-')[1] === month[i])).length,
              sarData:sites.filter((obj) => (obj.SAR_Doc.split('-')[1] === month[i])).length,
              patData:sites.filter((obj) => (obj.PAT_pass_date.split('-')[1] === month[i])).length,
              onairData:sites.filter((obj) => (obj.On_air_date.split('-')[1] === month[i])).length
            }
            // console.log(chartData);
      }



// ------------------------------------------------------------------------------------------------------------
      
      let result = chartData.map((x,i) => ({
          mobilizedData:chartData.slice(0,i+1).map(({mobilizedData}) => mobilizedData).reduce((x,y) => x + y),
          installedData:chartData.slice(0,i+1).map(({installedData}) => installedData).reduce((x,y) => x + y),
          commissionedData:chartData.slice(0,i+1).map(({commissionedData}) => commissionedData).reduce((x,y) => x + y),
          sarData:chartData.slice(0,i+1).map(({sarData}) => sarData).reduce((x,y) => x + y),
          patData:chartData.slice(0,i+1).map(({patData}) => patData).reduce((x,y) => x + y),
          onairData:chartData.slice(0,i+1).map(({onairData}) => onairData).reduce((x,y) => x + y)
      }));
  
       console.log(result);



// ------------------------------------------------------------------------------------------------------------      

      // var myValue = []

      // for (let i = 0; i < 6; i++) {


      // var x = result.map(function (obj) {
      // var myKey = Object.keys(obj)[i]
      // myValue[i] = Object.values(obj)[i]

      // return {name: myKey, type: 'column', data: myValue}
      // })
      // console.log(x)
      // }


// ------------------------------------------------------------------------------------------------------------
  return result;
}

module.exports = router;
