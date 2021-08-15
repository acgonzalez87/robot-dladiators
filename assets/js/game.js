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
  // keep track of who goes first
  var isPlayerTurn = true;

  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  // If it is a player-robot's turn:
  //  * prompt the fight or skip request
  //  * remove the damage from enemy-robot's health
  //  * check if enemy-robot has enough health to continue fighting

  // If it is not the player-robot's turn:
  //  * remove damage from the player-robot's health
  //  * check if the player-robot has enough health to continue fighting

  // After the turn is done, switch turns for the next bout of fighting:
  //  * if the player-robot went first, run the logic for the enemy-robot attacking the player-robot
  //  * if the enemy-robot went first, run the logic for the player-robot attacking the enemy-robot

  // repeat and execute as long as the enemy-robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
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
        window.alert(
          enemy.name + " has died! You have been awarded 20 points!"
        );

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
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

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

var startGame = function () {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    // call fight function with enemy-robot
    if (playerInfo.health > 0) {
      window.alert("Let's get ready to rumble! Round " + (i + 1));

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

  // check localStorage for high score, if its not there, use 0
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }

  // if player has more money than high score, player has a new high score
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);
    alert(
      playerInfo.name + " now has a high score of " + playerInfo.money + "!"
    );
  } else {
    alert(
      playerInfo.name +
        " did not beat the high score of " +
        highScore +
        ". Maybe next time!"
    );
  }
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
    "Would you like to refill your health, upgrade your attack or leave the shop? Please enter one: '1' for refill, '2' for upgrade, or '3' to leave."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;

    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
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
    name = prompt(
      "Welcome to Robot Gladiators! To win your robot must defeat the fearsome three, you have 10 points to spend at the store if you choose or you can skip a fight at the cost of 10 points! Now, what is your robot's name?"
    );
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
      window.alert("Refilling player's health by 20 for 7 points.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("Come back when you get some money, buddy!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 points.");
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
