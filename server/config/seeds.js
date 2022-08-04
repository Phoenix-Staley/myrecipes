const db = require("./connection");
const { Recipe, Tag, User } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  const seedUser1 = await User.create({
    username: "pamWash",
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
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
    { name: "Vegan" },
    { name: "Weeknight Dinner" },
    { name: "Healthy" },
    { name: "Vegetarian" },
    { name: "Baking" },
    { name: "Easy to Save Leftovers" },
  ]);

  console.log("tags seeded");

  await Recipe.deleteMany();

  const recipes = await Recipe.insertMany([
    {
      description:
        "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
      title: "Tacos",
      ingredients: [
        "Corn Tortillas",
        "Red Onion",
        "Cilantro",
        "Pork Shoulder",
        "Avocado",
        "Lime",
      ],
      steps: ["step 1", "step 2", "step 3"],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/tacos.jpg",
      creator: seedUser1._id,
      tags: [tags[0]._id, tags[1]._id],
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor lectus nibh. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
      title: "Blueberry Scones",
      ingredients: [
        "AP Flour",
        "Granulated Sugar",
        "Baking Powder",
        "Ground Cinnamon",
        "Salt",
        "Unsalted Butter",
      ],
      steps: ["step 1", "step 2", "step 3"],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/scones.jpg",
      creator: seedUser1._id,
      tags: [tags[2]._id, tags[3]._id],
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
      description:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Cras ultricies ligula sed magna dictum porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
      title: "Avodado Toast",
      ingredients: ["Avocado", "Toast"],
      steps: ["step 1", "step 2", "step 3"],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/Avocado_toast.png",
      creator: seedUser2._id,
      tags: [tags[1]._id, tags[5]._id],
    },
    {
      description:
        "Donec rutrum congue leo eget malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.",
      title: "Hamburger",
      ingredients: [
        "Burger Bun",
        "Ground Beef",
        "Cheese",
        "Tomato",
        "Lettuce",
        "Pickles",
        "Mayonaise",
        "Onion",
        "Ketchup",
        "Mustard",
      ],
      steps: ["step 1", "step 2", "step 3"],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/burger.jpg",
      creator: seedUser2._id,
      tags: [tags[5]._id],
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
