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
var creditsButtonS = new Image()
creditsButtonS.src = 'creditsSelected.png'
var creditsButtonU = new Image()
creditsButtonU.src = 'creditsUnselected.png'


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
	mainMenuText()
}

function mainMenuText(){ // depending on what the player cursor is hovering it will change the images to display the change
	if (playerSelection == 0){
		ctx.drawImage(playButtonS, 25,100)
		ctx.drawImage(tutorialButtonU, 55,150)
		ctx.drawImage(creditsButtonU, 55, 200)
	} else if (playerSelection == 1){
		ctx.drawImage(playButtonU, 55, 100)
		ctx.drawImage(tutorialButtonS, 25, 150)
		ctx.drawImage(creditsButtonU,55, 200)
	} else if (playerSelection == 2){
		ctx.drawImage(playButtonU,55, 100)
		ctx.drawImage(tutorialButtonU,55, 150)
		ctx.drawImage(creditsButtonS,25, 200)
	}
}

function checkStage(){
	if (stage == 0){
		ctx.drawImage(backgroundMenu,0,-150,WIDTH,HEIGHT)
	} else if (stage == 1){
		ctx.drawImage(stageOneBG, 0, 0, WIDTH, HEIGHT)
	}

}

function stageTransition2(){
	stage = 2
}

// LISTENERS

window.addEventListener('keydown', keyDownFunction)

function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	if (stage == 0){ // only if we are on the main menu do these commands do these thnigs
		if (keyDown == 'ArrowUp'){ // if youve reached the lowest you can go, dont go lower, if no go one lower.
			if (playerSelection <= 0)
			{
				playerSelection = 0
			} else {
				playerSelection--
			}
		}
		
		if (keyDown == 'ArrowDown'){ // if youve reached the highest you can go, dont go higher, if not go one higher
			if (playerSelection >= 2)
			{
				playerSelection = 2
			} else {
				playerSelection++
			}
		}
		
		if (keyDown == 'z' || keyDown == 'Z'){ // pressing z will send you to different screens depending on where the selector is.
			if(playerSelection == 0){
				//go to the level selection or something stage = 1
				console.log("go to level selection")
			} else if (playerSelection == 1){
				stageTransition2()
			} else if (playerSelection == 2){
				// go to credits
				console.log("go to credits")
			}
		}
	} else if (stage == 2) { // only works in tutorial
		if (keyDown == 'z' || keyDown == "Z"){
			stage = 0
		}
	}
}