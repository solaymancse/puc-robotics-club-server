const fs = require("fs");

module.exports = (req, res, next) => {
  // check file exit
  if (typeof req.file === "undefined" || typeof req.body === "undefined")
    return res.status(400).json({ msg: "Issue with uploading this image." });

  // app use upload
  let image = req.file.path;

  // file type
  if (
    !req.file.mimtype.includes("jpeg") &&
    !req.file.mimtype.includes("jpg") &&
    !req.file.mimtype.includes("png")
  ) {
    //file remove
    fs.unlinkSync(image);
    return res.status(400).json({ msg: "this file is not supported" });
  }
  //file size
  if (req.file.size > 1024 * 1024) {
    // remove file
    fs.unlinkSync(image);
    return res.status(400).json({ msg: "This file size is large (max: 1MB)." });
  }
  // succes
  next();
};
