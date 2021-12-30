var score =0;
var player,zombie1,zombie2, bullet, backBoard, house, gameOverSound, gameWonSound, shotSound, bgSound,lifeSound,reset ;

var playerImg,zombie1Img, bulletImg, blastImg, backBoardImg, zombie2Img, resetImg;

var zombie2Group, bulletGroup, zombie1Group;


var life =3;
var score=0;
var gameState=1

function preload(){
  playerImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  zombie1Img = loadImage("zombie1.png")
  zombie2Img = loadImage("zombie2.png")
  backBoardImg= loadImage("back.jpg")
  //treeImg= loadImage("tree.jpg")
  gameOverSound= loadSound("YouLose.mp3")
  gameWonSound= loadSound("win.mp3")
  shotSound= loadSound("shot.mp4")
  bgSound=loadSound("hum.mp3")
  lifeSound=loadSound("losing.mp3")
  resetImg= loadImage("reset.png")


}
function setup() {
  createCanvas(1600, 780);
  
  backBoard= createSprite(0,0,1600,780);
  backBoard.addImage(backBoardImg)
  backBoard.scale= 0

  
  player= createSprite(100, height/2, 50,50);
  player.addImage(playerImg)
  player.scale=0.04
  
  /*tree = createSprite(1100,640,50,50)
  tree.addImage(treeImg)
  tree.scale=0.5*/
  
  bulletGroup = createGroup();   
  zombie1Group = createGroup();   
  zombie2Group = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");

  house=createSprite(920,500,350,100);
  house.visible=false

  reset = createSprite(50,50)
  reset.addImage(resetImg)
  reset.visible=false
}

function draw() {
 
  background("#BDA297");
  image(backBoardImg,0,0,1600,780)

  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    player.y=mouseY  
    
    if(keyDown(RIGHT_ARROW)){
      player.x=player.x+1;

    }

    if(keyDown(LEFT_ARROW)){
      player.x=player.x-1;

    }

    if (frameCount % 80 === 0) {
      drawzombie1();
    }

    if (frameCount % 100 === 0) {
      drawzombie2();
    }

    if(keyDown("space")){
      shootBullet();
      shotSound.play()
    }

    if (zombie1Group.collide(player)){
      handleGameover(zombie1Group);
      lifeSound.play()
    }
    
    if (zombie2Group.collide(player)) {
      handleGameover(zombie2Group);
      lifeSound.play()
    }
    
    
    if(zombie1Group.collide(bulletGroup)){
      handlezombieCollision(zombie1Group);
    }

    if(zombie2Group.collide(bulletGroup)){
      handlezombieCollision(zombie2Group);
    }

    if (player.isTouching(house)) {
      handleGamewin()
      gameWonSound.play()
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
  bullet= createSprite(player.x, player.y, 50,20)
  bullet.y= player.y-20
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
    zombie1Group.destroyEach();
    zombie2Group.destroyEach();
    
   

    if (life === 0) {
      gameState=2
      gameOverSound.play()
      
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

function handleGamewin(){
  
  zombie1Group.destroyEach();
  zombie2Group.destroyEach();
  player.destroy();
  
  
  
    gameState=2
    
    swal({
      title: `Game Won`,
      text: "You won the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Up_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
      
    });
    

}