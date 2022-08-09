const db = require("./connection");
const { Recipe, Tag, User } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  const seedUser1 = await User.create({
    username: "demoUser",
    firstName: "Demo",
    lastName: "User",
    email: "demo@user.com",
    password: "password",
    savedRecipes: [],
    postedRecipes: [],
  });

  const seedUser2 = await User.create({
    username: "eliHolt",
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
    savedRecipes: [],
    postedRecipes: [],
  });

  console.log("users seeded");

  await Tag.deleteMany();

  const tags = await Tag.insertMany([
    { name: "vegan" },
    { name: "weeknight dinner" },
    { name: "healthy" },
    { name: "vegetarian" },
    { name: "baking" },
    { name: "easy to save leftovers" },
    { name: "burger" },
    { name: "western" },
    { name: "dinner" },
    { name: "lunch" },
    { name: "breakfast" },
    { name: "dessert" },
  ]);

  console.log("tags seeded");

  await Recipe.deleteMany();

  const recipes = await Recipe.insertMany([
    {
      description: "Delicious carnitas tacos",
      title: "Carnitas Tacos",
      ingredients: [
        "Corn Tortillas",
        "White Onions",
        "Cilantro",
        "2.5 lb Pork Shoulder",
        "Lime",
        "Cumin",
        "Dried Oregano",
      ],
      steps: [
        "Add 1 tsp cumin, 1 tsp oregano, 1 whole white onion (quartered), and entire pork shoulder to large pot of water and bring to slow boil.  Cook until the meat reaches 145 degF in the center.",
        "Heat oven to 350 degF.  Once meat reaches temp, break meat into small chunks and place fat side up on a baking tray and place into oven for approximately 30 minutes (until meat chunks get crispy).",
        "While meat is in oven, prepare taco toppings: fine dice white onion and fine chop cilantro.  Cut lime wedges into quarters",
        "Remove meat from oven and shred.",
        "Heat tortillas (best over a fire, or on a flat top, but in the microwave (wrapped in a cloth) works in a pinch), and serve.",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/tacos.jpg",
      creator: seedUser1._id,
      tags: [tags[8]._id, tags[5]._id],
    },
    {
      description: "Buttery, crumbly, flaky scones",
      title: "Blueberry Scones w/ Icing",
      ingredients: [
        "2 cups AP Flour",
        "1/2 cup Granulated Sugar",
        "2 1/2 tsp Baking Powder",
        "1 tsp Ground Cinnamon",
        "1/2 tsp Salt",
        "1/2 cup Frozen Unsalted Butter",
        "1/2 cup Heavy Cream",
        "1 Large Egg",
        "1 1/2 tsp Pure Vanilla Extract",
        "1 cup Blueberries",
        "Vanilla Icing",
      ],
      steps: ["step 1", "step 2", "step 3"],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/scones.jpg",
      creator: seedUser1._id,
      tags: [tags[4]._id, tags[10]._id, tags[11]._id],
    },
    {
      description:
        "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus suscipit tortor eget felis porttitor volutpat. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
      title: "Pizza",
      ingredients: ["Flour", "Pepperoni", "Cheese"],
      steps: ["step 1", "step 2", "step 3"],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/pizza.jpg",
      creator: seedUser1._id,
      tags: [tags[4]._id],
    },
    {
      description: "Soft avocado sliced on a piece of whole-grain toast",
      title: "World's Best Avocado Toast",
      ingredients: ["Avocado", "Toast", "Flaky Salt"],
      steps: ["Spread avocado on toast", "Sprinkle salt on avocado"],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/Avocado_toast.png",
      creator: seedUser2._id,
      tags: [tags[2]._id, tags[3]._id, tags[10]._id],
    },
    {
      description: "A delicious western-style burger",
      title: "Western Comfort Burger",
      ingredients: [
        "1 yellow onion",
        "1 whole tomato",
        "1/2 lbs ground beef",
        "Kosher salt",
        "1 tbsp ground black pepper",
        "2 hamburger buns",
        "Condiments",
      ],
      steps: [
        "First, set out a large mixing bowl and add in the ground beef, crushed crackers, egg, Worcestershire sauce, milk, and spices. Use your hands to thoroughly combine until the mixture is very smooth.",
        "Next, press the meat down in the bowl, into an even disk. Use a knife to cut and divide the hamburger patty mixture into 6 and 1/3 pound grill or skillet patties, or 12 thin griddle patties. Like so:",
        "Set out a baking sheet, lined with wax paper or foil, to hold the patties. One at a time, gather the patty mix and press firmly into patties of your desired thickness. You typically want hamburger patties to be slightly larger than the buns they’ll be served on since they’ll shrink a bit in the cooking process.",
        "Place the formed patties on the baking sheet. With thick patties, press a dent in the center of each patty, so they don’t puff up while cooking.",
        "You can stack the patties with sheets of wax paper between layers if needed.",
        "Then, preheat the grill or a skillet to medium heat, approximately 350-400 degrees F.",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/burger.jpg",
      creator: seedUser2._id,
      tags: [tags[6]._id, tags[7]._id, tags[8]._id],
    },
  ]);

  console.log("recipes seeded");

  // section to add recipes to the posted and saved recipe arrays for each of the seeded users
  const user1Recipes = await Recipe.find({
    creator: seedUser1._id,
  });
  const user2Recipes = await Recipe.find({
    creator: seedUser2._id,
  });

  for (recipe of user1Recipes) {
    await User.findByIdAndUpdate(seedUser1._id, {
      $addToSet: { postedRecipes: [recipe._id] },
    });
  }
  await User.findByIdAndUpdate(seedUser1._id, {
    $addToSet: { savedRecipes: [user2Recipes[0]._id, user2Recipes[1]._id] },
  });

  for (recipe of user2Recipes) {
    await User.findByIdAndUpdate(seedUser2._id, {
      $addToSet: { postedRecipes: [recipe._id] },
    });
  }
  await User.findByIdAndUpdate(seedUser2._id, {
    $addToSet: { savedRecipes: [user1Recipes[0]._id, user1Recipes[1]._id] },
  });

  console.log("seeded users updated with posted and saved recipes");

  process.exit();
});
