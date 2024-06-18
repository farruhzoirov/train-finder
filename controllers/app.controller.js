const path = require("path");
const fs = require("fs/promises");

exports.getMainPage = async (req, res) => {
   res.render('app');
};



// Getting all data
exports.getAllData = async (req, res) => {
   try {
      const dbPath = path.join('db', 'db.json');
      const data = JSON.parse(await fs.readFile(dbPath, {encoding: 'utf-8'})) || [];
      if (!data) {
         return res.status(404).json({
            ok: false,
            message: "No such database"
         })
      }
      res.status(200).json({
         ok: true,
         data:data
      })
   } catch (e) {
      console.log("Getting all data", e);
      return res.status(500).json({
         ok: false,
         error: e
      })
   }
}


// To find data
exports.findData = async (req, res) => {
   try {
      const { number } = req.body;
      console.log(number);

      const data = JSON.parse(await fs.readFile(path.join('db', 'db.json'), { encoding: 'utf-8' }));

      const index = data.findIndex((item) => +item.number.slice(-4) === +number);
      if (index === -1) {
         return res.status(404).send({
            ok: false,
            message: 'Data does not exist'
         });
      }

      const findData = data[index];

      return res.status(200).json({
         ok: true,
         data: findData,
         index: index
      });
   } catch (e) {
      console.log('Getting location data', e);
      return res.status(500).send({
         ok: false,
         message: 'Internal Server Error'
      });
   }
};

//
//
// exports.findRealtimeData = async (req, res) => {
//       try {
//          const { number } = req.body;
//          console.log(number)
//          const data = JSON.parse(await fs.readFile(path.join('db', 'db.json'), { encoding: 'utf-8' }));
//
//          const matchedData = data.filter(item => +item.number.includes(number));
//
//          if (matchedData.length === 0) {
//             return res.status(404).send({
//                ok: false,
//                message: 'Data does not exist'
//             });
//          }
//
//          return res.status(200).json({
//             ok: true,
//             data: matchedData
//          });
//       } catch (e) {
//          console.log('Getting location data', e);
//          return res.status(500).send({
//             ok: false,
//             message: 'Internal Server Error'
//          });
//       }
// }