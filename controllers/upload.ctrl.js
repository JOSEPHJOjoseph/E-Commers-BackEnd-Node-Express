// upload.ctrl.js

const uploadCtrl = {
    sendFileName: (req, res) => {
        if (req.file) {
            res.status(200).json({
                status: "Uploaded the file successfully",
                fileName: req.file.filename // Access the file's filename
            });
        } else {
            res.status(400).send('No file uploaded.');
        }
    }
};

module.exports = uploadCtrl;
