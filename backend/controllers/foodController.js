import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item

const addFood = async(req,res) =>{

    
    let image_filename=`${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        reviews: req.body.reviews

    })

    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

//all food list

const listFood = async(req,res) => {
      try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
      } catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
      }
}

// remove food item
const removeFood = async (req, res) => {
  try {
      // Find the food item by ID
      const food = await foodModel.findById(req.body.id);

      // If food is not found, return error
      if (!food) {
          return res.status(404).json({ success: false, message: "Food item not found" });
      }

      // Check if food has an image and if the image exists before attempting to delete
      const imagePath = `uploads/${food.image}`;
      if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image file
      }

      // Delete the food item from the database
      await foodModel.findByIdAndDelete(req.body.id);

      res.json({ success: true, message: "Food Removed" });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
  }
};

export {addFood,listFood,removeFood}