const {getAllPlanets}=require('../../models/planets.model');
async function httpGetAllPlanets(req,res){
    const ans=await getAllPlanets();
return res.status(200).json(ans);
}

module.exports={httpGetAllPlanets};