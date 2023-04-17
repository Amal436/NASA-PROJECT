const fs = require('fs');
const path=require('path');
const planets=require('./planets.mongo');
const { parse } = require('csv-parse');

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname,'..','..','Data','kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async(data) => {
                if (isHabitablePlanet(data)){
                    // ToDo: Replace create with upsert=update+insert
                    savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', async() => {
                const countPlanetsFound=(await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets are found!`);
                resolve();
            });
    })
}

async function getAllPlanets(){
   const ans= await planets.find({});
   //console.log(ans);
   return ans;
}

async function savePlanet(planet){
    try {
        await planets.updateOne({
            keplerName:planet.kepler_name
        },{
            keplerName:planet.kepler_name
        },{
            upsert:true,
        })  
    } catch (error) {
        console.error(`could not save planet ${error}`);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}

// As of now we are reading raw data from kepler_data.csv we need to parse so that we can understand the data

