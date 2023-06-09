require('./connection');
const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const userRoute = require('./routes/UserRoute');
const eventRoute = require('./routes/EventRoute');
const NoticeRoute = require('./routes/NoticeRoute');
const SeminerRoute = require('./routes/SeminerRoute');
const SessionRoute = require('./routes/SessionRoute');
const CommitteeRoute = require('./routes/CommitteeRoute');
const GallaryRoute = require('./routes/GallaryRoute');
const AchivementRoute = require('./routes/AchivementRoute');
const PrcRoute = require('./routes/PRCRoute');

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileupload({
    useTempFiles:true
}))
const config = require('./config');
const {allowedDomains} = config;
app.use(cors({origin: allowedDomains}));

// router
app.use('/api', userRoute);
app.use('/api', eventRoute);
app.use('/api', NoticeRoute);
app.use('/api', SeminerRoute);
app.use('/api', SessionRoute);
app.use('/api', CommitteeRoute);
app.use('/api', GallaryRoute);
app.use('/api', AchivementRoute);
app.use('/api', PrcRoute);


// server
app.listen(5000, (err)=>{
if(!err){
    console.log("Server is Running!");
}else{
    console.log("Server Error", err);
}
})