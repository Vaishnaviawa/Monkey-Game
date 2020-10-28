//creating variables for the objects in the game and their images
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
//creating variables for the two groups (food group and obstacle group)
var foodGroup, obstacleGroup;
//creating variable for ground
var ground;
//creating variable for the survival time
var survivalTime = 0;
//creating variable for the score
var score = 0;

function preload(){
  //loading the respective images/animations to the objects in the game
  monkey_running =                    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  //creating a canvas
  createCanvas(400,355);
  
  //creating a monkey sprite
  monkey = createSprite(80,315,20,20);
  //adding animation
  monkey.addAnimation("moving", monkey_running);
  //reducing the size of the animation
  monkey.scale = 0.1;
  
  //creating a ground sprite
  ground = createSprite(400,350,900,10);
  //adding a velocity so that it moves backwards
  ground.velocityX = -4;
  //resetting the ground to the centre of the screen
  ground.x = ground.width / 2;
  //printing the x position of the ground onto the console
  console.log(ground.x);
  
  //creating new groups 
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  //clearing background to white
  background("white");
  
  //displaying and updating the survival time
  stroke("black");
  textSize(20);
  fill("Black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,100,50);
  console.log("This is" , survivalTime);
  
  //adding a velocity to the ground to move it backwards
  ground.velocityX = -4;
  
  //if space key is pressed, monkey should move up
  if(keyDown("space")){
    monkey.velocityY=-13;
  }
  //adding gravity so that the monkey comes down
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //resetting the ground
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  //calling function "food" after every 80 frames
  if (frameCount%80 === 0){
    food();
  }
  //calling function "obstacles" after every 300 frames
  if (frameCount%300 === 0){
    obstacles();
  }
  //colliding the monkey with the ground
  monkey.collide(ground);
  
  //drawing the sprites
  drawSprites();
}
//function for food (bananas)
function food(){
  var banana = createSprite(500, Math.round(random(120,200)),20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 100;
  foodGroup.add(banana);
}
//function for obstacles
function obstacles(){
  var obstacle = createSprite(550,320,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -4;
  obstacle.lifetime = 100;
  obstacle.scale = 0.1;
  obstacleGroup.add(obstacle);
}