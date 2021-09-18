var PLAY = 1;
var END = 0;
var gameState = PLAY;

var wheel;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstacle1;

var score=0;

var gameOver, restart;



function preload(){
 
  wheel1 = loadImage("wheel1.png")
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacleImage = loadImage("obstacle.png");

 // bg = loadImage("wheel game background.png")
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  wheel = createSprite(50,180,20,50);
  wheel.addImage(wheel1);
  
  
  wheel.scale = 0.1;

 // bg.addImage("wheel game background.png");

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  obstacle1 = createSprite();
  obstacle1.addImage("wheel game background.png",obstacleImage);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
 // obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //wheel.debug = true;
  background("wheel game background.png");
  
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && wheel.y >= 159) {
      wheel.velocityY = -17;
    }
  
    wheel.velocityY = wheel.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    wheel.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if( obstacle1 .isTouching(wheel)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    wheel.velocityY = 0;
    obstacle1.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
   
    //set lifetime of the game objects so that they are never destroyed
    obstacle1.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = wheel.depth;
   wheel.depth = wheel.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
     
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle1.scale = 0.5;
    obstacle1.lifetime = 300;
    //add each obstacle to the group
    
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacle1.destroyEach();
  cloudsGroup.destroyEach();
  
 
  
 
  
  score = 0;
  
}