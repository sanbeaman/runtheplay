(function() {
  
  var PlayerButton = function  (pbId,pbWidth, pbHeight ,pbColor,pbLabel,pbHasImg,pbImg) {
    this.initialize(pbId,pbWidth, pbHeight ,pbColor,pbLabel,pbHasImg,pbImg);
  }
  
  var pb = PlayerButton.prototype = new createjs.Container(); // inherit from container
  pb.pbId;
  pb.backShape;
  pb.topShape;
  pb.count;
  pb.pbSrc;
  pb.pbHasImg;
  
  pb.oPoint;
  pb.xOrigin;
  pb.yOrigin;
  pb.bmpball;
  pb.pbLabelText;
//  pb.pbLabel;
  pb.pbIsActive;
  
  pb.Container_initialize = pb.initialize;
  pb.initialize = function (pbId,pbWidth, pbHeight ,pbColor, pbLabel, pbHasImg, pbImg) {
    
    this.Container_initialize();
    this.pbId = pbId;
    this.pbWidth = pbWidth;
    this.pbHeight = pbHeight;
    this.pbLabel = pbLabel;
    this.pbHasImg = pbHasImg;
   this.pbImg = pbImg;
    this.x = this.x;
    this.y = this.y;
    this.pbIsActive = false;
    this.pbLabelText = new createjs.Text(pbLabel, "14px Arial", "#FFF");
    if (!pbColor) { pbColor = "#CCC"; }
 
    // if (this.pbLabel == "ball"){
    //   this.pbWidth = this.pbWidth * 0.7;
     //  this.pbHeight = this.pbHeight * 0.7;
   //  }
     console.log("pbWidth= "+ this.pbWidth);
     if (this.pbHasImg){
     //  var img =new  Image();
      var img = this.pbImg;
    //   console.log(" this.pbImg;"+ img.width)
     this.backShape = new createjs.Bitmap(img);
     
      var currentWidth = img.width;
           var desiredWidth = 40;
           var scaleFactor = desiredWidth / currentWidth;
     this.backShape.scaleX = scaleFactor;
     this.backShape.scaleY = scaleFactor;
     
       this.addChild(this.backShape);
          this.backShape.x= this.pbWidth * -0.5;
        this.backShape.y = this.pbHeight * -0.5;
     // img.onload = handleImageLoad;
      
  
    } else {
             this.backShape = new createjs.Shape();
        this.backShape.graphics.setStrokeStyle(1);
        this.backShape.graphics.beginStroke(createjs.Graphics.getRGB(255,255,255));
        this.backShape.graphics.beginFill(pbColor).drawEllipse(0,0,this.pbWidth,this.pbHeight);
        this.addChild(this.backShape);
        this.backShape.x= this.pbWidth * -0.5;
        this.backShape.y = this.pbHeight * -0.5;
    }
    this.topShape = new createjs.Shape();
    this.topShape.graphics.setStrokeStyle(3);
     this.topShape.graphics.beginStroke(createjs.Graphics.getRGB(255,255,255));
    this.topShape.graphics.drawEllipse(0,0,this.pbWidth,this.pbHeight);
    this.addChild(this.topShape);
    this.topShape.x= this.backShape.x;
    this.topShape.y = this.backShape.y;
    this.topShape.alpha = 0;
   
    if (this.pbLabel != "ball"){
  this.pbLabelText = new createjs.Text(pbLabel, "14px Arial", "#FFF");
//	text.textBaseline = "top";
	this.pbLabelText.textAlign = "center";
 	this.pbLabelText.x = 0;
	this.pbLabelText.y = this.pbLabelText.getMeasuredHeight() *-0.5; 
 this.pbLabelText.cursor = "pointer";
   this.pbLabelText.mouseEnabled = false;
       this.addChild(this.pbLabelText);
    }
    this.mouseChildren = false;
    this.enableMouseOver = true;
 //  this.addEventListener("dblclick", this.handle_dblclick);
    //  this.addEventListener("mouseout", this.handle_mouseout);
       this.addEventListener("rollover", this.handle_rollover);
      this.addEventListener("rollout", this.handle_rollout);
    console.log("thisIS")
  }
  function handleImageLoad(event){

            var imgo = event.target;
            var currentWidth = imgo.width;
           var desiredWidth = 40;
           var scaleFactor = desiredWidth / currentWidth;
          var cont =  event.currentTarget;
           var contparent = cont.parent;
            console.log("contparent =" + contparent);
          contparent.scaleX = scaleFactor;
           console.log("scaleFactor =" + scaleFactor + "imgo.width" + imgo.width);
           
  }
  function updateParentStage(context){
   var gStage =  context.getStage();
    gStage.update();
  
  }
    pb.handle_mouseover = function (event) {    
    var obj  = event.currentTarget;
    obj.topShape.alpha = 1;
       
    } 
      pb.handle_mouseout = function (event) {    
    var obj  = event.currentTarget;
    obj.topShape.alpha = 0;
       
    } 
      pb.handle_rollover = function (event) {    
    var obj  = event.currentTarget;
    obj.topShape.alpha = 1;
       console.log('rollover');
       var gStage = obj.getStage();
       gStage.update();
       
    } 
      pb.handle_rollout = function (event) {    
    var obj  = event.target;
    if (!obj.pbIsActive){
        obj.topShape.alpha = 0;
           console.log('rollout');
             var gStage = obj.getStage();
       gStage.update();
    }
  
    } 
      PlayerButton.prototype.setActive = function(isActive){
     console.log("setActive="+  this.pbIsActive);
     this.pbIsActive = isActive;
     if (!isActive){
       this.topShape.alpha = 0;
        updateParentStage(this);
     }
    
    }
      PlayerButton.prototype.getLabel = function(){
     console.log("this.pbLabelText="+  this.pbLabelText);
     return this.pbLabel;
    }
    
    PlayerButton.prototype.setNewLabel = function(newLbl){
    this.pbLabel = newLbl;
    
      this.pbLabelText.text = "";
      this.pbLabelText.text =this.pbLabel;
      console.log("newLbl="+ this.pbLabel);
         updateParentStage(this);
    }
   
      PlayerButton.prototype.setOrigin = function(ox,oy){
        this.xOrigin = ox;
        this.yOrigin = oy;
        this.oPoint = new createjs.Point(ox,oy);
        
      }
       PlayerButton.prototype.getOrigin = function(){
          return this.oPoint;
      }
        
        window.PlayerButton = PlayerButton;
}());

