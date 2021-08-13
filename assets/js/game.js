// Game States
// "WIN" - Player has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player's health is zero or less
//    * alert player's total stats
//    * ask if player wants to play again
//    * if yes, start game again
// After player skips or defeats an enemy, ask if player wants to "shop"
//    * if no continue as normal, if yes call the shop function
//    * in the shop function, ask if player wants to "refill", "upgrade", or "leave"

//console.log(enemy.names);
//console.log(enemy.names.length);
//console.log(enemy.names[0]);

var fightOrSkip = function () {
  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
  );
  console.log(promptFight);

  promptFight = promptFight.toLowerCase();

  // conditional recurive function call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player chooses to skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    window.alert(playerInfo.name + " has chosen to skip the fight!");
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(
        playerInfo.name + " has decided to skip this fight. Goodbye!"
      );
      // subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      console.log("playerInfo.money", playerInfo.money);
      // return true if player wants to leave
      return true;
    }
  }
  return false;
};

var fight = function (enemy) {
  // repeat and execute as long as the enemy-robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (fightOrSkip()) {
      // if true, leave fight by breaking loop
      break;
    }

    // if player chooses to fight, then fight

    //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log(
      playerInfo.name +
        " attacked " +
        enemy.name +
        ". " +
        enemy.name +
        " now has " +
        enemy.health +
        " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }

    // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log(
      enemy.name +
        " attacked " +
        playerInfo.name +
        ". " +
        playerInfo.name +
        " now has " +
        playerInfo.health +
        " health remaining."
    );

    // checking player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(
        playerInfo.name + " still has " + playerInfo.health + " health left."
      );
    }

    // if no (false), ask question again by running fight() again
    fight(enemy.name);
  }
};

var startGame = function () {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    // call fight function with enemy-robot
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);

      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use store before next round
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before the next round"
        );
        // if yes, take them to store function
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  // play again
  // startGame();
  // after the loop ends, player is either out of health or enemies to fight
  endGame();
};

// function to end the entire game
var endGame = function () {
  window.alert("The game has now ended. Let's see how you did!");
  // if player is still alive, player wins
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerInfo.money +
        "."
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }
  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a decision."
  );

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL": // new case
    case "refill":
      playerInfo.refillHealth();
      break;
    case "UPGRADE": // new case
    case "upgrade":
      playerInfo.upgradeAttack();
      break;

    case "LEAVE": // new case
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop again to force player to pick a valid option
      shop();
      break;
  }
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// function to set name
var getPlayerName = function () {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("Come back when you get some money, buddy!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("Come back when you get some money, buddy!");
    }
  },
};

console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
  {
    name: "Evabot",
    attack: randomNumber(10, 14),
  },
  {
    name: "RoRo-tron",
    attack: randomNumber(10, 14),
  },
  {
    name: "Aria 5000",
    attack: randomNumber(10, 14),
  },
];

// start the game when the page loads
startGame();
