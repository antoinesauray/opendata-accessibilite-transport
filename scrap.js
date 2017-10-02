
var express = require('express')
var sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;
var fs = require('fs');

let db = new sqlite3.Database('./geo_sirene.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
    app.get('/', async (req, res, next) => {
        out = {type: "MultiPoint", coordinates: []}        
        db.serialize(() => {
            db.each('SELECT latitude, longitude from "geo-sirene_44" WHERE EFETCENT > 10', 
            function item(err, row){ 
                out["coordinates"].push([parseFloat(row.latitude), parseFloat(row.longitude)])
            },
            function complete(err, found) {
                fs.writeFile("output.geojson", JSON.stringify(out), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                }); 
            });
          });
          db.close()
    });
  });

  app.listen(port, function () {
    console.log('Example app listening on port 3000!')
  })
  
