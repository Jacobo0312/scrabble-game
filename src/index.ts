import * as PIXI from "pixi.js";
import { Controller } from "./model/Controller";
import { Coordinates } from "./model/Coordinates";
import { sound } from '@pixi/sound';




// Create app
const app = new PIXI.Application({
  antialias: true,
  autoDensity: true,
  //resolution: devicePixelRatio,
  width: 1280,
  height: 720
});


const game = new Controller();

let currentCoordinates = new Coordinates(0, 0);

const textWord = new PIXI.Text(game.getWord(), { fontFamily: 'Arial', fontSize: 40, align: 'center' });
textWord.x = 750;
textWord.y = 485;


const textWords = new PIXI.Text("", { fontFamily: 'Arial', fontSize: 20, align: 'center' });;
textWords.x = 1000;
textWords.y = 70;


const textPoints = new PIXI.Text(game.getScore + " pts", { fontFamily: 'Arial', fontSize: 40, align: 'center' });;
textPoints.x = 540;
textPoints.y = 65;



const tileSound = sound.add('tileSound', './assets/tile-sound.mp3');
tileSound.volume = 0.1;


const correctSound = sound.add('correctSound', './assets/correctSound.mp3');
correctSound.volume = 0.01;

const incorrectSound = sound.add('incorrectSound', './assets/incorrectSound.mp3');
incorrectSound.volume = 0.01;


setupTextures();
takeOutTokens();



function takeOutTokens() {

  const takeOutTokensList = game.getTokensOut;
  // Putting tokens in the stand
  for (let i = 0; i < 7; i++) {



    if (takeOutTokensList[i].getImage != "") {
      // Create a texture from an image path
      const imageTexture = PIXI.Texture.from(takeOutTokensList[i].getImage);
      // Scale mode for pixelation"
      imageTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;



      // Create our little bunny friend..
      const tokenTexture = new PIXI.Sprite(imageTexture);

      // Enable the token to be interactive... this will allow it to respond to
      // mouse and touch events
      tokenTexture.interactive = true;

      // This button mode will mean the hand cursor appears when you roll over
      // the token with your mouse
      tokenTexture.buttonMode = true;


      tokenTexture.anchor.set(0.5);

      tokenTexture.scale.set(1);


      // Setup events for mouse + touch using the pointer events
       tokenTexture.on('pointerdown', onDragStart)
       tokenTexture.on('pointerup', onDragEnd)
       tokenTexture.on('pointerupoutside',onDragEnd)
       tokenTexture.on('pointermove', onDragMove)

      // Move the sprite to its designated position

      tokenTexture.x = game.getTablePositions[i].getX;
      tokenTexture.y = game.getTablePositions[i].getY;


      // Add it into the scene
      app.stage.addChild(tokenTexture);
    }



  }



}


 function onDragStart(event: PIXI.interaction.InteractionEvent) {
  console.log("DRAG START")

  const sprite = event.currentTarget as Draggable;
  sprite.alpha = 0.5;
  sprite.data = event.data;
  sprite.dragging = true;


  currentCoordinates.setX = sprite.x;
  currentCoordinates.setY = sprite.y;




}

 function onDragEnd(event: PIXI.interaction.InteractionEvent) {

    console.log("DRAG END")

    tileSound.play();
  
    const sprite = event.currentTarget as Draggable;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.data = null;
  
    const coordinates = game.changeToken(new Coordinates(sprite.y, sprite.x), currentCoordinates);
    sprite.x = coordinates.getX;
    sprite.y = coordinates.getY;
  
    let y = "";
  
    game.getTokensWord.forEach((element) => {
      y += "[" + element.getKey + "] ";
    });
  
    console.log(y);
  
    let x = "";
    game.getTokensOut.forEach((element) => {
      x += "[" + element.getKey + "] ";
    });
  
    console.log(x);
  
    updateWord();


  


}

function onDragMove(event: PIXI.interaction.InteractionEvent) {
  console.log("DRAG MOVE")

  const sprite = event.currentTarget as Draggable;
  if (sprite.dragging) {
    const newPosition = sprite.data!.getLocalPosition(sprite.parent);

    sprite.x = newPosition.x;
    sprite.y = newPosition.y;


  }
}

interface Draggable extends PIXI.DisplayObject {
  data: PIXI.interaction.InteractionData | null;
  dragging: boolean;
}


function setupTextures() {

  //Create texture Table
  const textureTable = PIXI.Texture.from('./assets/Tablero.svg');
  document.body.appendChild(app.view);
  const table = new PIXI.Sprite(textureTable);

  const textBonus = new PIXI.Text("Bonus multiplicador por: " + game.getBonus, { fontFamily: 'Arial', fontSize: 20, align: 'center' });;
  textBonus.x = 200;
  textBonus.y = 30;


  const buttonResetTexture = PIXI.Texture.from('./assets/Reiniciar.svg');
  buttonResetTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const resetTexture = new PIXI.Sprite(buttonResetTexture);
  resetTexture.x = 10;
  resetTexture.y = 10;




  resetTexture.interactive = true;


  resetTexture.buttonMode = true;

  resetTexture.on('click', () => {
    location.reload()
    console.log("RESET");
  });



  const buttonTimeTexture = PIXI.Texture.from('./assets/Tiempo.svg');
  buttonTimeTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const timeTexture = new PIXI.Sprite(buttonTimeTexture);
  timeTexture.x = 180;
  timeTexture.y = 175;


  timeTexture.interactive = true;


  timeTexture.buttonMode = true;

  timeTexture.on('click', () => {
    game.sortWords("time");
    updateWords();
    console.log("TIME");
  });

  const buttonPointsTexture = PIXI.Texture.from('./assets/Puntaje.svg');
  buttonPointsTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const pointsTexture = new PIXI.Sprite(buttonPointsTexture);
  pointsTexture.x = 180;
  pointsTexture.y = 246;


  pointsTexture.interactive = true;


  pointsTexture.buttonMode = true;

  pointsTexture.on('click', () => {
    game.sortWords("points");
    updateWords();
    console.log("SCORE");
  });


  const buttonLengthTexture = PIXI.Texture.from('./assets/Longitud.svg');
  buttonLengthTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const lengthTexture = new PIXI.Sprite(buttonLengthTexture);
  lengthTexture.x = 427;
  lengthTexture.y = 246;


  lengthTexture.interactive = true;


  lengthTexture.buttonMode = true;

  lengthTexture.on('click', () => {
    game.sortWords("length");
    updateWords();
    console.log("LENGTH");
  });


  const buttonSendTexture = PIXI.Texture.from('./assets/Enviar.svg');
  buttonSendTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const sendTexture = new PIXI.Sprite(buttonSendTexture);
  sendTexture.x = 500;
  sendTexture.y = 120;

  sendTexture.interactive = true;


  sendTexture.buttonMode = true;

  sendTexture.on('click', () => {
    console.log("SEND");


    if (game.validateWord()) {
      game.sendWord();
      updateWord();
      updateWords();
      updatePoints();
      correctSound.play();
      setupTextures();
      takeOutTokens();
    } else {
      incorrectSound.play();
    }


  });


  setupAlpha([sendTexture, timeTexture, pointsTexture, resetTexture, lengthTexture]);
  app.stage.addChild(table, resetTexture, sendTexture, textWord, textWords, textPoints, timeTexture, pointsTexture, lengthTexture, textBonus);

}


function updateWord() {
  textWord.text = game.getWord();
}

function updatePoints() {
  textPoints.text = game.getScore + " pts";
}


function updateWords() {
  let text = "";
  game.getWords.forEach((element) => text += element + "\n")
  textWords.text = text;

}



function setupAlpha(sprites: PIXI.Sprite[]) {
  sprites.forEach(element => {


    element.on('mouseover', () => {
      element.alpha = 0.5;
    });

    element.on('mouseout', () => {
      element.alpha = 1;
    });
  });
}





