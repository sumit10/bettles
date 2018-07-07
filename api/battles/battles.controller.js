const _ = require('lodash');
const Battles =  require('./battles.model');
const {apiError, getMode} =  require('../util');

exports.list = async (req, res) =>{
    try { 
        let locations = await Battles.distinct('location');
        res.send({
            location : locations,
            message : "Places where battles occour"
        });
    } catch (err) {
        apiError(res,err);
    }
} 

exports.count = async (req, res) =>{
    try { 
        let count = await Battles.count();
        res.send({
            count:count,
            message:`Total number of battle occurred : ${count}`
        });
    } catch (err) {
        apiError(err);
    }
}

exports.stats = async (req, res) =>{
    try { 
        let data = await Battles.find();

        let attakerKingMode = getMode(data.map(d => d.attacker_king).filter(d => d)); 
        let defenderKingMode = getMode(data.map(d => d.defender_king).filter(d => d));
        let regionMode = getMode(data.map(d => d.region).filter(d => d));
        let nameMode = getMode(data.map(d => d.name).filter(d => d));

        let attackerWin = data.filter(d => (d.attacker_outcome === "win")).length;
        let attackerLoss = data.filter(d => (d.attacker_outcome === "loss")).length;

        let battleType = _.uniqBy(data,'battle_type').map(d => d.battle_type).filter(d => d);
        
        let defenderData = data.map(d => d.defender_size).filter(d => d);
        let defenderMin = _.min(defenderData)
        let defenderMax = _.max(defenderData)
        let defenderAverage = defenderData.reduce((t, n) => t + n)/defenderData.length;


        res.send({
            most_active:{
                attacker_king:attakerKingMode,
                defender_king:defenderKingMode,
                region:regionMode,
                name:nameMode
            },
            attacker_outcome:{
                win:attackerWin,
                loss:attackerLoss
            },
            battle_type:battleType,
            defender_size:{
                average : defenderAverage,
                min : defenderMin,
                max : defenderMax
            }
        });
    } catch (err) {
        apiError(res,err);
    }
}

exports.search = async (req, res) =>{
    try {
        let king = req.query.king;
        if(!king){
            return apiError(res,{message: "King is required field in query parameter"},422);
        }
        let query = {
            $or: [
                { 'attacker_king': king },
                { 'defender_king': king }
            ]
        };
        if(req.query.location){
            query["location"] = req.query.location;
        }
        if(req.query.type){
            query["battle_type"] = req.query.type;
        }
        let data = await Battles.find(query);
        res.send({
            data:data,
            message:`Search result count ${data.length}`
        });
    } catch (err) {
        apiError(res,err);
    }
   
}