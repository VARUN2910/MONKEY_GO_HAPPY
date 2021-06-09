var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var score=0;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
  obstaceImage=loadImage("stone.png");
  gameO=loadImage("gameOver.png");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}
function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,20,20);
  gameOver.addImage(gameO);
  gameOver.visible=false;

  foodG=new Group();
  obstacleG=new Group();
}

function draw() { 
  background(0);
  drawSprites();
 
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
    if(keyDown("space")&& monkey.y>=200) {
      monkey.velocityY = -16;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    if(foodG.isTouching(monkey)){
      foodG.destroyEach();
      score=score+2;
      monkey.scale += +0.1;
    }
    spawnFood();
    obstacle();
    if(obstacleG.isTouching(monkey)){
      obstacleG.destroyEach();
      gameState=END;
    }
  }
  if(gameState===END){
  gameOver.visible=true;
  ground.velocityX=0;
  obstacleG.setVelocityXEach(0);
  foodG.setVelocityXEach(0);
  obstacleG.setLifetimeEach(-1);
  foodG.setLifetimeEach(-1);
  monkey.velocityY=0;
  backgr.velocityX=0;
  monkey.visible=false;
  }


  fill("white");
  textSize(30)
  text("SCORE : "+score,620,30);

}
function obstacle(){
  if (frameCount % 150 === 0) {
 var obstacle=createSprite(800,310,20,20);
  obstacle.scale=0.2;
  obstacle.velocityX=-9  
  obstacle.addImage(obstaceImage); 
    obstacle.lifetime=130;
  obstacleG.add(obstacle); 
  
  }
} 
function spawnFood(){
  if (frameCount % 100 === 0) {
    var food=createSprite(800,230,20,20);
     food.y=(random(120,200));  
     food.scale=0.07;
     food.velocityX=-7  
     food.addImage(bananaImage); 
     food.lifetime=300;
     food.depth=monkey.depth;
     monkey.depth=monkey.depth + 1;  
     foodG.add(food);
     }
}