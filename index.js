const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

async function init() {
  try {
    
    const connection = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await connection.connection.dropDatabase();

    console.log("Connected to the database sucessfully");

    const newRecipe = await Recipe.create({
      title: "Calamari Pasta",
      level: "Amateur Chef",
      ingredients: ["1/2 pound penne pasta",
        "3 tablespoons extra-virgin olive oil",
        "4 cloves garlic, finely chopped",
        "1/4 teaspoon dried crushed red pepper",
        "3 Roma tomatoes, diced",
        "1 pound squid (calamari), tentacles and tubes, sliced into rings",
        "2 tablespoons lemon juice",
        "1/4 cup chopped fresh parsley, plus more for garnish"],
      cuisine: "mediterranean",
      dishType:  "main_course",
      image: "https://www.weightwatchers.com.au/images/3081/dynamic/foodandrecipes/2016/02/LemonSpaghettiPrawnsCalamari_XXL.jpg",
      duration: 30,
      creator: "Angelo Raimondi",
      created:  new Date().toLocaleString(),
      }
  );
    console.log("Created Recipe => ", newRecipe.title);
    
    await Recipe.insertMany(data);

    const titles = await Recipe.find().select({ "title": 1, "_id": 0})

    console.log(titles);

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { "duration": 100 } },
      { new: true }
    );
    
    console.log("Updated successfully!", updatedRecipe);

    const deleteRecipe = await Recipe.deleteOne({
      title: "Carrot Cake",
    });
    
    console.log("Deleted successfully!", deleteRecipe);

    mongoose.disconnect();
  } catch (err) {
    console.error("Database connection error: ", err);
  }
}

init();




// Connection to the database "recipe-app"
// mongoose.connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });