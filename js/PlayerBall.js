(function() {

  var PlayerBall = function(pbId,pbWidth, pbHeight ,pbColor, pbLabel) {
    this.initialize(pbId,pbWidth, pbHeight ,pbColor, pbLabel);
  }
  //var pb = PlayerButton.prototype = new createjs.Container(); // inherit from container
  var p = PlayerBall.prototype = new createjs.Container();
  
  p.pbid;
  p.pbwidth;
  p.pbheight;
  p.pbcolor;
  p.pblabel;
   p.oPoint;
  p.xOrigin;
  p.yOrigin;
  p.image;
  p.back;
  p.bmp;
  
  p.Container_initialize = p.initialize;
  p.initialize = function(pbId,pbWidth, pbHeight ,pbColor, pbLabel){
    
  	this.Container_initialize();
    
    this.pbid = pbId;
    this.pbwidth = pbWidth;
    this.pbheight = pbHeight;
    this.x = this.x;
    this.y = this.y;
    this.back = new createjs.Container();
 
    console.log("PlayerBall="+ this.pbwidth);
    var bmp;
    
    var image = new Image();
    image.src = "assets/imgs/ball_80x80.png";
    this.bmp = new createjs.Bitmap(image);
    this.bmp.scaleX = 0.5;
      this.bmp.scaleY = 0.5;
      this.bmp.x = this.pbwidth * -0.5;
      
      this.bmp.y = this.pbheight * -0.5;
    this.addChild(this.bmp);
 image.onload =  function handleImageLoad(event) {
 var img = event.target;
 
       console.log("bmp image"+ img.width);
 
       
     

}
  //  var img = event.target;
 //  bmp = new createjs.Bitmap(img);
 //   bmp.x = this.pbwidth * -0.5;
 //   bmp.y = this.pbheight *- 0.5;
 //   p.addChild(bmp);
 //   bmp.width = 40;
  //  bmp.height = 40;
    
    console.log("handleImageLoad"+ p.getNumChildren());
 // }
  
//  this.addEventListener("tick", this.handleTick);
  }
 
  p.setOrigin = function(ox,oy){
        this.xOrigin = ox;
        this.yOrigin = oy;
        this.oPoint = new createjs.Point(ox,oy);
        
      }
      p.getOrigin = function(){
          return this.oPoint;
      }
      
      p.handleTick = function (event) {
      console.log("pball tick");
}
      
  window.PlayerBall = PlayerBall;
 
}());

