// navbar fix
const NAV = document.querySelector(".navbar");
document.documentElement.style.setProperty(
  "--nav-height",
  NAV.offsetHeight + "px",
);
//wait function for animation
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// get c parameter
const params = new URLSearchParams(window.location.search);
const caseName = params.get("c") || "default"; // fallback to "default" if missing

// Set Constant of gambling button
const button = document.getElementById("gamblingButton");

// classes and data
const item_array_len = 1000;
class Enchantments {
  constructor(name, id, lvl, value) {
    this.name = name;
    this.id = id;
    this.lvl = lvl;
    this.value = value;
  }
}
class Item_ {
  constructor(case_name, id, name, float, value, enchantments) {
    this.case_name = case_name;
    this.id = id;
    this.name = name;
    this.float = float;
    this.value = value;
    this.enchantments = enchantments;
  }
}
class Case_Items {
  constructor(id, name, chance, value) {
    this.id = id;
    this.name = name;
    this.chance = chance;
    this.value = value;
  }
}
class Case {
  constructor(name, Case_Items) {
    this.name = name;
    this.Case_Items = Case_Items;
  }
}
class User_class {
  constructor() {
    this.Inventory = [];
    this.wallet = 0;
  }
}
// create crates and items
let cest = [
  new Case_Items(4, "Nehterite_sword", 0.1, 3),
  new Case_Items(3, "Dia_Sword", 0.2, 2),
  new Case_Items(2, "Iron_Sword", 0.3, 1.5),
  new Case_Items(1, "Wood_sword", 0.4, 1),
];
let cristmas_cest = [
  new Case_Items(3, "Nehterite_sword", 0.1, 3),
  new Case_Items(2, "Dia_Sword", 0.4, 2),
  new Case_Items(1, "Wood_sword", 1, 1),
];
let copper = [
  new Case_Items(3, "Copper_Golem", 0.1, 3),
  new Case_Items(2, "Copper_ingot", 0.4, 2),
  new Case_Items(1, "Copper_nugget", 1, 1),
];
let Cases = [
  new Case("chest", cest),
  new Case("christmas", cristmas_cest),
  new Case("copper", copper),
];
//globa inventory
let user = new User_class([], 0);

// add/remove money
function UpdateWallet(addedMoney) {
  user.wallet += addedMoney;
}

UpdateWallet(50);
chestActive = false;

// run gambling with the case from URL
button.addEventListener("click", () => {
  playAnimation(caseName);
});

// delay for gambling rendering
const FRAME_DELAY = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class ItemClass {
  constructor(name, image, index, maxDurability, currentDurability) {
    this.name = name;
    this.image = image;
    this.index = index;
    this.maxDurability = maxDurability;
    this.currentDurability = currentDurability;
  }
}

async function playAnimation(caseName) {
  //set default pictures empty
  if (chestActive === false) {
    chestActive = true;
    let animationPicture;
    document.getElementById("gamblingPrevious2").src = "/images/empty.png";
    document.getElementById("gamblingPrevious").src = "/images/empty.png";
    document.getElementById("gamblingNext").src = "/images/empty.png";
    document.getElementById("gamblingNext2").src = "/images/empty.png";

    for (i = 1; i < 9; i++) {
      animationPicture = `/images/cases/${caseName}/animation/${i}.png`;
      document.getElementById("gamblingCurrent").src = animationPicture;
      await FRAME_DELAY(30);
    }
    await FRAME_DELAY(1000);
    chestActive = false;
    gambling(caseName);
  }
}

async function gambling(caseName) {
  console.log(chestActive);
  // exit conditions
  if (chestActive === true) return wallet; // exit if chest already active
  if (wallet < 30) {
    return wallet;
  }
  let selectedCase = Cases.find((c) => c.name === caseName);
  if (!selectedCase) {
    console.log("case_not_found");
    return wallet;
  }
  UpdateWallet(-30); //pay

  // initialize item array for gambling
  let roll_items = [];
  for (let i = 0; i < item_array_len; i++) {
    let r = Math.random();
    let cumulative = 0;
    for (let item of selectedCase.Case_Items) {
      cumulative += item.chance;
      if (r <= cumulative) {
        roll_items.push(item.id);
        break;
      }
    }
  }
  chestActive = true;
  //init variables
  let velocity = 1;
  let position = 2;
  let current_index = 0;
  // init pictures path variables
  let gamblingPicture = "";
  let gamblingPicturePrevious2 = "";
  let gamblingPicturePrevious = "";
  let gamblingPictureNext = "";
  let gamblingPictureNext2 = "";
  console.log(roll_items);
  for (let i = 0; item_array_len > i; i++) {
    position += velocity;
    velocity -= 0.001;
    current_index = Math.floor(position);
    gamblingPicturePrevious2 = `/images/cases/${selectedCase.name}/${roll_items[(current_index - 2) % item_array_len]}.png`;
    gamblingPicturePrevious = `/images/cases/${selectedCase.name}/${roll_items[(current_index - 1) % item_array_len]}.png`;
    gamblingPicture = `/images/cases/${selectedCase.name}/${roll_items[current_index % item_array_len]}.png`;
    gamblingPictureNext = `/images/cases/${selectedCase.name}/${roll_items[(current_index + 1) % item_array_len]}.png`;
    gamblingPictureNext2 = `/images/cases/${selectedCase.name}/${roll_items[(current_index + 2) % item_array_len]}.png`;
    document.getElementById("gamblingCurrent").src = gamblingPicture;
    document.getElementById("gamblingPrevious2").src = gamblingPicturePrevious2;
    document.getElementById("gamblingPrevious").src = gamblingPicturePrevious;
    document.getElementById("gamblingNext").src = gamblingPictureNext;
    document.getElementById("gamblingNext2").src = gamblingPictureNext2;
    await wait(10);
  }
  // winning item scaleup
  const winningItem = document.getElementById("gamblingCurrent");
  winningItem.classList.add("bigger");
  // winning item scaledown
  setTimeout(() => {
    winningItem.classList.remove("bigger");
  }, 1000);
  const item = roll_items[current_index % item_array_len];
  const item_id = selectedCase.Case_Items.find((c) => c.id === item);

  DURABILITY = Math.random();
  console.log(item_id.value);
  console.log(DURABILITY);
  const PRICE = Math.floor(item_id.value / DURABILITY);
  console.log(PRICE);

  // display results
  document.getElementById("durabilityH1").textContent =
    `Durability: ${DURABILITY}`;
  document.getElementById("price").textContent = `Price: ${PRICE} Emeralds`;
  UpdateWallet(PRICE);

  chestActive = false;
}
