var score =0;
var gun,zombie1,zombie2, bullet, backBoard, house;

var gunImg,zombie1Img, bulletImg, blastImg, backBoardImg, zombie2Img, houseImg;

var zombie2Group, bulletGroup, zombie1Group;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  zombie1Img = loadImage("zombie1.png")
  zombie2Img = loadImage("zombie2.png")
  backBoardImg= loadImage("back.jpg")
  houseImg= loadImage("house.png")
}
function setup() {
  createCanvas(1000, 780);

  backBoard= createSprite(0,0,1000,780);
  backBoard.addImage(backBoardImg)
  backBoard.scale= 0

  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.05
  
  house = createSprite(800,640,50,50)
  house.addImage(houseImg)
  house.scale=0.5
  
  bulletGroup = createGroup();   
  zombie1Group = createGroup();   
  zombie2Group = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  image(backBoardImg,0,0,1000,780)
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawzombie1();
    }

    if (frameCount % 100 === 0) {
      drawzombie2();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (zombie1Group.collide(backBoard)){
      handleGameover(zombie1Group);
    }
    
    if (zombie2Group.collide(backBoard)) {
      handleGameover(zombie2Group);
    }
    
    
    if(zombie1Group.collide(bulletGroup)){
      handlezombieCollision(zombie1Group);
    }

    if(zombie2Group.collide(bulletGroup)){
      handlezombieCollision(zombie2Group);
    }

    drawSprites();
  }
    
  
}

function drawzombie1(){
  zombie1 = createSprite(800,random(20,780),40,40);
  zombie1.addImage(zombie1Img);
  zombie1.scale = 0.1;
  zombie1.velocityX = -8;
  zombie1.lifetime = 400;
  zombie1Group.add(zombie1);
}
function drawzombie2(){
  zombie2 = createSprite(800,random(20,780),40,40);
  zombie2.addImage(zombie2Img);
  zombie2.scale = 0.1;
  zombie2.velocityX = -8;
  zombie2.lifetime = 400;
  zombie2Group.add(zombie2);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handlezombieCollision(zombieGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

  

    

   
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    zombieGroup.destroyEach()
}

function handleGameover(zombieGroup){
  
    life=life-1;
    zombieGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}