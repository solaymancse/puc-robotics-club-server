const Notice = require("../Models/Notice");

const createNotice = async(req, res)=> {
    const {title, desc} = req.body;
    const cleanDesc = removeHtmlTags(desc);
   
    try {
        const savedNotice = new Notice({
            title,
            desc:cleanDesc,
        });

        await savedNotice.save();
        res.status(200).json({msg:savedNotice});
      

    } catch (error) {
        res.status(400).json(error);
    }
};

function removeHtmlTags (html){
    return html.replace(/<[^>]+>/g, '');
}
const getAllNotices = async(req, res)=> {
    try {
        
        const notices = await Notice.find().sort({$natural: -1});
        res.status(200).json(notices);

    } catch (error) {
        res.status(400).json(error);
    }
}
// const getAllNotices = async(req, res)=> {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const page_size = parseInt(req.query.limit) || 3;
//         const total = await Notice.countDocuments({});
//         const notices = await Notice.find({}).limit(page_size).skip(page_size * page);
     
//         res.status(200).json({notices,totalPages: Math.ceil( total / page_size  )});

//     } catch (error) {
//         res.status(400).json(error);
//     }
// }

// single notice

const getNotice = async (req,res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        res.status(200).json(notice);
    } catch (error) {
        res.status(400).json(error);
    }
}
// update notice

const updateNotice = async(req,res)=> {
    try {
        const notice = await Notice.findById(req.params.id);
        if(notice){
            try {
                await Notice.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body},
                    {new: true},
                );
                res.status(200).json({msg:"Updated Successfully..."});
            } catch (error) {
                res.status(400).json(error);
            } 
        }else{
            res.status(400).json({msg:"Can't find post..."})
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
// delete notice

const deleteNotice = async(req, res)=>{
    try {
        const notice = await Notice.findById(req.params.id);
        if(notice){
            await notice.delete();

            res.status(200).json({msg:"Deleted Successfully...."});
        }else{
            res.status(400).json({msg:"Can't find post ..."})
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.createNotice = createNotice;
exports.getAllNotices = getAllNotices;
exports.getNotice = getNotice;
exports.updateNotice = updateNotice;
exports.deleteNotice = deleteNotice;