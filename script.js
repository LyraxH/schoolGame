/**
* Title: run very shoot shoot
* Author: Taison Shea
* Date: 03/05/22
* Version: 1
* Purpose: get me credits.

**/

const WIDTH = 640
const HEIGHT = 640

var ctx
var stage = 0 //main menu, in game or where you are

// Main Menu Variables
var playerSelection = 0 // what the play wants to do

//background Variables
var scrollSpeed = 5 // how fast background moves

// below is the image variables
var backgroundMenu = new Image() // background for the main menu
backgroundMenu.src = 'earth.png'

var playButtonS = new Image()
playButtonS.src = 'playSelected.png'
var playButtonU = new Image()
playButtonU.src = 'playUnselected.png'
var tutorialButtonS = new Image()
tutorialButtonS.src = 'tutorialSelected.png'
var tutorialButtonU = new Image()
tutorialButtonU.src = 'tutorialUnselected.png'


var stageOneBG = new Image()


//starts canvas upon loading the window
window.onload=startCanvas

function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	//sets the framerate
	timer = setInterval(updateCanvas, 20) 
}
function updateCanvas(){
	// reset the canvas
	ctx.fillStyle="white"
	ctx.fillRect(0,0,WIDTH, HEIGHT)
	
	checkStage()
	mainMenu()
}

function mainMenu(){
	if (playerSelection == 0){
		ctx.drawImage(playButtonS, 25,100)
		ctx.drawImage(tutorialButtonU, 55,150)
	} else if (playerSelection == 1){
		ctx.drawImage(playButtonU, 55, 100)
		ctx.drawImage(tutorialButtonS, 25, 150)
	}
}

function checkStage(){
	if (stage == 0){
		ctx.drawImage(backgroundMenu,0,-150,WIDTH,HEIGHT)
	} else if (stage == 1){
		ctx.drawImage(stageOneBG, 0, 0, WIDTH, HEIGHT)
	}

}

window.addEventListener('keydown', keyDownFunction)

function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	console.log("You just pressed", keyDown)
	console.log(stage)
	if (stage == 0){
		if (keyDown == 'ArrowUp'){
			if(playerSelection == 0){
				playerSelection = 1
				console.log(playerSelection)
			}else if (playerSelection == 1){
				playerSelection = 0
				console.log(playerSelection)
			}
		}
		
		if (keyDown == 'ArrowDown'){
			if(playerSelection == 0){
				playerSelection = 1
			} else if (playerSelection == 1){
				playerSelection = 0
			}
		}
		
		if (keyDown == 'z'){
			if(playerSelection == 0){
				//go to the level selection or something
			} else if (playerSelection == 1){
				// go to tutorial
			}
		}
	}
}