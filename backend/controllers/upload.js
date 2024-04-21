const cloudinary = require('cloudinary');
const fs = require('fs');


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.CLOUD_API_SECRET
})
const uploadImages = async(req,res) =>{
    // console.log(req.files) 
    try {
        const {path} = req.body;
        let files = Object.values(req.files).flat();
        console.log(files)
        let images = [];
        for(const file of files){
            const url = await uploadCloudinary(file,path);
            images.push(url);
            removeTemp(file.tempFilePath);
        }
        res.send(images)
    } catch (error) {
        return res.status(500).send({msg:error.message})
    }
}
const uploadCloudinary = async(file,path) =>{
    return new Promise((resolve)=>{
        cloudinary.v2.uploader.upload(
            file.tempFilePath,{
                folder:path,
            },
            (err,res)=>{
                if(err){
                    removeTemp(file.tempFilePath);
                    return res.status(400).send({
                        msg:"upload image failed"
                    })
                }
                resolve({
                    url:res.secure_url,
                })
            }
        )
    })
}

const removeTemp=(path) =>{
    fs.unlink(path,(err)=>{
        if(err){
            throw err;
        }
    })
}

module.exports = {
    uploadImages
}