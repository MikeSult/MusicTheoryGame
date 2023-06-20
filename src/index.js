//import "./styles.css";
//import * as ROT from "rot-js";
let randomizeValue = 0.45;
let musicLen = 6;

const displayOptions = {
  // Configure the display
  bg: "white", // background
  fg: "dimGrey", // foreground
  fontFamily: "Fira Mono", // font (use a mono)
  width: 15,
  height: 16, // canvas height and width
  fontSize: 32, // canvas fontsize
  forceSquareRatio: true // make the canvas squared ratio
};

// Object containing colors per tile
// you may add as much as you want corresponding to characters
// they are then applied in gameworld.draw
const colors = {
  ".": "lightgrey", // the moveable path
  '-': 'blue' // an answered question location
};

let Display = null; // give the browser time to load fonts
let playIndex = 0;
let Game = {
  map: [],
  win: false,
  init: async function () {
    await sleep(500).then(() => {
      Display = new ROT.Display(displayOptions);
      let canvas = document.getElementById("canvas");
      canvas.appendChild(Display.getContainer());
      document.getElementById('questionDiv').style.display='none';

    });

    Display.clear();
    this.createLevel();
    Player.init();
    this.engine(); // start the game engine
    this.draw();
  },
  engine: async function () {
    while (true) {
      await Player.act();
      this.draw();
    }
  },
  createLevel: function () {
    if(randomizeValue > 0.8){
      randomizeValue = 0.4
    }
    randomizeValue += 0.05;
    console.log('randomizeValue='+randomizeValue)
    GameWorld.generate();
  },
  draw: function () {
    Display.clear();
    GameWorld.draw();
    Player.draw();
  },
  playGoal: function() {
    let didPlay = false;
    if(GameWorld.count > 6){
      if( (GameWorld.count % 7) == 0 ){
        playIt( (playIndex % musicLen) );      
        playIndex++;
        didPlay = true;   
      }
    }
    return didPlay;
  },
  endGame: function () {
    this.win = true;
    Display.clear();
//    Display.draw(8, 8, "You logged the rocket!", "violet");
    playIt( musicLen );      
  }
};

// initialize the game objects
let GameWorld = {
  count: 0,
  map: [],
  moveSpace: [],
  generate: function () {
    let map = [];

    for (let i = 0; i < displayOptions.width; i++) {
      map[i] = [];
      for (let j = 0; j < displayOptions.height; j++) {
        map[i][j] = "+"; // create the walls
      }
    }

    let freeCells = []; // this is where we shall store the moveable space

    let digger = new ROT.Map.Cellular(
      displayOptions.width - 2,
      displayOptions.height - 2
    );
    digger.randomize(randomizeValue);
    digger.create((x, y, value) => {
      if (value) {
        map[x + 1][y + 1] = "🎵"; // create the walls, music notes hard to see
      } else {
        freeCells.push({ x: x + 1, y: y + 1 });
        map[x + 1][y + 1] = "."; // add . to every free space just for esthetics
      }
    });

    // put the exit gate on the last free cell
    const lastFreeCell = freeCells.pop();
    map[lastFreeCell.x][lastFreeCell.y] = "🌍";

    this.map = map;
    this.freeCells = freeCells;
    Player.justMoved = false;
  },
  // make it impossible to pass through if across an obstacle
  isPassable: function (x, y) {
//    console.log('x='+x+' y='+y);
    if (GameWorld.map[x][y] === '+' || GameWorld.map[x][y] === '🎵' ) {
      return false;
    } else {
      return true;
    }
  },
  hasCollided: function(x,y) {
    if ( GameWorld.map[x][y] === '🎵' ) {
      return true;
    } else {
      return false;
    }
  },
  draw: function () {
    this.map.forEach((element, x) => {
      element.forEach((element, y) => {
        Display.draw(x, y, element, colors[element] || "red");
      });
    });
  }
};

let isFrozen = false;
// create the player
let Player = {
  x: null,
  y: null,
  init: function () {
    let playerStart = GameWorld.freeCells[0]; // put the player in the first available freecell
    this.x = playerStart.x;
    this.y = playerStart.y;
  },
  draw: function () {
    Display.draw(this.x, this.y, "🦋", "black");
  },
  act: async function () {
    let action = false;
    while (!action) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      let e = await new Promise((resolve) => {
        window.addEventListener("keydown", resolve, { once: true });
      });
      action = this.handleKey(e);
    } //Await a valid movement

    // new screen when the butterfly reaches the earth
    if (GameWorld.map[this.x][this.y] === "🌍") {
      Game.endGame();
      Game.createLevel();
      this.init();
    }
  },
  handleKey: function (e) {
    var keyCode = [];
    //Arrows keys
    keyCode[38] = 0; // key-up
    keyCode[39] = 2; // key-right
    keyCode[40] = 4; // key-down
    keyCode[37] = 6; // key-left

    var code = e.keyCode;

    if (!(code in keyCode)) {
      return false;
    }

    let diff = ROT.DIRS[8][keyCode[code]];
    if ( (GameWorld.isPassable(this.x + diff[0], this.y + diff[1])) && !isFrozen) {
      this.x += diff[0];
      this.y += diff[1];
      this.justMoved = true;
      hideQuestion();
      return true;
    }
    if (GameWorld.hasCollided(this.x + diff[0], this.y + diff[1]) && !isFrozen ) {
      this.x += diff[0];
      this.y += diff[1];
      this.justMoved = true;
      let testNumber = 0;
      if(this.y>0) {
        testNumber = this.y-1;
      } else {
        testNumber = this.y;
      }
      setTestNumber(testNumber);
      sleep(500);
      updateQuestions2();
      if(isCorrect){ // isCorrect is global set in evaluate() 
        GameWorld.map[this.x][this.y] = "👏";
        GameWorld.count = GameWorld.count + 1;
        isFrozen = false;
//        Game.playGoal();
      } else {
        GameWorld.map[this.x][this.y] = "🎵";
        isFrozen = true;
      }
//      console.log('isCorrect='+isCorrect+' isFrozen='+isFrozen+' correct answers='+GameWorld.count);
      isFrozen = true;
      return true;
    } else {
      return false;
    }
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


function hideQuestion(){
  document.getElementById('questionDiv').style.display='none';
  document.querySelector('.instructions').style.display='inline';
  if(GameWorld.count>1){
    const applause = document.querySelector('.applause');
    let applauseText = 'You have earned much applause: ';
    for(let i=0; i<GameWorld.count; i++){
      applauseText += "👏";
    }
    if(GameWorld.count > 80){
      applauseText += ' Expertise achieved!!'
    } else if(GameWorld.count > 50){
      applauseText += ' BRAVO!!! You ARE dedicated. I love you!!!'
    } else if(GameWorld.count > 40){
      applauseText += ' BRAVO!! BRAVISSIMO!! ENCORE!!!'
    } else if(GameWorld.count > 30){
      applauseText += ' BRAVO!! ENCORE!!!'
    } else if(GameWorld.count > 20){
      applauseText += ' BRAVISSIMO!!'
    } else if(GameWorld.count > 10){
      applauseText += ' BRAVO!'
    }

    const sanitizer1 = new Sanitizer(); // Default sanitizer;
    applause.setHTML(applauseText, { sanitizer: sanitizer1 });
  }

}

function setTestNumber(num) {
//  console.log('start setTestNumber() --------------');
  const testNumberDiv = document.getElementById('testNumberDiv');
  const testNumberText = '<input type="hidden" id="testSelector" value="'+num+'">';
  const sanitizer1 = new Sanitizer(); // Default sanitizer;
  testNumberDiv.setHTML(testNumberText,{ sanitizer: sanitizer1 });
//  console.log('updated hidden Test number.');
    
}

window.addEventListener(
  "keydown",
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

window.onload = Game.init();
window.focus();
