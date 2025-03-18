const Contact = require('../models/contactModel')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')

// create contact
exports.createContact = catchAsyncError(async(req,res) =>{

    const { name, email, phone, country, product, message } = req.body;
    console.log(req.body)
    const contact = await Contact.create({name, email, phone, country, product, message});

    res.status(201).json({
        success:true,
        contact
    });
})

// for getting all products
exports.getAllContact = catchAsyncError(async(req,res) =>{

    // const resultPerPage = 20;
    // const totalCount = await Contact.countDocuments();
    const { startDate, endDate } = req.query;
    let filter = {};

    if (startDate && endDate) {
        filter.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
        };
    }

    try {
        const contacts = await Contact.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }

    // const apiFeatures = new ApiFeatures(Contact.find(),req.query)
    // .search()     // search function
    // .filter()     // filter function
    // .pagination(resultPerPage);    // total result to show in 1 page

    // const contacts = await apiFeatures.query;

    // res.status(200).json({
    //     success:true,
    //     contacts,
    //     totalCount
    // });
})



// Delete the product - Admin -->
exports.deleteContact=catchAsyncError(async(req,res)=>{

    let contact = await Contact.findById(req.params.id);

    if(!contact){
        return res.status(500).json({
            success:false,
            message:"Contact not found"})
    }
    await Contact.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success:true,
        message:"Contact Deleted Successfully"})
})

