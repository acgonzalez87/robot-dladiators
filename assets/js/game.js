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

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Boptimus Prime", "Rogue-Chantron", "Nightbot"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);

var fight = function (enemyName) {
  // repeat and execute as long as the enemy-robot is alive
  while (playerHealth > 0 && enemyHealth > 0) {
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );
    console.log(promptFight);

    // if player chooses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      window.alert(playerName + " has chosen to skip the fight!");
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    }

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney = Math.max(0, playerMoney - 10);
      console.log("playerMoney", playerMoney);
      break;
    }

    // if player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
      //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
      // generate random damage value based on player's attack power
      var damage = randomNumber(playerAttack - 3, playerAttack);
      enemyHealth = Math.max(0, enemyHealth - damage);

      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerName +
          " attacked " +
          enemyName +
          ". " +
          enemyName +
          " now has " +
          enemyHealth +
          " health remaining."
      );

      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        break;
      } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }

      // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
      var damage = randomNumber(enemyAttack - 3, enemyAttack);
      playerHealth = Math.max(0, playerHealth - damage);

      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemyName +
          " attacked " +
          playerName +
          ". " +
          playerName +
          " now has " +
          playerHealth +
          " health remaining."
      );

      // checking player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      } else {
        window.alert(
          playerName + " still has " + playerHealth + " health left."
        );
      }

      // if no (false), ask question again by running fight() again
      fight(enemyName);
    }
  }
};

var startGame = function () {
  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    // call fight function with enemy-robot
    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      var pickedEnemyName = enemyNames[i];
      enemyHealth = randomNumber(40, 60);
      fight(pickedEnemyName);

      // if player is still alive and we're not at the last enemy in the array
      if (playerHealth > 0 && i < enemyNames.length - 1) {
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
  if (playerHealth > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerMoney +
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
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("Come back when you get some money, buddy!");
      }

      break;
    case "UPGRADE": // new case
    case "upgrade":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("Come back when you get some money, buddy!");
      }

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

// start the game when the page loads
startGame();
