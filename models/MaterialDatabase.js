const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const subSchemaheaderproperties = new mongoose.Schema({
  title: reqString,
  field: reqString,
});

const subSchemaproperties = new mongoose.Schema({
  // id: reqString,
  // name: reqString,
  // email: reqString,

  id: reqString,
  ERP_Description: reqString,
  Category: reqString,
});

const dataSchema = new mongoose.Schema({
  // projectID: {
  //   type: String,
  //   required: true,
  // },

  headerproperties: [subSchemaheaderproperties],
  properties: [subSchemaproperties],

  // headerproperties: [],

  // properties: [],
});

module.exports = mongoose.model("materialProjectsDatabase", dataSchema);

//    {
//        "headerproperties": [
//         {
//             "title":"ID",
//             "field":"id"

//         },
//         {
//             "title":"Name",
//             "field":"name"
//         },
//         {
//             "title":"Email",
//             "field":"email"
//         }
//     ],
//     "properties": [
//         {
//             "id":"1",
//             "name":"Harshana",
//             "email":"harshana@gmail.com"
//         },
//         {
//              "id":"2",
//             "name":"nuwan",
//             "email":"nuwan@gmail.com"
//         }

//     ]

// }

// ------------------------

//    {
//        "headerproperties": [
//         {
//             "title":"ERP Item Code",
//             "field":"id"

//         },
//         {
//             "title":"ERP Description",
//             "field":"ERP_Description"
//         },
//         {
//             "title":"Category",
//             "field":"Category"
//         }
//     ],
//     "properties": [
//     {
//       "id": "3M-RUBBER-SPLICING-TAPE-23-30",
//       "ERP_Description": "3M Rubber Splicing Tape 23 ¾”*30’",
//       "Category": "Qty"
//     },
//     {
//       "id": "3M-VINYL-PLASTIC-TAPE-33-66",
//       "ERP_Description": "3M Vinyl Plastic Tape 33+ ¾”*66’",
//       "Category": "Qty"
//     },
//     {
//       "id": "AG-DBANT900/1800",
//       "ERP_Description": "AGISSION DUEL BAND(900/1800) ANTENNA",
//       "Category": "Serial"
//     }

//     ]

// }
