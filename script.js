/**
* Title: pokemon very cool
* Author: Taison Shea
* Date: 03/05/22 - 27/06/22
* Version: 27
* Purpose: get me credits.
**/

const PLAYERWIDTH = 51
const PLAYERHEIGHT = 74
const BACKGROUNDCOLOR = 'rgb(12,12,12)'
var WIDTH = 640  // this is a variable because i wanted to work around with full screen+
var HEIGHT = 480 // and not full screen, so the width and height wouldnt stay the same
var isFullScreen = false
var playerXPosition = 280
var playerYPosition = 180

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
var atkBuff = false // if the character has the attack buff teammate
var defBuff = false // if the character has the defense buff teammate
var attackDamage = 5
var health = 10
var moveSpeed = 5 // how fast the play moves...
var inventoryOpen = false // is the inventory open
var inventorySelection = 0 // what is selected in the inventory
var battleSelection = 0 // waht is selected during battle
var tvToggle = 0 // 0 = off 1 = on
var dialogueOpen = false 
var toggleNote = false
var diologueNumber = 0 // what number to set diologue for
var yesOrNo = 1 // this is a nightmare
var yesOrNoOpen = false
var turn = 0 // 0 = players turn, 1 = zombies turn
var zombieHP = 0
var zombieLocation = 0
var block = false
//#region diologue Numbers
// 0 = cant go upstairs in house
// 1 = go to sleep
// 2 = the note on the desk
// 3 = cant go to sleep
// 4 = want to go to earth
// 5 = come back when youre ready (to go to earth)
// 6 = saved too early
// 7 = saved earth one
// 17 = saved tent
// 8 = Noteboard 1
// 9 = noteboard 2
// 10 = noteboard 3
// 11 = noteboard 4
// 12 = noteboard 5
// 13 = team 0
// 14 = team1
// 15 = team2
// 16 = team3
// 18 = bullitin board notice thing
// 19 = drawers are locked
// 20 = zombies are aids, please help us.
// 21 = you have recieved the atk buff
// 23 = no one is working the food stand right now
// 24 = point in the direction of the train station
// 25 = saved train no atk
// 26 = the door locks behind you
// 27 = 186635
// 28 = 187812
// 29 = cant save
// 30 = just def buff save
// 31 = atk and def buff save 186891
// 32 = help me
// 33 = zombie leaps at you
// 34 = magic attack 4 dmg // 
// 35 = sword attack 4 dmg //
// 36 = magic attack 7 dmg // 
// 37 = sword attack 7 dmg // 
// 38 = zombie light attack // 
// 39 = zombie heavy attack // 
// 40 = zombie attack but blocked //
//#endregion
var contiunedDialogue = 0
var dia34 = new Image()
dia34.src = 'dialogue/dia34.png'
var dia35 = new Image()
dia35.src = 'dialogue/dia35.png'
var dia36 = new Image()
dia36.src = 'dialogue/dia36.png'
var dia37 = new Image()
dia37.src = 'dialogue/dia37.png'
var dia38 = new Image()
dia38.src = 'dialogue/dia38.png'
var dia39 = new Image()
dia39.src = 'dialogue/dia39.png'
var dia40 = new Image()
dia40.src = 'dialogue/dia40.png'
var dia0 = new Image()
dia0.src = 'dialogue/dia0.png'
var dia3 = new Image()
dia3.src = 'dialogue/dia3.png'
var dia4 = new Image()
dia4.src = 'dialogue/dia4.png'
var dia5 = new Image()
dia5.src = 'dialogue/dia5.png'
var dia8 = new Image()
dia8.src = 'dialogue/dia8.png'
var dia9 = new Image()
dia9.src = 'dialogue/dia9.png'
var dia10 = new Image()
dia10.src = 'dialogue/dia10.png'
var dia11 = new Image()
dia11.src = 'dialogue/dia11.png'
var dia12 = new Image()
dia12.src = 'dialogue/dia12.png'
var dia18 = new Image()
dia18.src = 'dialogue/dia18.png'
var dia19 = new Image()
dia19.src = 'dialogue/dia19.png'
var dia20 = new Image()
dia20.src = 'dialogue/dia20.png'
var dia21 = new Image()
dia21.src = 'dialogue/dia21.png'
var dia23 = new Image()
dia23.src = 'dialogue/dia23.png'
var dia24 = new Image()
dia24.src = 'dialogue/dia24.png'
var dia26 = new Image()
dia26.src = 'dialogue/dia26.png'
var dia32 = new Image()
dia32.src = 'dialogue/dia32.png'
var dia33 = new Image()
dia33.src = 'dialogue/dia33.png'
var dia42 = new Image()
dia42.src = 'dialogue/dia42.png'

var yesReady = new Image()
yesReady.src = 'dialogue/yesReady.png'
var noReady = new Image()
noReady.src = 'dialogue/noReady.png'
var BGxPosition = 0
var BGyPosition = 0
var startingStage = 0

//#region save screens
var SavedTooEarly = new Image() // when you try to save in mars
SavedTooEarly.src = 'inventory/GameSavedTooEarly.png'
var cantSave = new Image() // trying to save in the office, or in the boss battle area
cantSave.src = 'inventory/YouCantSaveHere.png'
var SavedEarthOne = new Image() // when you save on earth stage one without getting a teammate
SavedEarthOne.src = 'inventory/GameSaved186010.png'
var SavedEarthOneATK = new Image() // when you save on earth stage one with the attack buff teammate
SavedEarthOneATK.src = 'inventory/GameSaved186635.png'
var SavedEarthTwo = new Image() // when you save on earth stage two without any teammates
SavedEarthTwo.src = 'inventory/GameSaved185656.png'
var SavedEarthTwoATK = new Image() // saving earth stage two with the attack buff teammate
SavedEarthTwoATK.src = 'inventory/GameSaved188309.png'
var SavedEarthTwoDEF = new Image() // saving earth stage two with just the defense buff teammate
SavedEarthTwoDEF.src = 'inventory/GameSaved188433.png'
var SavedEarthTwoATKDEF = new Image() // saving earth stage two with both teammates
SavedEarthTwoATKDEF.src = 'inventory/GameSaved182956.png'
var SavedTent = new Image() // saving the game in the tent, no attack buff
SavedTent.src = 'inventory/GameSaved188565.png'
var savedTentATK = new Image() // saving the game in the tent, attack buff present
savedTentATK.src = 'inventory/GameSaved188239.png'
var savedTrain = new Image() // saving in train no buffs
savedTrain.src = 'inventory/GameSaved184372.png'
var savedTrainATK = new Image() // saving train with ATK Buffs
savedTrainATK.src = 'inventory/GameSaved187812.png'
var savedTrainDef = new Image() // saving train just defence buff
savedTrainDef.src = 'inventory/GameSaved186902.png'
var savedTrainATKDEF = new Image() // saving train with both buffs
savedTrainATKDEF.src = 'inventory/GameSaved186891.png'
//#endregion
//#region teammates
var team0 = new Image() // just you
team0.src = 'inventory/team0.png'
var team1 = new Image() // just atk
team1.src = 'inventory/team1.png'
var team2 = new Image() // just def
team2.src = 'inventory/team2.png'
var team3 = new Image() // all three
team3.src = 'inventory/team3.png'
//#endregion

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
var deskWithNote = new Image()
deskWithNote.src = 'insideHouse/DeskWithNote.png'
var note = new Image()
note.src = 'insideHouse/Note.png'

var bedXPosition = 0 // width = 210
var bedYPosition = 0 // height = 102
var tvXPosition = 0 // width = 225
var tvYPosition = 0 // height = 141
var stairsXPosition = 0 // width = 156
var stairsYPosition = 0 // height = 93
var doorXPosition = 0 // width = 165
var doorYPosition = 0 // height = 27
var deskXPosition = 0 // width = 182
var deskYPosition = 0 // height = 54

// variables used for mars in the game
var marsHouseDoor = new Image()
marsHouseDoor.src = 'mars/yourHosueDoor.png'
var marsFoodCafe = new Image()
marsFoodCafe.src = 'mars/buyFromCafe.png'
var marsNoteBoard = new Image()
marsNoteBoard.src = 'mars/noteboard.png'
var lieutenant = new Image()
lieutenant.src = 'characters/lieutenant.png'

var noteboardOpen = false
var marsDoorXPosition = 0 // width = 133
var marsDoorYPosition = 0 // height = 200
var boardXposition = 0 // width = 147
var boardYPosition = 0 // height = 219
var cafeXPosition = 0 // width = 263
var cafeYPosition = 0 // height = 148
var lieutenantXPosition = 0 // width = 92
var lieutenantYPosition = 0 // height = 127

//variables used for earth in game
var tentEnterance = new Image()
tentEnterance.src = 'Earth/tentEnterance.png'
var trainEnterance = new Image()
trainEnterance.src = 'Earth/trainEnterance.png'

var tentXPosition = 0 // width = 247
var tentYPosition = 0  // height = 234
var trainXPosition = 0 // width = 282
var trainYPosition = 0 // hieght = 357

//variables for things in the tent
var tentExit = new Image()
tentExit.src = 'tent/Exit.png'
var bullitin = new Image() // i spelt it wrong on purpose dw
bullitin.src = 'tent/bullitin.png'
var drawers = new Image()
drawers.src = 'tent/drawers.png'

var exitxPosition = 0 // width = 18
var exityPosition = 0 // height = 369
var bullitinxPosition = 0 // width = 145
var bullitinyPosition = 0 // height = 98
var drawersxPosition = 0 // wdith = 168
var drawersyPosition = 0 // height = 111
var atkBuffXPosition = 0 // width = 55
var atkBuffYPosition = 0 // height = 90

// variables for train station
var officeEnterance = new Image()
officeEnterance.src = 'train/officedoor.png'

// variables for the office
var zombieDead = false

//tutorial variables
var tutorialScreen = 0

// image variables for main menu
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
// images for the battle
var attackSelected = new Image()
attackSelected.src = 'inventory/AttackSelected.png'
var blockSelected = new Image()
blockSelected.src = 'inventory/BlockSelected.png'
var runSelected = new Image()
runSelected.src = 'inventory/RunSelected.png'
var cantRun = new Image()
cantRun.src = 'dialogue/cantRun.png'

// extra images
var interactButton = new Image()
interactButton.src = 'extraResources/interactButton.png'
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
var P7 = new Image()
P7.src = 'tutorialText/P7.png'
var P8 = new Image()
P8.src = 'tutorialText/P8.png'
var P9 = new Image()
P9.src = 'tutorialText/P9.png'
var P10 = new Image()
P10.src = 'tutorialText/P10.png'
var P11 = new Image()
P11.src = 'tutorialText/P11.png'
var P12 = new Image()
P12.src = 'tutorialText/P12.png'
var zContune = new Image()
zContune.src = 'tutorialText/ztocontinue.png'
//#endregion

//#region chracters
var astronautLeft = new Image()
astronautLeft.src = 'characters/astronautLeft.png'
var astronautRight = new Image()
astronautRight.src = 'characters/astronautRight.png'
var atkBuffC = new Image()
atkBuffC.src = 'characters/atkBuff.png'
var defBuffC = new Image()
defBuffC.src = 'characters/defBuff.png'
var zombieIdle = new Image()
zombieIdle.src = 'zombies/zombie_idle.png'
var zombieFlex = new Image()
zombieFlex.src = 'zombies/zombie_flex.png'
var zombieMoving = new Image()
zombieMoving.src = 'zombies/zombie_moving.png'
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

var battle = new Image()
battle.src = 'ExtraResources/Battle.png'
var nothing = new Image()
nothing.src = 'ExtraResources/nothing.png'
//#endregion

var marsBackground = new Image()
marsBackground.src = "backgrounds/marsTest.png"
var earthBackground = new Image()
earthBackground.src = 'backgrounds/earthTest.png'
var tentBackground = new Image()
tentBackground.src = 'backgrounds/tentbackground.png'
var trainBackground = new Image()
trainBackground.src = 'backgrounds/backgroundSubway.png'
var officeBackground = new Image()
officeBackground.src = 'backgrounds/office.png'
var officeBackgroundZ = new Image()
officeBackgroundZ.src = 'backgrounds/officeZombie.png'

//starts the canvas when the window opens
window.onload=startCanvas

function startCanvas(){
	isFullScreen = false
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 20) // set framerate
	playerXPosition = 280
 	playerYPosition = 180
}
function updateCanvas(){
	// reset the canvas
	ctx.fillStyle = ' white'
	ctx.fillRect(0,0,WIDTH, HEIGHT)
	
	checkStage()
	manageMovement()
	mainMenuText()
	manageTutorial()
	updateCode()
	moveBackground()
	updateHousePositions()
	houseThings()
	detectBedCollision()
	detectStairsCollision()
	detectTVCollision()	
	detectDoorCollision()
	detectDeskCollision()
	marsThings()
	detectMarsDoorCollision()
	detectCafeCollision()
	detectLieutenantCollision()
	detectNoteBoardCollision()
	updateMarsPositions()
	updateEarthPositions()
	earthThings()
	detectTentCollision()
	detectTrainCollision()
	tentThings()
	updateTentPositions()
	detectExitCollision()
	detectbullitinCollision()
	trainThings()
	updateTrainPositions()
	detectOfficeCollision()
	detectTrainExit()
	detectDrawerCollision()
	detectATKBuffCollision()
	checkBattle()

	//console.log("stage " + stage) //this is my testing console.log
	//console.log("bgx " + BGxPosition)
	//console.log("bgy " + BGyPosition)
	//console.log("tent "+ tentYPosition)
	//console.log("atkdmg " + attackDamage)
	//console.log("hp " + health)
	//console.log("def buff " + defBuff)
	//console.log(Math.random() * 10)
	//console.log(zPressed)
	chracterFacing()
	manageInventory()
	yesOrNoF()
	toggleNoteF()
	//console.log(turn)

	ctx.strokeStyle = "rgb(0,255,0)" // Draw the hitboxes bright green
	if (stage == 5){
		ctx.strokeRect(tvXPosition, tvYPosition, 225, 141) // tv
		ctx.strokeRect(bedXPosition, bedYPosition, 210, 102) // bed
		ctx.strokeRect(stairsXPosition, stairsYPosition, 156, 93) // stairs
		ctx.strokeRect(doorXPosition, doorYPosition, 165, 27) // door	
		ctx.strokeRect(deskXPosition, deskYPosition, 182, 54) // desk
	} else if (stage == 4){		
		ctx.strokeRect(marsDoorXPosition,marsDoorYPosition, 133, 200) // mars
		ctx.strokeRect(cafeXPosition, cafeYPosition,263, 148) // cafe
		ctx.strokeRect(lieutenantXPosition,lieutenantYPosition,PLAYERWIDTH,PLAYERHEIGHT) // other player on mars
		ctx.strokeRect(boardXposition, boardYPosition,147, 219) // noteboard
	} else if (stage == 6){
		ctx.strokeRect(tentXPosition, tentYPosition, 257, 234) // tent enterance
		ctx.strokeRect(trainXPositon, trainYPosition, 282, 357) // train enterance
	} else if (stage == 7){
		ctx.strokeRect(exitxPosition, exityPosition, 18, 369) // exit
		ctx.strokeRect(bullitinxPosition, bullitinyPosition, 145, 98) // bullitin
		ctx.strokeRect(drawersxPosition, drawersyPosition, 168, 111)//drwaers
		ctx.strokeRect(atkBuffXPosition, atkBuffYPosition, 55, 90) // atk buff character
	} else if (stage == 8){
		ctx.strokeRect(officexPosition,officeyPosition,136,210) // office door
	}
}
function updateStats(){ // will update stats depending on if you have the buff or not
	if (atkBuff == true){
		attackDamage = 7
	} else if (atkBuff == false){
		attackDamage = 4
	}
	if (defBuff == true){
		health = 25
	} else if (defBuff == false){
		health = 15
	}
}

function yesOrNoF(){ // updates visual for the yes or no
	if(yesOrNoOpen == true){ // if the yes or no bar is open
		if (yesOrNo == 1){ // if its yes
			ctx.drawImage(yesReady,0,0,WIDTH,HEIGHT) // draw yes
		} else if (yesOrNo == 2){ // if its no
			ctx.drawImage(noReady,0,0,WIDTH,HEIGHT) // draw no
		}
	} else { // if its no open
		return; // do nothing
	}
}
//#region tutorialthings
function manageTutorial(){ // updates what is shown for the tutorial and lore
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
			ctx.drawImage(P7, 0,0)
		} else if (tutorialScreen == 14) {
			ctx.drawImage(P8,0,0)
		} else if (tutorialScreen == 15) {
			ctx.drawImage(P9,0,0)
		} else if (tutorialScreen == 16) {
			ctx.drawImage(P10,0,0)
		} else if (tutorialScreen == 17) {
			ctx.drawImage(P11,0,0)
		} else if (tutorialScreen == 18) {
			ctx.drawImage(P12,0,0)
		} else if (tutorialScreen == 19) {
			stage = 0
			tutorialScreen = 0
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

function checkStage(){ // will update background based on what stage youre on
	if (stage == 0){ // main menu and main menu backgrounds
		ctx.fillStyle = BACKGROUNDCOLOR
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
	} else if (stage == 69){
		ctx.drawImage(battle, 0,0,WIDTH,HEIGHT)
	}
}
function manageInventory(){ // updates the visual of the inventory.
	if(stage == 4 || stage == 5 || stage == 6 || stage == 7 || stage == 8){ // only in active game states
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
	} else if (stage == 69){
		if (turn == 0){
			if (battleSelection == 0){
				ctx.drawImage(attackSelected,0,0)
			} else if (battleSelection == 1){
				ctx.drawImage(blockSelected,0,0)
			} else if (battleSelection == 2){
				ctx.drawImage(runSelected,0,0)
			}
		}
	}
 }
function manageMovement(){ // makes it so that moving in two directions at the same time, wont mess it up
	if (((movingUp) && (movingLeft)) || ((movingUp) && (movingRight)) || ((movingUp) && (movingDown)) || ((movingLeft) && (movingRight)) || ((movingLeft) && (movingDown)) || ((movingRight) && (movingDown))){ // if any two movement keys are pressed, it will loewr the movement so its the same as if it was only one key pressed
		moveSpeed = 3.7
	} else {
		moveSpeed = 5
	}
 }
function moveBackground(){ // moves the background
	if (stage == 5){ // only works in the house
		ctx.fillStyle = BACKGROUNDCOLOR
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
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
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
	if (stage == 6){ // only works in the earth
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(earthBackground,BGxPosition, BGyPosition)
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
			if (BGxPosition >= -2400){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
			
		}
		//console.log("bg X: " + BGxPosition)
		//console.log("bg Y: " + BGyPosition)
	}
	if (stage == 7){ // only works in the tent
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(tentBackground,BGxPosition, BGyPosition)
		if(movingLeft){
			if (BGxPosition <= 270){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingRight){
			if (BGxPosition >= -1700){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		//console.log("bg X: " + BGxPosition)
		//console.log("bg Y: " + BGyPosition)
	}
	if (stage == 8){ // only works in the train station
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(trainBackground,BGxPosition, BGyPosition)
		if(movingLeft){
			if (BGxPosition <= 270){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingRight){
			if (BGxPosition >= -2275){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		//console.log("bg X: " + BGxPosition)
		//console.log("bg Y: " + BGyPosition)
	}
	if (stage == 9){
		if (zombieDead == false){
			ctx.fillStyle = BACKGROUNDCOLOR
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.drawImage(officeBackgroundZ,0,0)
		} else if (zombieDead == true){
			ctx.fillStyle = BACKGROUNDCOLOR
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.drawImage(officeBackground,0,0)
		}
	}
}
function toggleNoteF(){ // updates dialogue for every part of the game
	if (stage == 5){ // only works in house
		if (toggleNote == true){ // if note is open
			if (diologueNumber == 2){ //if the dialogue number is 2
				ctx.drawImage(note,0,0,WIDTH,HEIGHT) //draw the dialogue accociated with 2
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			} else if (diologueNumber == 0){ // if its 0
				ctx.drawImage(dia0,0,0, WIDTH,HEIGHT) // draw dialogue 0
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			} else if (diologueNumber == 1){ // if its one
				//draw dialogue one
			} else if (diologueNumber == 3){ //if its three
				ctx.drawImage(dia3, 0,0,WIDTH,HEIGHT) //draw three
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			} else if (diologueNumber == 6){
				ctx.drawImage(SavedTooEarly,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (toggleNote == true){
				if(diologueNumber == 13){ // no buffs
					ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
				if(diologueNumber == 14){ // only atk buff
					ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
	
				}
				if(diologueNumber == 15){ // only def buff
					ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
				if(diologueNumber == 16){ // atk and def buff
					ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
			}
		}
	} else if (stage == 4){ // only works on mars
		if (toggleNote == true){ // if note is open
			if (diologueNumber == 4){ // if its four
				ctx.drawImage(dia4, 0,0,WIDTH,HEIGHT) //draw dialogue four
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 5){ // if its five
				ctx.drawImage(dia5,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				yesOrNo = false
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 6){ // if 6
				ctx.drawImage(SavedTooEarly,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 8){ // noteboard 1
				ctx.drawImage(dia8,0,0,WIDTH,HEIGHT)
				yesOrNoOpen = false
				contiunedDialogue = 2
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 9){ // noteboard 2
				ctx.drawImage(dia9,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 3
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 10){ // noteboard 3
				ctx.drawImage(dia10,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 4
				setTimeout(() => {checkZ();}, 250)

			}
			if(diologueNumber == 11){ // noteboard 4
				ctx.drawImage(dia11,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 5
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 12){ // noteboard 5
				ctx.drawImage(dia12,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 6
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 23){
				ctx.drawImage(dia23,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (toggleNote == true){
				if(diologueNumber == 13){ // no buffs
					ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
				if(diologueNumber == 14){ // only atk buff
					ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
	
				}
				if(diologueNumber == 15){ // only def buff
					ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
				if(diologueNumber == 16){ // atk and def buff
					ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
			}
		}	
	} else if (stage == 6){//only works on earth
		if (toggleNote == true){
			if (diologueNumber == 7){
				ctx.drawImage(SavedEarthOne,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 27){
				ctx.drawImage(SavedEarthOneATK,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (toggleNote == true){
				if(diologueNumber == 13){ // no buffs
					ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
				if(diologueNumber == 14){ // only atk buff
					ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
	
				}
				if(diologueNumber == 15){ // only def buff
					ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
				if(diologueNumber == 16){ // atk and def buff
					ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
			}
		}
	} else if (stage == 7){ // if in tent
		if (toggleNote == true){
			if (diologueNumber == 17){
				ctx.drawImage(SavedTent,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 18){
				ctx.drawImage(dia18, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 19){
				ctx.drawImage(dia19,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 20){
				ctx.drawImage(dia20,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 12
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 21){
				ctx.drawImage(dia21,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 22){
				ctx.drawImage(savedTentATK, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 24){
				ctx.drawImage(dia24, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (toggleNote == true){ // i do toggle note again just so i know where the team cut off is
				if(diologueNumber == 13){ // no buffs
					ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
				if(diologueNumber == 14){ // only atk buff
					ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
	
				}
				if(diologueNumber == 15){ // only def buff
					ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
				if(diologueNumber == 16){ // atk and def buff
					ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 250)
				}
			}
		}
	} else if (stage == 8){ // in trian station
		if (toggleNote == true){
			if (diologueNumber == 25){
				ctx.drawImage(savedTrain,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 28){
				ctx.drawImage(savedTrainATK,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 26){
				ctx.drawImage(dia26, 0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 30){
				ctx.drawImage(savedTrainDef, 0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 31){ // both buffs
				ctx.drawImage(savedTrainATKDEF, 0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
		}
		if (toggleNote == true){ // i do toggle note again just so i know where the team cut off is
			if(diologueNumber == 13){ // no buffs
				ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 14){ // only atk buff
				ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)

			}
			if(diologueNumber == 15){ // only def buff
				ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 16){ // atk and def buff
				ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
		}
	} else if (stage == 9){ // if in the office
		if (toggleNote == true){
			if (diologueNumber == 29){
				ctx.drawImage(cantSave,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 32){
				ctx.drawImage(dia32,0,0)
				contiunedDialogue = 13
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 33){
				ctx.drawImage(dia33,0,0)
				contiunedDialogue = 14
				setTimeout(() => {checkZ();}, 250)
			}
		}
		if (toggleNote == true){ // i do toggle note again just so i know where the team cut off is
			if(diologueNumber == 13){ // no buffs
				ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 14){ // only atk buff
				ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)

			}
			if(diologueNumber == 15){ // only def buff
				ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
			if(diologueNumber == 16){ // atk and def buff
				ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 250)
			}
		}
	} else if (stage == 69){ // if in battle
		if (toggleNote == true){
			if (diologueNumber == 41){
				ctx.drawImage(cantRun,0,0)
				contiunedDialogue = 17
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 42){
				ctx.drawImage(dia42, 0,0)
				contiunedDialogue = 17
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 34){
				ctx.drawImage(dia34, 0,0)
				contiunedDialogue = 17
				zombieHP = zombieHP - 4
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 35){
				ctx.drawImage(dia35, 0,0)
				contiunedDialogue = 17
				zombieHP = zombieHP - 4
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 36){
				ctx.drawImage(dia36, 0,0)
				contiunedDialogue = 17
				zombieHP = zombieHP - 7
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 37){
				ctx.drawImage(dia37, 0,0)
				contiunedDialogue = 17
				zombieHP = zombieHP - 7
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 38){
				ctx.drawImage(dia38, 0,0)
				contiunedDialogue = 16
				health = health - 4
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 39){
				ctx.drawImage(dia39, 0,0)
				contiunedDialogue = 16
				health = health - 12
				setTimeout(() => {checkZ();}, 250)
			}
			if (diologueNumber == 40){
				ctx.drawImage(dia40, 0,0)
				contiunedDialogue = 16
				health--
				setTimeout(() => {checkZ();}, 250)
			}
		}
	}
}
function checkZ(){ // check if z is pressed
	if (yesOrNoOpen == true){ // unless yes or no is open
		if (zPressed == true){ // if z is pressed
			if (yesOrNo == 1){ // and yes or no is set tp yes
				console.log("yes")
				BGxPosition = -275
				BGyPosition = -325
				stage = 6 // go to earth
				toggleNote = false
				dialogueOpen = false
				yesOrNoOpen = false
			}
			if (yesOrNo == 2){ // if its set to no
				console.log("no")
				yesOrNoOpen = false
				toggleNote = false
				setTimeout(() => {saidNo();}, 250)
			}
		}
	} else if (yesOrNoOpen == false){
		if (zPressed){
			if (contiunedDialogue == 0){
				toggleNote = false
				dialogueOpen = false
			}
			if (contiunedDialogue == 2){
				setTimeout(() => {oneToTwo();}, 250)
			} else if (contiunedDialogue == 3){
				setTimeout(() => {twoToThree();}, 250)
			} else if (contiunedDialogue == 4){
				setTimeout(() => {threeToFour();}, 250)
			} else if (contiunedDialogue == 5){
				setTimeout(() => {fourToFive();}, 250)
			} else if (contiunedDialogue == 6){
				toggleNote = false
				dialogueOpen = false
				noteboardOpen = false
			} else if (contiunedDialogue == 12){
				setTimeout(() => {addATKBuff();}, 250)
			} else if (contiunedDialogue == 13){
				setTimeout(() => {zombAttacks();}, 250)
			} else if (contiunedDialogue == 14){
				setTimeout(() => {startBattle('Office', 20);}, 250)
				toggleNote = false
				dialogueOpen = false
				return;
			}
			if (contiunedDialogue == 16){
				toggleNote = false
				dialogueOpen = false
				setTimeout(() => {playersTurn();}, 100)
			}
			if (contiunedDialogue == 17){
				toggleNote = false
				dialogueOpen = false
				setTimeout(() => {zombiesTurn();}, 100)
			}
		}
	}
}
function saidNo(){
	diologueNumber = 5
	toggleNote = true
	dialogueOpen = true
}
function oneToTwo(){ // two to the one
	diologueNumber = 9
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 3
}
function twoToThree(){ // to the one
	diologueNumber = 10
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 4
}
function threeToFour(){ // to the three
	diologueNumber = 11
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 5
}
function fourToFive(){ //
	diologueNumber = 12
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 6
}
function playersTurn(){
	manageInventory()
	diologueNumber = 420
	block = false
	battleSelection = 0
	turn = 0
	console.log("palyers turn")
}
function zombiesTurn(){
	turn = 1
	console.log("zombies turn")
}
function addATKBuff(){ // attack buff joins ur team
	diologueNumber = 21
	toggleNote = true
	dialogueOpen = true
	atkBuff = true
}
function zombAttacks(){
	diologueNumber = 33
	toggleNote = true
	dialogueOpen = true
}
function startBattle(Zlocation, Zhealth){
	console.log("Started battle")
	zombieHP = Zhealth
	zombieLocation = Zlocation
	block = false
	stage = 69
}
function checkBattle(){
	if (stage == 69){
		if (health  > 0 || zombieHP > 0){
			if (turn == 0){
				if (zPressed){
					if (battleSelection == 0){
						var attack = Math.random() * 10
						if (atkBuff == false){
							if (attack > 5){
								diologueNumber = 34
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							} else {
								diologueNumber = 35
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							}
						} else {
							if (attack > 5){
								diologueNumber = 36
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							} else {
								diologueNumber = 37
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							}
						}
					} else if (battleSelection == 1){
						console.log('block')
						block = true
						diologueNumber = 42
						toggleNote = true
						dialogueOpen = true
						battleSelection = 4
						zPressed = false
					} else if (battleSelection == 2){
						console.log('run')
						diologueNumber = 41
						toggleNote = true
						dialogueOpen = true
						battleSelection = 4
						zPressed = false
					}
				}
			} else {
				if (block == false){
					if (zAttack > 9){
						var zAttack = Math.random() * 10
						//console.log("heavy attack")
						diologueNumber = 39
						toggleNote = true
						dialogueOpen = true
					} else {
						//console.log("light attack")
						diologueNumber = 38
						toggleNote = true
						dialogueOpen = true
					}
				} else {
					console.log("blocked attack")
					diologueNumber = 40
					toggleNote = true
					dialogueOpen = true
				}
			}
		}
		if (health <= 0){
			console.log("kill player")
		} else if (zombieHP <= 0){
			console.log("kill zombie")
		}
	}
}
function setTrue(){ // open text
	toggleNote = true
	dialogueOpen = true
}
function updateHousePositions(){ // keep the interactables moving with the background
	bedXPosition = BGxPosition + 690
	bedYPosition = BGyPosition + 130
	tvXPosition = BGxPosition + 50
	tvYPosition = BGyPosition
	stairsXPosition = BGxPosition + 380
	stairsYPosition = BGyPosition
	doorXPosition = BGxPosition + 355
	doorYPosition = BGyPosition + 575
	deskXPosition = BGxPosition + 590
	deskYPosition = BGyPosition
}
function houseThings(){ // draw the interactables in the house
	if (stage == 5){
		ctx.drawImage(houseDoor, doorXPosition, doorYPosition)
		ctx.drawImage(houseBed, bedXPosition, bedYPosition)
		ctx.drawImage(houseStairs, stairsXPosition, stairsYPosition)
		ctx.drawImage(deskWithNote, deskXPosition, deskYPosition)
		if (tvToggle == 0){
			ctx.drawImage(tvOff, tvXPosition, tvYPosition)
		} else if (tvToggle == 1){
			ctx.drawImage(tvOn, tvXPosition, tvYPosition)
		}
	}
}
function updateMarsPositions(){ // keep the interactables moving with the background
	marsDoorXPosition = BGxPosition +  2410
	marsDoorYPosition = BGyPosition + 559
	cafeXPosition = BGxPosition + 570
	cafeYPosition = BGyPosition + 1633
	lieutenantXPosition = BGxPosition + 2200
	lieutenantYPosition = BGyPosition + 2500
	boardXposition = BGxPosition + 390
	boardYPosition = BGyPosition + 1572
}
function marsThings(){ // draw the interactables on mars
	if (stage == 4){
		ctx.drawImage(marsHouseDoor, marsDoorXPosition, marsDoorYPosition)
		ctx.drawImage(marsFoodCafe, cafeXPosition, cafeYPosition)
		ctx.drawImage(lieutenant, lieutenantXPosition, lieutenantYPosition, PLAYERWIDTH, PLAYERHEIGHT)
		ctx.drawImage(marsNoteBoard, boardXposition, boardYPosition)
	}
}
function updateEarthPositions(){ // keep the interactables moving with the background
	tentXPosition = BGxPosition + 2155
	tentYPosition = BGyPosition + 485
	trainXPositon = BGxPosition + 1700
	trainYPosition = BGyPosition + 2425
}
function earthThings(){ // draw the interactables on earth
	if (stage == 6){
		ctx.drawImage(tentEnterance, tentXPosition, tentYPosition)
		ctx.drawImage(trainEnterance, trainXPositon, trainYPosition)
	}
}
function updateTentPositions(){ // keep the interactables moving with the background
	exitxPosition = BGxPosition + 10
	exityPosition = BGyPosition
	bullitinxPosition = BGxPosition + 350
	bullitinyPosition = BGyPosition + 215
	drawersxPosition = BGxPosition + 680
	drawersyPosition = BGyPosition + 215
	atkBuffXPosition = BGxPosition + 1565
	atkBuffYPosition = BGyPosition + 280
}
function tentThings(){ // draw the interactables in the tent
	if (stage == 7){
		ctx.drawImage(tentExit,tentXPosition,tentYPosition)
		ctx.drawImage(bullitin, bullitinxPosition, bullitinyPosition)
		ctx.drawImage(drawers, drawersxPosition, drawersyPosition)
		ctx.drawImage(atkBuffC, atkBuffXPosition, atkBuffYPosition)
	}
}
function updateTrainPositions(){
	officexPosition = BGxPosition + 910
	officeyPosition = BGyPosition + 125
}
function trainThings(){
	if (stage == 8){
		ctx.drawImage(officeEnterance, officexPosition, officeyPosition)
	}
}
//#region earth object collisions
function detectTentCollision(){ // detect collision on the tent enterance
	if (stage == 6){
		if(playerXPosition + PLAYERWIDTH >= tentXPosition && playerYPosition + PLAYERHEIGHT >= tentYPosition && playerXPosition <= tentXPosition + 257 && playerYPosition <= tentYPosition + 234)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching tent enterance")
			return(true)
		}else{
			//console.log("not touching tent enterance")
			return(false)
		}
	}
}
function detectTrainCollision(){ // detect collision on the train station enterance
	if (stage == 6){
		if(playerXPosition + PLAYERWIDTH >= trainXPosition && playerYPosition + PLAYERHEIGHT >= trainYPosition && playerXPosition <= trainXPosition + 282 && playerYPosition <= trainYPosition + 357)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching tent enterance")
			return(true)
		}else{
			//console.log("not touching tent enterance")
			return(false)
		}
	}
}
//#endregion
//#region tent object collisions
function detectExitCollision(){ // detect collision on the exit
	if (stage == 7){
		if(playerXPosition + PLAYERWIDTH >= exitxPosition && playerYPosition + PLAYERHEIGHT >= exityPosition && playerXPosition <= exitxPosition + 18 && playerYPosition <= exityPosition + 369)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching tent enterance")
			return(true)
		}else{
			//console.log("not touching tent enterance")
			return(false)
		}
	}
}
function detectbullitinCollision(){ // detect collision on the bulliten board
	if (stage == 7){
		if(playerXPosition + PLAYERWIDTH >= bullitinxPosition && playerYPosition + PLAYERHEIGHT >= bullitinyPosition && playerXPosition <= bullitinxPosition + 145 && playerYPosition <= bullitinxPosition + 98)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching tent enterance")
			return(true)
		}else{
			//console.log("not touching tent enterance")
			return(false)
		}
	}
}
function detectDrawerCollision(){ // detect collision on the drawers
	if (stage == 7){
		if(playerXPosition + PLAYERWIDTH >= drawersxPosition && playerYPosition + PLAYERHEIGHT >= drawersyPosition && playerXPosition <= drawersxPosition + 168 && playerYPosition <= drawersyPosition + 111)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching tent enterance")
			return(true)
		}else{
			//console.log("not touching tent enterance")
			return(false)
		}
	}
}
function detectATKBuffCollision(){ // detect collision on the atk buff in tent
	if (stage == 7){
		if(playerXPosition + PLAYERWIDTH >= atkBuffXPosition && playerYPosition + PLAYERHEIGHT >= atkBuffYPosition && playerXPosition <= atkBuffXPosition + 55 && playerYPosition <= atkBuffYPosition + 90)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching tent enterance")
			return(true)
		}else{
			//console.log("not touching tent enterance")
			return(false)
		}
	}
}
//#endregion
//#region mars object collisions
function detectMarsDoorCollision(){ // detect collision on the door to house
	if (stage == 4){ 
		if(playerXPosition + PLAYERWIDTH >= marsDoorXPosition && playerYPosition + PLAYERHEIGHT >= marsDoorYPosition && playerXPosition <= marsDoorXPosition + 133 && playerYPosition <= marsDoorYPosition + 200)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching mars door")
			return(true)
		}else{
			//console.log("not touching mars door")
			return(false)
		}
	}
}
function detectNoteBoardCollision(){ // detect collision on the noteboard
	if (stage == 4){
		if(playerXPosition + PLAYERWIDTH > boardXposition && playerYPosition + PLAYERHEIGHT >= boardYPosition && playerXPosition <= boardXposition + 147 && playerYPosition <= boardYPosition + 219)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching mars door")
			return(true)
		}else{
			//console.log("not touching mars door")
			return(false)
		}
	}
}
function detectLieutenantCollision(){ // detect collision on the lietenant
	if (stage == 4){
		if(playerXPosition + PLAYERWIDTH >= lieutenantXPosition && playerYPosition + PLAYERHEIGHT >= lieutenantYPosition && playerXPosition <= lieutenantXPosition + PLAYERWIDTH && playerYPosition <= lieutenantYPosition + PLAYERHEIGHT)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			return(true)
		}else{
			return(false)
		}
	}
}
function detectCafeCollision(){ // detect collision on the cafe front
	if (stage == 4){
		if(playerXPosition + PLAYERWIDTH >= cafeXPosition && playerYPosition + PLAYERHEIGHT >= cafeYPosition && playerXPosition <= cafeXPosition + 263 && playerYPosition <= cafeYPosition + 148)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching bed")
			return(true)
		}else{
			//console.log("not touching bed")
			return(false)
		}
	}
}
//#endregion
//#region house object collisions
function detectDeskCollision(){ // detect collision on the desk
	if (stage == 5){
		if(playerXPosition + PLAYERWIDTH >= deskXPosition && playerYPosition + PLAYERHEIGHT >= deskYPosition && playerXPosition <= deskXPosition + 182 && playerYPosition <= deskYPosition + 54)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching bed")
			return(true)
		}else{
			//console.log("not touching bed")
			return(false)
		}
	}
}
function detectBedCollision(){ // detect collision on the bed
	if (stage == 5){
		if(playerXPosition + PLAYERWIDTH >= bedXPosition && playerYPosition + PLAYERHEIGHT >= bedYPosition && playerXPosition <= bedXPosition + 210 && playerYPosition <= bedYPosition + 102)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching bed")
			return(true)
		}else{
			//console.log("not touching bed")
			return(false)
		}
	}
}
function detectTVCollision(){ // detect collision on the tv
	if (stage == 5){
		if(playerXPosition + PLAYERWIDTH >= tvXPosition && playerYPosition + PLAYERHEIGHT >= tvYPosition && playerXPosition <= tvXPosition + 225 && playerYPosition <= tvYPosition + 141)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching tv")
			return(true)
		}else{
			//console.log("not touching tv")
			return(false)
			
		}
	}
}
function detectStairsCollision(){ // detect collision on the stairs
	if (stage == 5){
		if(playerXPosition + PLAYERWIDTH >= stairsXPosition && playerYPosition + PLAYERHEIGHT >= stairsYPosition && playerXPosition <= stairsXPosition + 156 && playerYPosition <= stairsYPosition + 93)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching stairs")
			return(true)
		}else{
			//console.log("not touching stairs")
			return(false)
			
		}
	}
}
function detectDoorCollision(){ // detect collision on the door
	if (stage == 5){
		if(playerXPosition + PLAYERWIDTH >= doorXPosition && playerYPosition + PLAYERHEIGHT >= doorYPosition && playerXPosition <= doorXPosition + 165 && playerYPosition <= doorYPosition + 27)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching door")
			return(true)
			
		}else{
			//console.log("not touching door")
			return(false)
			
		}
	}
}
//#endregion
//#region train object collisions
function detectOfficeCollision(){ // detect collision on the desk
	if (stage == 8){
		if(playerXPosition + PLAYERWIDTH >= officexPosition && playerYPosition + PLAYERHEIGHT >= officeyPosition && playerXPosition <= officexPosition + 136 && playerYPosition <= officeyPosition + 210)
		{
			ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
			//console.log("touching bed")
			return(true)
		}else{
			//console.log("not touching bed")
			return(false)
		}
	}
}
function detectTrainExit(){ // detect collision on the desk
	if (stage == 8){
		if(BGxPosition <= -2275)
		{
			stage = 10
			//wait abit before toggling the diologue
		}
	}
}
//#endregion
function chracterFacing(){ // for which way the character is facing depending on which direction was last pressed
	if (stage == 4 || stage == 5 || stage == 6 || stage == 7 || stage == 8 || stage == 9 || stage == 10){
		if (lastPressed == 1){
			ctx.drawImage(astronautRight,playerXPosition,playerYPosition,PLAYERWIDTH,PLAYERHEIGHT)
		} else if (lastPressed == 0){
			ctx.drawImage(astronautLeft,playerXPosition,playerYPosition,PLAYERWIDTH,PLAYERHEIGHT)
		}
	}
}

//#region codes
function updateCode(){ // this just takes the input field in the html and puts it into a variable
	codeInput = document.getElementById("enterCode").value
	//console.log(codeInput)
}
function submitCode(){ // when the code button is pressed, check if the code works and implement it, else give an error
	if (stage == 3){
		if (codeInput == null || codeInput == ""){ // checks there is acutally a code written in and if there isnt it will give error
			var warningText = document.getElementById("warningText")
			var errorCode = document.getElementById("errorCode")
			errorCode.innerHTML = "Error Code: 131202"
			warningText.innerHTML = "Please enter a code <br> Press x to close this notice"
		} else { // if there is a code it checks it with the following list
			if(codeInput == "186010"){ // will send you to earth with no teammates
				startingStage = 1
				atkBuff = false
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
				BGxPosition = 69 //change this
				BGyPosition = 420 // and this
			} else if (codeInput == "188565"){//sends you to the tent no teammates
				startingStage = 7
				atkBuff = false
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			}
			else if (codeInput == "186635"){ // sends you to earth with attack buff teammate
				startingStage = 2
				atkBuff = true
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
				BGxPosition = 420 // and this
				BGyPosition = 69 // and this
			} else if (codeInput == "188239"){ // tent with attack buff
				startingStage = 7
				atkBuff = true
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "184372"){ // trainstation with no buffs
				startingStage = 8
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "187812"){ // trainstation attack buff
				startingStage = 8
				updateStats()
				atkBuff = true
				updateStats()
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "186902"){ // train station just defense buff
				startingStage = 8
				defBuff = true
				updateStats()
				zombieDead = true
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "186891"){ // trian station attakc and defense buffs // 31
				startingStage = 8
				atkBuff = true
				defBuff = true
				updateStats()
				zombieDead = true
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "entergodmodelmao"){ //gives you god mode
				//give god mode
				atkBuff = true
				defBuff = true
				updateStats()
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
		errorCode.innerHTML = "Error Code: 129031"
		warningText.innerHTML = "Code cannot be entered in tutorial <br> Press x to close this notice"
	} else if (stage == 2){ // if they are trying to access this button by using another tab ingame
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		errorCode.innerHTML = "Error Code: 164384"
		warningText.innerHTML = "Code cannot be entered in credits <br> Press x to close this notice"
	} else if (stage == 0){ // if they are trying to access this button by using another tab ingame
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		errorCode.innerHTML = "Error Code: 154384"
		warningText.innerHTML = "Code cannot be entered in the Main Menu <br> Press x to close this notice"
	}
}
//#endregion

function manageFullScreen(){ // some other obscure thing i tried to add to make full screen, might add back later..
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
function setFalse(){
	zPressed = false
}
//#region LISTENERS + all keyboard interactions

window.addEventListener('keydown', keyDownFunction)
window.addEventListener('keydown', inGameFunction)
window.addEventListener('keyup', keyUpFunction)

function keyUpFunction(keyboardEvent){ // sets the moving to false if the key is stopped being held down
	var keyUp = keyboardEvent.key
	if (stage == 4 || stage == 5 || stage == 6 || stage == 7 || stage == 8 || stage == 9 || stage == 10 || stage == 69){
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
	if (yesOrNoOpen){
		console.log("opened yes or no")
		if (keyDown == 'ArrowUp'){
			yesOrNo = 1
			console.log("changed to yes")
		}
		if (keyDown == 'ArrowDown'){
			yesOrNo = 2
			console.log("changed to no")
		}
	}
	if (stage == 4 || stage == 5 || stage == 6 || stage == 7 || stage == 8 || stage == 9 || stage == 10 || stage == 69){ // this makes it only work in the game stage
		if (!dialogueOpen){ 
			if (keyDown == "ArrowUp"){ // press up key
				if (inventoryOpen == false){
					movingUp = true
				}
			}
			if (keyDown == "ArrowDown"){ // press down key
				if(inventoryOpen == false){
					movingDown = true
				}
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
		}
		if (keyDown == 'z' || keyDown == 'Z'){
			zPressed = true
			setTimeout(() => {setFalse();}, 15)
			if (inventoryOpen){ // if inventory is open
				if (inventorySelection == 0) { // open team
					console.log("open team")
					if (atkBuff == false && defBuff == false){
						console.log("team0")
						diologueNumber = 13
						toggleNote = true
						dialogueOpen = true
					} else if (atkBuff == true && defBuff == false){
						diologueNumber = 14
						toggleNote = true
						dialogueOpen = true
					} else if (atkBuff == false && defBuff == true){
						diologueNumber = 15
						toggleNote = true
						dialogueOpen = true
					} else if (atkBuff == true && defBuff == true){
						//console.log("team3")
						diologueNumber = 16
						toggleNote = true
						dialogueOpen = true
					}
				} else if (inventorySelection == 1) { // open items
					console.log("go to items")
					//open items menu
				} else if (inventorySelection == 2) { // save game
					if (stage == 5 || stage == 4){ // house and mars
						console.log("Its too early to save now")
						diologueNumber = 6
						toggleNote = true
						dialogueOpen = true
					} else if (stage == 6){ // earth stage 
						if (atkBuff == false){
							console.log("Saved Stage: Give code: 186010")
							diologueNumber = 7
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true){
							console.log("Saved Stage: Give code: 186635")
							diologueNumber = 27
							toggleNote = true
							dialogueOpen = true
						}
					} else if (stage == 7){ // inside the tent
						if (atkBuff == false){
							console.log("Saved Stage: Give code: 188565")
							diologueNumber = 17
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true){
							console.log("Saved Stage: Give code: 188239")
							diologueNumber = 22
							toggleNote = true
							dialogueOpen = true
						}
					} else if (stage == 8){ // in train station
						if (atkBuff == false && defBuff == false){ // no buffs
							console.log("Saved Stage: Give code: 184372")
							diologueNumber = 25
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true && defBuff == false){ // just attack buff
							console.log("Saved Stage: Give Code: 187812")
							diologueNumber = 28
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == false && defBuff == true){ // just defense buff
							console.log("Saved Stage: Give Code: 186902")
							diologueNumber = 30
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true && defBuff == true){ // both buffs
							console.log("Saved Stage: Give Code: 186891")
							diologueNumber = 31 
							toggleNote = true
							dialogueOpen = true
						}
					} else if (stage == 9){ // if in the office
						console.log("You cant save here")
						diologueNumber = 29
						toggleNote = true
						dialogueOpen = true
					}
				}
			} else if (!inventoryOpen) { // if inventory is closed
				if (stage == 5){ // if in the house
					if (detectBedCollision()){// if touching bed
						toggleNote = true
						dialogueOpen = true
						diologueNumber = 3
					}
					if (detectStairsCollision()){ // if touching stairs
						//console.log("The second floor hasnt been built yet. Please come back later")
						toggleNote = true
						dialogueOpen = true
						diologueNumber = 0
					}
					if (detectDoorCollision()){ // if touching door
						console.log("want to go outside")
						BGxPosition = -2050
						BGyPosition = -450
						stage = 4
					}
					if (detectTVCollision()){// if touching tv
						if (tvToggle == 1){
							tvToggle = 0
						} else if (tvToggle == 0){
							tvToggle = 1
						}
					}
					if (detectDeskCollision()){
						console.log("open the note on the desk")
						diologueNumber = 2
						dialogueOpen = true
						toggleNote = true
					}
				} else if (stage == 4) { // if on mars
					if (detectMarsDoorCollision()){
						console.log("go back inside")
						stage = 5
						BGxPosition = -130
						BGyPosition = -340
					}
					if (detectCafeCollision()){
						diologueNumber = 23
						toggleNote = true
						dialogueOpen = true
					}
					if(detectLieutenantCollision()){		
						yesOrNoOpen = true
						diologueNumber = 4
						toggleNote = true
						dialogueOpen = true
					}
					if (noteboardOpen == false){
						if (detectNoteBoardCollision()){
							console.log("read notes")
							diologueNumber = 8
							contiunedDialogue = 5
							toggleNote = true
							dialogueOpen = true
							noteboardOpen = true
						}
					}
				} else if (stage == 6){ // if on earth
					if (detectTentCollision()){
						console.log("go to tent")
						stage = 7
						lastPressed = 1
						BGxPosition = 250
						BGyPosition = -120
					}
					if (detectTrainCollision()){
						console.log("go to train station")
						stage = 8
						lastPressed = 1
						BGxPosition = 250
						BGyPosition = -100
						diologueNumber = 26
						toggleNote = true
						dialogueOpen = true
					}			
				} else if (stage == 7){ // if in the tent
					if (detectExitCollision()){
						console.log("go to earth")
						stage = 6
						BGxPosition = -1959
						BGyPosition = -439
					}
					if (detectbullitinCollision()){
						diologueNumber = 18
						toggleNote = true
						dialogueOpen = true
					}
					if (detectDrawerCollision()){
						diologueNumber = 19
						toggleNote = true
						dialogueOpen = true
					}
					if (detectATKBuffCollision()){
						if (atkBuff == false){ // if you dont already own attack buff
							diologueNumber = 20 // get attack buff
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true){ // if you do however own the attack buff
							diologueNumber = 24 // she will point you in the direction of the trainstation
							toggleNote = true
							dialogueOpen = true
						}
					}
				} else if (stage == 8){ // if in train station
					if (detectOfficeCollision()){
						stage = 9
						playerXPosition = 280
						playerYPosition = 369
						diologueNumber = 32
						toggleNote = true
						dialogueOpen = true
					}
				} else if (stage == 9){ // train station office
					if (zombieDead == false){
						
					}
  				} else if (stage == 69){
        			checkBattle()
				}
			}
			//console.log("z pressed")
		}
		if (!dialogueOpen){
			if (keyDown == 'i' || keyDown == 'I'){ // release i key
				if (!inventoryOpen){ // if inventory is closed
					inventoryOpen = true // open it
				} else if (inventoryOpen){ // if inventory is open
					inventoryOpen = false // close it
					inventorySelection = 0
				}
			}
		}
	}
}
function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	if (keyDown == 'o'){
		stage = 69 // the test scene for the game, i just wanna make sure it works
	}
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
			if(playerSelection == 0){ // play game
				if (startingStage == 0){
					BGxPosition = -500
					BGyPosition = 130
					stage = 5
				} else if (startingStage == 1){ // start from stage one earth no teammates
					BGxPosition = -275
					BGyPosition = -325
					stage = 6
				} else if (startingStage == 2){ //start from stage one earth attack buff teammate
					BGxPosition = -275
					BGyPosition = -325
					stage = 6
				} else if (startingStage == 3){ // start from stage two earth no teammates

				} else if (startingStage == 4){ // start from stage two earth attack buff teammate

				} else if (startingStage == 5){ // start from stage two earth defence buff teammate

				} else if (startingStage == 6){ // start from stage two earth both teammates
					
				} else if (startingStage == 7){ // start from right before boss battle no teammates
					BGxPosition = 200
					BGyPosition = -114
					stage = 7
				} else if (startingStage == 8){ // start from trainstation no teammates
					stage = 8
					lastPressed = 1
					BGxPosition = 250
					BGyPosition = -100
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
	}  else if (stage == 69){
		if (keyDown == 'ArrowLeft'){ // if youve reached the lowest you can go, dont go lower, if no go one lower.
			if (battleSelection <= 0)
			{
				battleSelection = 0
			} else {
				battleSelection--
			}
		}
		if (keyDown == 'ArrowRight'){ // if youve reached the highest you can go, dont go higher, if not go one higher
			if (battleSelection >= 2)
			{
				battleSelection = 2
			} else {
				battleSelection++
			}
		}
	}
}
window.addEventListener("keydown", function(e) { // this is something i learned from google to prevent scrolling and stuff like that 
    if(["Space","ArrowUp","ArrowDown"].indexOf(e.code) > -1) { // complettly forgot where i learnt it from, so sorry about that.
        e.preventDefault(); 
    }
}, false);
//#endregion