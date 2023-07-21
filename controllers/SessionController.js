const Session = require("../Models/Session");


const createSession =  async (req, res)=> {
    const {year} = req.body;
    try {
            const savedSession = new Session({year});
            await savedSession.save();
            return res.status(200).json(savedSession);
    } catch (error) {
        res.status(400).json(error.message);
    }
}
const getALlSession =  async (req, res)=> {
    try {
        const sessions = await Session.find().sort({ $natural: -1});
        res.status(200).json(sessions);
    
    } catch (error) {
        res.status(400).json(err);
    }
}
const getLastSession =  async (req, res)=> {
    try {
        const sessions = await Session.find().sort({ "year": -1}).limit(1);
        if (sessions.length > 0) {
            res.status(200).json(sessions[0]._id);
          } else {
            res.status(404).json({ error: "No sessions found" });
          }
       
        
    
    } catch (error) {
        res.status(400).json(err);
    }
}
const deleteSession =  async (req, res)=> {
    try {
        const deleteSession = await Session.findById(req.params.id);
        await deleteSession.delete();
        res.status(200).json({msg:"Delete Session Successful."});
    
    } catch (error) {
        res.status(400).json(err);
    }
}

exports.createSession = createSession;
exports.getALlSession = getALlSession;
exports.deleteSession = deleteSession;
exports.getLastSession = getLastSession;