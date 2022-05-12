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
var codeSelection = 0

//tutorial variables
var tutorialScreen = 0

// below is the image variables
var backgroundMenu = new Image() // background for the main menu
backgroundMenu.src = 'backgrounds/earth.png'
var backgroundCode = new Image() // background for Enter Code
backgroundCode.src = 'backgrounds/moon.png'
var credits = new Image() // credits page
credits.src = 'backgrounds/credits.png'

//#region main menu buttons + back
// images and sources for each button   (s = selected, u = unselected)
var playButtonS = new Image()
playButtonS.src = 'mainMenuText/playSelected.png'
var playButtonU = new Image()
playButtonU.src = 'mainMenuText/playUnselected.png'
var tutorialButtonS = new Image()
tutorialButtonS.src = 'mainMenuText/tutorialSelected.png'
var tutorialButtonU = new Image()
tutorialButtonU.src = 'mainMenuText/tutorialUnselected.png'
var creditsButtonS = new Image()
creditsButtonS.src = 'mainMenuText/creditsSelected.png'
var creditsButtonU = new Image()
creditsButtonU.src = 'mainMenuText/creditsUnselected.png'
var enterCodeS = new Image()
enterCodeS.src = 'mainMenuText/enterCodeSelected.png'
var enterCodeU = new Image()
enterCodeU.src = 'mainMenuText/enterCodeUnselected.png'

var backS = new Image()
backS.src = 'mainMenuText/backSelected.png'
var backU = new Image()
backU.src = 'mainMenuText/backUnselected.png'
//#endregion

//#region tutorial text images
//images for the tutorial text  P = part L = line (e.g: P1L1 = Part 1 Line 1)
var P1L1 = new Image()
P1L1.src = "tutorialText/P1L1.png"
var P1L2 = new Image()
P1L2.src = 'tutorialText/P1L2.png'
var P2L1 = new Image()
P2L1.src = 'tutorialText/P2L1.png'
var P2L2 = new Image()
P2L2.src = 'tutorialText/P2L2.png'
var P3L1 = new Image()
P3L1.src = 'tutorialText/P3L1.png'
var P3L2 = new Image()
P3L2.src = 'tutorialText/P3L2.png'
var P4L1 = new Image()
P4L1.src = 'tutorialText/P4L1.png'
var P4L2 = new Image()
P4L2.src = 'tutorialText/P4L2.png'
var P4L3 = new Image()
P4L3.src = 'tutorialText/P4L3.png'
var P5L1 = new Image()
P5L1.src = 'tutorialText/P5L1.png'
var P5L2 = new Image()
P5L2.src = 'tutorialText/P5L2.png'
var P6L1 = new Image()
P6L1.src = 'tutorialText/P6L1.png'
var P6L2 = new Image()
P6L2.src = 'tutorialText/P6L2.png'
var zContune = new Image()
zContune.src = 'tutorialText/ztocontinue.png'
//#endregion

//#region lore backgrounds
var P1 = new Image()
P1.src = 'backgrounds/P1.png' // lab
var P2 = new Image()
P2.src = 'backgrounds/P2.png' // lab with errors
var P3 = new Image()
P3.src = 'backgrounds/P3.png' // broken town
var P4 = new Image()
P4.src = 'backgrounds/P4.png' // space shuttle
var P5 = new Image()
P5.src = 'backgrounds/P5.png' // mars
var P6 = new Image()
P6.src = 'backgrounds/P6.png' // earth jungle
//#endregion



var stageOneBG = new Image()

var testBG1 = new Image()
testBG1.src = 'backgrounds/marsTest.png'
//starts the canvas when the window opens
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
	manageTutorial()
}

//#region tutorialthings
function manageTutorial(){
	if (stage == 1){
		if (tutorialScreen == 0){ //part one line one
			ctx.drawImage(P1,0,0, 640, 480)
			ctx.drawImage(P1L1, 0, 50, 650, 26)
			ctx.drawImage(zContune, 150, 350, 325, 13)
		} else if (tutorialScreen == 1){ // part one line two
			ctx.drawImage(P1,0,0, 640, 480)
			ctx.drawImage(P1L1, 0, 50, 650, 26)
			ctx.drawImage(P1L2, 0, 90, 650, 52)
			ctx.drawImage(zContune, 150, 350, 325, 13)
		} else if (tutorialScreen == 2){ //part two line one
			ctx.drawImage(P2,0,0, 640, 480)
			ctx.drawImage(P2L1,0,50, 650, 26)
		} else if (tutorialScreen == 3){ //part two line two
			ctx.drawImage(P2,0,0,640,480)
			ctx.drawImage(P2L1,0,50, 650, 26)
			ctx.drawImage(P2L2,0,90, 650, 52)
		} else if (tutorialScreen == 4){ // part three line one
			ctx.drawImage(P3,0,0)
			ctx.drawImage(P3L1,0,50, 650, 52)
		} else if (tutorialScreen == 5){ //part three line two
			ctx.drawImage(P3,0,0)
			ctx.drawImage(P3L1,0,50, 650, 52)
			ctx.drawImage(P3L2,0,130, 650, 26)
		} else if (tutorialScreen == 6){ // part four line one
			ctx.drawImage(P4,0,0)
			ctx.drawImage(P4L1,0,50,650,52)
		} else if (tutorialScreen == 7){ // part four line two
			ctx.drawImage(P5,0,0)
			ctx.drawImage(P4L2,0,50,650,52)
		} else if (tutorialScreen == 8){ // part four line three
			ctx.drawImage(P5,0,0)
			ctx.drawImage(P4L2,0,50,650,52)
			ctx.drawImage(P4L3,0,120,650,26)
		} else if (tutorialScreen == 9){ // part five line one
			ctx.drawImage(P6,0,0)
			ctx.drawImage(P5L1,0,50,650,52)
		} else if (tutorialScreen == 10){ // part five line two
			ctx.fillStyle = 'black'
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.fillStyle = 'white'
			ctx.drawImage(P5L1,0,50,650,52)
			ctx.drawImage(P5L2,0,120,650,26)
		} else if (tutorialScreen == 11){ // part six Line one
			ctx.fillStyle = 'black'
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.fillStyle = 'white'
			ctx.drawImage(P6L1, 0,50,650,26)
		} else if (tutorialScreen == 12){ // part six line two
			ctx.fillStyle = 'black'
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.fillStyle = 'white'
			ctx.drawImage(P6L2,0,200,650,26)
		} else if (tutorialScreen == 13){
			stage = 0
			tutorialScreen = 0
			//this is the part where the tutorial actually happens but i need screenshots from game to do that
		}
	}
}
//#endregion

//#region mainMenuSelection
function mainMenuText(){ // depending on what the player cursor is hovering it will change the images to display the change
	if (stage == 0){
		if (playerSelection == 0){ // play is selected
			ctx.drawImage(playButtonS, 25,100)
			ctx.drawImage(tutorialButtonU, 55,150)
			ctx.drawImage(creditsButtonU, 55, 200)
			ctx.drawImage(enterCodeU,55, 250)
		} else if (playerSelection == 1){ // tutorial is selected
			ctx.drawImage(playButtonU, 55, 100)
			ctx.drawImage(tutorialButtonS, 25, 150)
			ctx.drawImage(creditsButtonU,55, 200)
			ctx.drawImage(enterCodeU,55, 250)
		} else if (playerSelection == 2){ // credits are selected
			ctx.drawImage(playButtonU,55, 100)
			ctx.drawImage(tutorialButtonU,55, 150)
			ctx.drawImage(creditsButtonS,25, 200)
			ctx.drawImage(enterCodeU,55, 250)
		} else if (playerSelection == 3){ // enter code is selected
			ctx.drawImage(playButtonU,55, 100)
			ctx.drawImage(tutorialButtonU,55, 150)
			ctx.drawImage(creditsButtonU,55, 200)
			ctx.drawImage(enterCodeS,25, 250)
		}
	} else if (stage == 1){
	} else if (stage == 2){
		if (codeSelection == 0){ // back button is selected
			ctx.drawImage(backS,0,0)
		} else if (codeSelection == 1){
			ctx.drawImage(backU,30,0)
		}
	} else if (stage == 3){
		if (codeSelection == 0){ // back button is selected
			ctx.drawImage(backS,0,0)
		} else if (codeSelection == 1){
			ctx.drawImage(backU,30,0)
		}
	}
}
//#endregion

function checkStage(){
	if (stage == 0){ // main menu and main menu backgrounds
		ctx.drawImage(backgroundMenu,0,-150,WIDTH,HEIGHT)
	} else if (stage == 1){ // tutorial backgrounds
		ctx.drawImage(stageOneBG, 0, 0, WIDTH, HEIGHT)
	} else if (stage == 2){ // creidts or something
		ctx.fillStyle = 'black'
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(credits,0,50)
	} else if (stage == 3){
		ctx.drawImage(backgroundCode,0,0)
	}

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
			if (playerSelection >= 3)
			{
				playerSelection = 3
			} else {
				playerSelection++
			}
		}	
		if (keyDown == 'z' || keyDown == 'Z'){ // pressing z will send you to different screens depending on where the selector is.
			if(playerSelection == 0){
				//go to the level selection or something stage = 4
				console.log("go to level selection")
			} else if (playerSelection == 1){ // go to tutorial
				stage = 1
				console.log("go to tutorial")
				console.log(stage)
			} else if (playerSelection == 2){ // go to credits
				stage = 2
				console.log("go to credits")
				console.log(stage)
			} else if (playerSelection == 3){ // go to enter code
				stage = 3
				console.log("go to enter Code")
				console.log(stage)
			}
		}
	} else if (stage == 1){ // only works in tutorial
		if (keyDown == 'z' || keyDown == 'Z'){
			tutorialScreen++
			console.log(tutorialScreen)
		}
	} else if (stage == 3 || stage == 2){ // only works in enter code
	if (keyDown == 'ArrowUp'){
		if (codeSelection <= 0)
		{
			codeSelection = 0
		} else {
			codeSelection--
		}
	}
	if (keyDown == 'ArrowDown'){ // if youve reached the highest you can go, dont go higher, if not go one higher
		if (codeSelection >= 1){
			codeSelection = 1
		} else {
			codeSelection++
		}
	}
		if (keyDown == 'z' || keyDown == 'Z'){
			if (codeSelection == 0){
				stage = 0
			}
		}
	} else if (stage == 4){ // acutal code that makes the acutal game work
		
	}
}