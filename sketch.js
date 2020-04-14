var startBackgroundImg, startBackgroundImg2, gameBgImg, groundImg, book, buidings;
var form, state1, state, name, database, player, game;
var gamestate = 0;
var distanceTravelled = 0;
var time = 0;
var max_Boost = 200;
var max_Engine = 200;
var volcanoZone, no, eruption0, eruption1, eruption2, eruption3, eruption4;
var rockImgOne;
var stormZone;
var smiley, danger;
var isVeryHighlyProneToCyclones, isHighlyProneToCyclones,isModeratelyProneToCyclones,isLessProneToCyclones;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine,world;
var ground;
var character;
var isRightRunning,isLeftRunning, isJump, xpos;
var checkRightRunning = false;
var checkLeftRunning = false;

function preload(){
  frameRate(60);
  engine = Engine.create();
  world = engine.world;
  startBackgroundImg = loadImage("images/volcano.jpg");
  startBackgroundImg2 = loadImage("images/hurricane.jpg");
  gameBgImg = loadImage("images/sky.jpg");
  groundImg = loadImage("images/ground.png");
  book = loadImage("images/book.png");
  buildings = loadImage("images/buildings.png");

  no = loadImage("images/no.png");
  eruption0 = loadImage("images/eruption0.png");
  eruption1 = loadImage("images/eruption1.png");
  eruption2 = loadImage("images/eruption2.png");
  eruption3 = loadImage("images/eruption3.png");
  eruption4 = loadImage("images/eruption4.png");
  smiley = loadImage("images/smiley.png");
  danger = loadImage("images/danger.png");

  rockImgOne = loadImage("images/rockOne.png");
}

function setup(){
  frameRate(60);
  createCanvas(displayWidth,displayHeight-120);

  database = firebase.database();

  player = new Player();
  form = new Form();
  state = new State();
  state1 = new State1();

  ground = new Ground(displayWidth*2,displayHeight-140);

  volcanoZone = new VolcanoZone();
  stormZone = new StormZone();
  character = new Character(40,displayHeight-300,120,140);
  stormZone.optionList();
}

function draw(){
  Engine.update(engine);
  if(gamestate<1){
   frameRate(0.75);
   push();
    var rand = round(random(0,1));
  switch(rand){
    case 0 : background(startBackgroundImg);
    break;
    case 1 : background(startBackgroundImg2);
    break;
  }
  pop();
 }

  player.update();
  player.getCount();

 if(gamestate===0){
  form.display1();
  volcanoZone.hide();
  state1.hide();
  stormZone.hide();
 }

 if(gamestate>0){
  frameRate(60);
  background(0);
  form.hide();
 }

 if(gamestate===1){
  volcanoZone.show();
  state1.show();
  stormZone.show();
  state1.display();
  volcanoZone.display();
  volcanoZone.checkLocality();
  stormZone.display();
  checkLocalityForCyclones();
 }

 if(gamestate === 2){
   background(gameBgImg);
   for(var i = 0; i<4; i++){
     image(eruption0,(i+1)*500,displayHeight-900,900,900);
   }
   image(buildings,0,displayHeight-700,displayWidth*2,displayHeight-100);
   console.log(camera.position.x);
   state1.hide();
   volcanoZone.hide();
   stormZone.hide();
   character.display();
   ground.display();
   xpos = camera.position.x-670;
   controls();
}
}

function showBook(){

}

function controls(){
  var speed = 1.5;
  if(keyIsDown(39)){
   camera.position.x+=speed;
   isRightRunning = true;
   isLeftRunning = false;
  }
  else if(keyIsDown(37)){
    camera.position.x-=speed;
    isRightRunning = false;
    isLeftRunning = true;
 }
   else{
     isRightRunning = false;
     isLeftRunning = false;
     isJump = false;
   }
   //console.log(isJump);
}

function keyPressed(){
  if(key == " "){
    isJump = true;
  }
}