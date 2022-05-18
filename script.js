/**
* Title: pokemon very cool
* Author: Taison Shea
* Date: 03/05/22
* Version: 1
* Purpose: get me credits.

**/

const PLAYERWIDTH = 51
const PLAYERHEIGHT = 74
const PLAYERXPOSITION = 280
const PLAYERYPOSITION = 180
var WIDTH = 640
var HEIGHT = 480
var isFullScreen = false

var ctx
var stage = 0 //main menu, in game or where you are
var enterCode = 0 // this is what tells the game what location to start in

// Main Menu Variables
var playerSelection = 0 // what the play wants to do
var codeSelection = 0
var codeInput = null
var goodCode = false

//movement variables
var movingUp = false
var movingLeft = false
var movingRight = false
var movingDown = false
var lastPressed = 0 // 0 = left 1 = right
var zPressed = false

// game variables
var moveSpeed = 5 // how fast the play moves...
var inventoryOpen = false // is the inventory open
var inventorySelection = 0 // what is selected in the inventory
var tvToggle = 0 // 0 = off 1 = on

var BGxPosition = 0
var BGyPosition = 0

// variables for the house in the game
var houseBackground = new Image()
houseBackground.src = 'insideHouse/insidehouse.png'
var houseDoor = new Image()
houseDoor.src = 'insideHouse/door.png'
var houseStairs = new Image()
houseStairs.src = 'insideHouse/stairs.png'
var houseBed = new Image()
houseBed.src = 'insideHouse/bed.png'
var tvOff = new Image()
tvOff.src = 'insideHouse/tvOff.png'
var tvOn = new Image()
tvOn.src = 'insideHouse/tvOn.png'

var bedXPosition = 0 // width = 210
var bedYPosition = 0 // height = 102
var tvXPosition = 0 // width = 225
var tvYPosition = 0 // height = 141
var stairsXPosition = 0 // width = 156
var stairsYPosition = 0 // height = 93
var doorXPosition = 0 // width = 165
var doorYPosition = 0 // height = 27

//tutorial variables
var tutorialScreen = 0

// below is the image variables
var backgroundMenu = new Image() // background for the main menu
backgroundMenu.src = 'backgrounds/earth.png'
var backgroundCode = new Image() // background for Enter Code
backgroundCode.src = 'backgrounds/moon.png'
var credits = new Image() // credits page
credits.src = 'backgrounds/credits.png'
var saveLoaded = new Image() // message that says youve loaded your progress
saveLoaded.src = 'mainMenuText/1ProgressLoaded.png'

// images for the inventory
var inventoryClosed = new Image()
inventoryClosed.src = 'inventory/inventoryClosed.png'
var inventoryTeam = new Image()
inventoryTeam.src = 'inventory/inventoryTeamSelected.png'
var inventoryItems = new Image()
inventoryItems.src = 'inventory/inventoryItemsSelected.png'
var inventorySave = new Image()
inventorySave.src = 'inventory/inventorySaveSelected.png'
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

//#region chracters
var astronautLeft = new Image()
astronautLeft.src = 'characters/astronautLeft.png'
var astronautRight = new Image()
astronautRight.src = 'characters/astronautRight.png'
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

var marsBackground = new Image()
marsBackground.src = "backgrounds/marsTest.png"

//starts the canvas when the window opens
window.onload=startCanvas

function startCanvas(){
	isFullScreen = false
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 20) // set framerate
}
function updateCanvas(){
	// reset the canvas
	ctx.fillStyle="white"
	ctx.fillRect(0,0,WIDTH, HEIGHT)
	
	checkStage()
	manageMovement()
	mainMenuText()
	manageTutorial()
	updateCode()
	moveBackground()
	manageInventory()
	updateHousePositions()
	houseThings()
	detectBedCollision()
	detectStairsCollision()
	detectTVCollision()
	detectDoorCollision()
	chracterFacing()

	ctx.strokeStyle = "rgb(0,255,0)" // Draw the hitboxes bright green
	ctx.strokeRect(tvXPosition, tvYPosition, 225, 141)
	ctx.strokeRect(bedXPosition, bedYPosition, 210, 102)
	ctx.strokeRect(stairsXPosition, stairsYPosition, 156, 93)
	ctx.strokeRect(doorXPosition, doorYPosition, 165, 27)
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
		ctx.fillStyle = 'rgb(12,12,12)'
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(backgroundMenu,150,-80,WIDTH,HEIGHT)
	} else if (stage == 1){ // tutorial backgrounds
		ctx.drawImage(P1, 0, 0, WIDTH, HEIGHT)
	} else if (stage == 2){ // creidts or something
		ctx.fillStyle = 'black'
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(credits,0,50)
	} else if (stage == 3){ // enter codes
		ctx.drawImage(backgroundCode,0,0)
		if (goodCode){
			ctx.drawImage(saveLoaded,0,100,640,100)
		}
	}
}
 function manageInventory(){
	if(stage == 4 || stage == 5 || stage == 6){ // only in active game states
		if (!inventoryOpen){ // if the inventory isnt open
			ctx.drawImage(inventoryClosed,0,0) // draw the image of it closed
		}
		else if (inventoryOpen){ // but if it is open
			if (inventorySelection == 0){
				ctx.drawImage(inventoryTeam,0,0)
			} else if (inventorySelection == 1){
				ctx.drawImage(inventoryItems,0,0)
			} else if (inventorySelection == 2){
				ctx.drawImage(inventorySave,0,0)
			}
		}
	}
 }

function manageMovement(){
	if (((movingUp) && (movingLeft)) || ((movingUp) && (movingRight)) || ((movingUp) && (movingDown)) || ((movingLeft) && (movingRight)) || ((movingLeft) && (movingDown)) || ((movingRight) && (movingDown))){ // if any two movement keys are pressed, it will loewr the movement so its the same as if it was only one key pressed
		moveSpeed = 3.7
	} else {
		moveSpeed = 5
	}
 }
function moveBackground(){
	if (stage == 5){ // only works in the house
		ctx.fillStyle = 'rgb(12,12,12)'
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(houseBackground,BGxPosition, BGyPosition)
		if (movingUp){
			if (BGyPosition <= 170){ // if not touching the edge
				BGyPosition = BGyPosition + moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
		}
		if(movingLeft){
			if (BGxPosition <= 270){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingDown){
			if (BGyPosition >= -330){ // if not touching the edge
				BGyPosition = BGyPosition - moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
			
		}
		if(movingRight){
			if (BGxPosition >= -560){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
			
		}
	}
	if (stage == 4){ // only works in the mars phase of the game
		ctx.drawImage(marsBackground,BGxPosition, BGyPosition)
		if (movingUp){
			if (BGyPosition <= -5){ // if not touching the edge
				BGyPosition = BGyPosition + moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
		}
		if(movingLeft){
			if (BGxPosition <= -5){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingDown){
			if (BGyPosition >= -2350){ // if not touching the edge
				BGyPosition = BGyPosition - moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
			
		}
		if(movingRight){
			if (BGxPosition >= -2350){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
			
		}
		//console.log("bg X: " + BGxPosition)
		//console.log("bg Y: " + BGyPosition)
	}
}

function updateHousePositions(){
	bedXPosition = BGxPosition + 690
	bedYPosition = BGyPosition + 130
	tvXPosition = BGxPosition + 50
	tvYPosition = BGyPosition
	stairsXPosition = BGxPosition + 380
	stairsYPosition = BGyPosition
	doorXPosition = BGxPosition + 355
	doorYPosition = BGyPosition + 575
}
function houseThings(){
	if (stage == 5){
		ctx.drawImage(houseDoor, doorXPosition, doorYPosition)
		ctx.drawImage(houseBed, bedXPosition, bedYPosition)
		ctx.drawImage(houseStairs, stairsXPosition, stairsYPosition)
		if (tvToggle == 0){
			ctx.drawImage(tvOff, tvXPosition, tvYPosition)
		} else if (tvToggle == 1){
			ctx.drawImage(tvOn, tvXPosition, tvYPosition)
		}
	}
}

//#region house object collisions
function detectBedCollision(){
	if (stage == 5){
		if(PLAYERXPOSITION + PLAYERWIDTH >= bedXPosition && PLAYERYPOSITION + PLAYERHEIGHT >= bedYPosition && PLAYERXPOSITION <= bedXPosition + 210 && PLAYERYPOSITION <= bedYPosition + 102)
		{
			//console.log("touching bed")
			return(true)
		}else{
			//console.log("not touching bed")
			return(false)
		}
	}
}
function detectTVCollision(){
	if (stage == 5){
		if(PLAYERXPOSITION + PLAYERWIDTH >= tvXPosition && PLAYERYPOSITION + PLAYERHEIGHT >= tvYPosition && PLAYERXPOSITION <= tvXPosition + 225 && PLAYERYPOSITION <= tvYPosition + 141)
		{
			//console.log("touching tv")
			return(true)
		}else{
			//console.log("not touching tv")
			return(false)
		}
	}
}
function detectStairsCollision(){
	if (stage == 5){
		if(PLAYERXPOSITION + PLAYERWIDTH >= stairsXPosition && PLAYERYPOSITION + PLAYERHEIGHT >= stairsYPosition && PLAYERXPOSITION <= stairsXPosition + 210 && PLAYERYPOSITION <= stairsYPosition + 102)
		{
			//console.log("touching stairs")
			return(true)
		}else{
			//console.log("not touching stairs")
			return(false)
		}
	}
}
function detectDoorCollision(){
	if (stage == 5){
		if(PLAYERXPOSITION + PLAYERWIDTH >= doorXPosition && PLAYERYPOSITION + PLAYERHEIGHT >= doorYPosition && PLAYERXPOSITION <= doorXPosition + 165 && PLAYERYPOSITION <= doorYPosition + 27)
		{
			//console.log("touching door")
			return(true)
		}else{
			//console.log("not touching door")
			return(false)
		}
	}
}
function chracterFacing(){
	if (stage == 4 || stage == 5){
		if (lastPressed == 1){
			ctx.drawImage(astronautRight,PLAYERXPOSITION,PLAYERYPOSITION,PLAYERWIDTH,PLAYERHEIGHT)
		} else if (lastPressed == 0){
			ctx.drawImage(astronautLeft,PLAYERXPOSITION,PLAYERYPOSITION,PLAYERWIDTH,PLAYERHEIGHT)
		}
	}
}

function updateCode(){ // this just takes the input field in the html and puts it into a variable
	codeInput = document.getElementById("enterCode").value
	//console.log(codeInput)
}

//#region codes
function submitCode(){
	if (stage == 3){
		if (codeInput == null || codeInput == ""){ // checks there is acutally a code written in and if there isnt it will give error
			var warningText = document.getElementById("warningText")
			var errorCode = document.getElementById("errorCode")
			errorCode.innerHTML = "Error Code: 131202"
			warningText.innerHTML = "Please enter a code <br> Press x to close this notice"
		} else { // if there is a code it checks it with the following list
			if(codeInput == "121231234"){ // will send you to the first stage on earth
				codeSelection = 0
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
				BGxPosition = 69 //change this
				BGyPosition = 420 // and this
			} else if (codeInput == "othercode"){ // sends you to second stage on earth
				codeSelection = 1
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
				BGxPosition = 420 // and this
				BGyPosition = 69 // and this
			} else if (codeInput == "asdasd"){ // sends you to right before final boss battle
				codeSelection = 2
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
				BGxPosition = 64 // and this
				BGyPosition = 9020 // and even this
			} else if (codeInput == "entergodmodelmao"){ //gives you god mode
				//give god mode
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else { // if thez code they entered was wrong
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				errorCode.innerHTML = "Error Code: 188010"
				warningText.innerHTML = "Please enter a correct code <br> Press x to close this notice"
			}
		}
	} else if (stage == 1){
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		errorCode.innerHTML = "Error Code: 186010"
		warningText.innerHTML = "Code cannot be entered in tutorial <br> Press x to close this notice"
	} else if (stage == 2){ // if they are trying to access this button by using another tab ingame
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		errorCode.innerHTML = "Error Code: 164384"
		warningText.innerHTML = "Code cannot be entered in credits <br> Press x to close this notice"
	} else if (stage == 0){ // if they are trying to access this button by using another tab ingame
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		errorCode.innerHTML = "Error Code: 164384"
		warningText.innerHTML = "Code cannot be entered in the Main Menu <br> Press x to close this notice"
	}
}
//#endregion

function manageFullScreen(){
	if (isFullScreen){
		var canvas = document.getElementById('myCanvas')
		HEIGHT = 480
		WIDTH = 640
		canvas.height = HEIGHT
		canvas.width = WIDTH
		isFullScreen = false
	} else if(!isFullScreen){
		var canvas = document.getElementById('myCanvas')
		HEIGHT = 960
		WIDTH = 1280
		canvas.height = HEIGHT
		canvas.width = WIDTH
		isFullScreen = true
	}
}
//#region LISTENERS + all keyboard interactions

window.addEventListener('keydown', keyDownFunction)
window.addEventListener('keydown', inGameFunction)
window.addEventListener('keyup', keyUpFunction)

function keyUpFunction(keyboardEvent){
	var keyUp = keyboardEvent.key
	if (stage == 4 || stage == 5 || stage == 6){
		if (keyUp == "ArrowUp"){ // release up key
			movingUp = false
			//console.log("up released")
		}
		if (keyUp == "ArrowLeft"){ // release left key
			movingLeft = false
			//console.log("left released")
		}
		if (keyUp == "ArrowDown"){ // release down key
			movingDown = false
			//console.log("down released")
		}
		if (keyUp == "ArrowRight"){ // release right key
			movingRight = false
			//console.log("right released")
		}
		if (keyUp == 'z' || keyUp == 'Z'){ // release z key
			zPressed = false
			//console.log("z released")
		}
	}
}

function inGameFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	if (stage == 4 || stage == 5 || stage == 6){ // this makes it only work in the game stage
		if (keyDown == "ArrowUp"){ // press up key
			movingUp = true
			//console.log("up pressed")
		}
		if (keyDown == "ArrowDown"){ // press down key
			movingDown = true
			//console.log("down pressed")
		}
		if (keyDown == "ArrowLeft"){ // press left key
			if (!inventoryOpen){
				movingLeft = true
				lastPressed = 0
				//console.log("left pressed")
			} else if (inventoryOpen){
				if (inventorySelection <= 0) // if the number is less than or equal to zero
				{
					inventorySelection = 0 // keep it at zero
				} else {
					inventorySelection-- // other wise decrease it
				}
			}
		}
		if (keyDown == "ArrowRight"){ // press right key
			if (!inventoryOpen){ // if inventory is closed
				movingRight = true // move right
				lastPressed = 1
				//console.log("right pressed")
			} else if (inventoryOpen){ // if its open
				if (inventorySelection >= 2) // if the number is greater than or equal to two
				{
					inventorySelection = 2 // keep it the same
				} else {
					inventorySelection++ // otherwise incresae it
				}
			}
		}
		if (keyDown == 'z' || keyDown == 'Z'){
			if (inventoryOpen){ // if inventory is open
				if (inventorySelection == 0) { // open team
					// open team menu
				} else if (inventorySelection == 1) { // open items
					//open items menu
				} else if (inventorySelection == 2) { // save game
					// give save code based off what stage you are on
				}
			} else if (!inventoryOpen) { // if inventory is closed
				if (stage == 5){ // if in the house
					if (detectBedCollision()){// if touching bed
						// give the bed diologue.
						console.log("Want to sleep little cry boy")
					}
					if (detectStairsCollision()){ // if touching stairs
						console.log("The second floor hasnt been built yet. Please come back later")
					}
					if (detectDoorCollision()){ // if touching door
						console.log("want to go outside")
					}
					if (detectTVCollision()){// if touching tv
						if (tvToggle == 1){
							tvToggle = 0
						} else if (tvToggle == 0){
							tvToggle = 1
						}
					}
				}
			}
			//console.log("z pressed")
		}
		if (keyDown == 'i' || keyDown == 'I'){ // release i key
			if (!inventoryOpen){ // if inventory is closed
				inventoryOpen = true // open it
			} else if (inventoryOpen){ // if inventory is open
				inventoryOpen = false // close it
			}
		}
	}
}


function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	if (keyDown == 'x' || keyDown == 'X'){
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		warningText.innerHTML = ""
		errorCode.innerHTML = ""
	}
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
				if (codeSelection == 0){ // start from the beginning
					stage = 5
				} else if (codeSelection == 1){ //start from stage one on earth

				} else if (codeSelection == 2){ // start from stage two on earth

				}
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
	}
}
window.addEventListener("keydown", function(e) { // this is something i learned from google to prevent scrolling and stuff like that
    if(["Space","ArrowUp","ArrowDown"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
//#endregion