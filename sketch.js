var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var ground, groundImage;
var invisibleGround;
var score = 0;
var invisibleGround;
var survivalTime;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  invisibleGround = createSprite(200, 345, 400, 10);
  invisibleGround.visible = false;


  obstaclesGroup = new Group();
  FoodGroup = new Group();

  monkey.setCollider("rectangle", 0, 0, monkey.width,   monkey.height);
  monkey.debug = false;
}


function draw() {
  background("white");

   if (ground.x < 0) {
      ground.x = ground.width / 2;
   }

   text("Score: " + score, 300, 50);

  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -10;
  }

  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);

  obstacles();
  Banana();

  drawSprites();

if(obstaclesGroup.isTouching(monkey)){
  ground.velocityX = 0;
  monkey.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
}

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 100, 50);



}





function obstacles() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(600, 310, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6 + score / 100);
    obstacle.scale = 0.2
    obstacle.lifeTime = 300;
    obstaclesGroup.add(obstacle)
  }
}

function Banana() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 230, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -(4 + score / 100);
    banana.scale = 0.09;
    FoodGroup.add(banana);

    banana.lifeTime = 200;
  }
}