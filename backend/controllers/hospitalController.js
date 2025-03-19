import hospitalModel from "../models/hospitalModel.js";

export const registerHospital = async(req,res) => {
    try {
        const {name, address, licenseNo, bio, rating} = req.body;

        const existinglicense = await hospitalModel.findOne({licenseNo});
        if(existinglicense){
            return res.status(400).send({
                success: false,
                message: "Hospital with this license already exists"
            })
        }

        const newHospital = new hospitalModel({
            name, address, licenseNo, bio, rating
        }).save();

        res.status(200).send({
            success: true,
            message: "Hospital registered successfully",
            hospital: newHospital
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured while registering hospital",
            error: error.message
        })
    }
}