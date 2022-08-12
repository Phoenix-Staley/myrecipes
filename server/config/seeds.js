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
    { name: "drinks" },
    { name: "sides" },
    { name: "seafood" },
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
      description: "Simple way to use bananas that you forgot to eat",
      title: "Chocolate Chip Banana Bread",
      ingredients: [
        "3 Over-ripened bananas",
        "1/3 cup (76 grams) melted butter",
        "1/2 cup (99 grams) sugar",
        "1 egg, beaten",
        "1 teaspoon vanilla extract",
        "1 teaspoon baking soda",
        "Salt, to taste",
        "1 1/2 cups (180 grams) all-purpose flour ",
        "1/2 cup chocolate chips, plus more for topping (preferably dark chocolate, the ones for the topping should be mini or chopped normal ones)",
      ],
      steps: [
        "Preheat oven to 350 F (177 C)",
        "Grease loaf pan",
        "In a large bowl, mash bananas with a fork until smooth",
        "After bananas are smooth, add the melted butter and stir until combined",
        "Add the sugar, egg, vanilla, baking soda, salt, and flour.  Stir until the batter is smooth",
        "Add the chocolate chips, and mix",
        "Pour batter into greased loaf pan, and top with additional chocolate chips",
        "Bake for 50 – 60 min (or until a toothpick comes out clean)",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/37792800-6458-48fc-bb91-c290a1e77016-1660285080103",
      creator: seedUser1._id,
      tags: [tags[4]._id, tags[11]._id],
    },
    {
      description: "Super simple pepperoni pizza",
      title: "Pizza",
      ingredients: [
        "Fresh or frozen pizza dough",
        "Pepperoni",
        "Mozzarella cheese (shredded)",
        "Pizza sauce",
        "Olive oil",
      ],
      steps: [
        "If using a frozen dough, thaw per package instructions.  After thawing (ort if using fresh), allow the dough to come to room temperature.",
        "Preheat oven to 425 degF.  If you have a pizza stone or iron, leave it in the oven while preheating.",
        "On a clean countertop, spread a small amount of olive oil out so that the dough won't stick.",
        "Stretch dough to form a rough circle a little less than the size if your pizza stone or iron. (A baking shhet will work, if you don't have on of those).",
        "Spread a few spoonfuls of pizza sauce around the prepared dough.  Leave a 1/2 to 1 inch gap from the edge of the crust to the sauce",
        'Add a few handfuls of cheese to the pizza.  Make sure to extend just a bit beyond the edge of the sauce, to allow the cheese to "seal around" the sauce.',
        "Evenly distribute the pepperoni across the top of the cheese.",
        "Transfer pizza to cooking surface (stone, iron, or baking sheet) and place in oven until the dough is cooked, and the cheese is melted and browning in places (probably around ten minutes).",
        "Remove from oven and allow to cool for a few minutes before cutting and serving.",
        "Note: other toppings can be used as well.  It is recommended that if additional toppings are to be added, that they are to be placed prior to adding cheese.",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/pizza.jpg",
      creator: seedUser1._id,
      tags: [tags[8]._id],
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
    {
      description: "Simple yet standout cocktail.",
      title: "Classic Daiquiri",
      ingredients: [
        "3/4 oz. Lime juice",
        "1/2 oz. Demerara simple syrup",
        "2 oz. Blended lightly aged rum",
      ],
      steps: [
        "Make the Demerara simple syrup - add 1 cup of demerara sugar to 2 cups of boiling water.  Stir vigorously to dissolve.  Once dissolved, add 3 cups of granulated sugar to the mixture and stir to dissolve.  Once all is dissolved, remove from heat and allow to cool to room temp.",
        "Add all ingredients to a cocktail shaker with ice.",
        "Shake, then double filter into a chilled coupe glass",
        "Note: if you do not have Demerara sugar for simple syrup, try to find some other minimally processed sugar for best flavor of the cocktail",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/01b78cb5-7215-49f7-9159-57cbe134dac4-1660285129190",
      creator: seedUser2._id,
      tags: [tags[12]._id],
    },
    {
      description: "Easy side dish to add something green to your diet",
      title: "Roasted Asparagus",
      ingredients: [
        "1 1/2 lbs Asparagus spears, trimmed to 4-5 inches",
        "Extra virgin olive oil",
      ],
      steps: [
        "Preheat oven to 400 degF",
        "Line a baking sheet with parchment, spread out asparagus and drizzle with olive oil.  Season with pepper to taste.",
        "Bake in oven for about 20 minutes.",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/b7458506-c130-4454-82fc-d18759578253-1660285148031",
      creator: seedUser2._id,
      tags: [tags[0]._id, tags[13]._id],
    },
    {
      description: "A perfect way to enjoy a summer evening by the grill.",
      title: "Cedar Plank Grilled Salmon",
      ingredients: [
        "2 Cedar planks",
        "2 Salmon fillets (approximately 1 lb each)",
        "1/2 cup Dijon mustard",
        "1/2 cup Extra virgin olive oil",
        "1 tbsp Mustard seeds",
        "1 tsp Dried thyme",
        "2 tsps Fresh squeezed lime juice",
      ],
      steps: [
        "Soak the cedar planks for two hours, pat the planks dry to remove excess water before placing fish on them",
        "Preheat grill with one side hot and the other cool, to allow for indirect heating",
        "Rinse then pat dry the salmon fillets.  Place them skin-side down on the cedar planks",
        "whisk together remaining ingredients to make a marinade.  Spread the marinade over the top of the salmon",
        "Place the planks (with fish and marinade on top) on the cool side of the grill, close the lid, and cook until the fish reaches 135 degF at the center (approximately 20 minutes, depending on grill setup)",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/e78404ac-472a-4ee5-ba54-310d495eeca3-1660285168006",
      creator: seedUser2._id,
      tags: [tags[8]._id, tags[14]._id],
    },
    {
      description: "Decadent chocolate cake that is gluten free friendly",
      title: "Flourless Chocolate Cake",
      ingredients: [
        "1 cup semisweet chocolate chips or chopped chocolate",
        "1/2 cup unsalted butter (can substitute coconut oil)",
        "3/4 cup granulated sugar",
        "1/4 tsp salt",
        "1 tsp vanilla extract",
        "3 large eggs, slightly beaten",
        "1/2 cup Dutch process cocoa powder",
        "(Optional) some instant espresso powder",
      ],
      steps: [
        "Preheat oven to 375 degF",
        "Grease an 8” round cake pan with nonstick cooking spray",
        "Cut parchment to fit pan and place in bottom of pan, spray with nonstick cooking spray again",
        "Place the chocolate and butter in a large microwave safe bowl, and heat until the butter is melted and the chocolate is soft (~60 seconds).  Stir until the chocolate is melted and the mixture is smooth",
        "After mixture is smooth, add the sugar, salt, and vanilla extract, stir to combine",
        "Add the eggs and stir until smooth",
        "Add the cocoa powder and stir until just combined, don’t over mix",
        "Pour the batter into the prepped pan and bake for 25 minutes or until the cake has a crust on top and the center reads 200 F on an instant read thermometer",
        "Let cool before serving",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/c14e1e97-a121-484a-8a31-6d97ab81d087-1660285185432",
      creator: seedUser2._id,
      tags: [tags[4]._id, tags[11]._id],
    },
    {
      description: "Healthy side salad that goes great with summer cooking",
      title: "Southwestern Quinoa Salad",
      ingredients: [
        "1 1/2 cups Water",
        "1/2 cup mild or medium Picante sauce",
        "1 cup Quinoa, rinsed under cold water",
        "1/2 tsp Ground cumin",
        "1/4 tsp Salt",
        "Black Pepper",
        "1, 15 oz Can of black beans, rinsed and drained",
        "1 1/2 cups fresh or frozen yellow corn kernels, cooked, drained, and cooled",
        "1 cup Cherry or grape tomatoes, halved",
        "4 Scallions (white and green parts), thinly sliced",
        "1 Jalapeño pepper, seeded and finely chopped",
        "1 tbsp Canola oil",
      ],
      steps: [
        "In a medium saucepan over high heat, combine the water, picante sauce, quinoa, cumin, salt, and pepper",
        "Bring mixture to a boil, stirring a few times",
        "After mixture starts to boil, reduce heat to medium, cover, and cook until the liquid is absorbed, 15-20 minutes",
        "After cooking is complete, remove from heat and let stand for 5 minutes",
        "After 5 minutes, uncover and toss with a fork",
        "Transfer to a large bowl and let it cool slightly",
        "After it has cooled enough, add the rest of the ingredients to the quinoa, tossing will to combine",
        "Note: Can be served warm, but is also great served chilled and can keep in the refrigerator for a few days.",
      ],
      image:
        "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/c61873f0-8ee8-4e3f-8075-ae7cb98b6b07-1660285201432",
      creator: seedUser2._id,
      tags: [tags[0]._id, tags[2]._id, tags[13]._id],
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
