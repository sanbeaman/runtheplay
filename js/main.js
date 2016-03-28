const 
	TOOL_MOVE = 0,
	TOOL_SELECT = 1,
	TOOL_TEXT = 2;
	
app = {
	stage: null,
	canvas: null,
 containerField: null,
 activeFieldItem: null,
 fieldsBtnsArray: [],
 isReset: true,
 update: true,
 queue: null,
	layers: [],
	tool: TOOL_SELECT,
	callbacks: {},
	selection: {
		x: -1, x: -1
	},
	renameLayer: 0,
 
	undoBuffer: [],
	redoBuffer: [],
  addFieldItem: function (fi){
  this.fieldsBtnsArray.push(fi);
 //  this.fieldBtnsArray.push(fi);
   console.log("addFI"+ fi);
 },
 loadFieldItems: function() {
 
  	this.stage = new createjs.Stage(this.canvas);
   this.stage.x = 0;
   this.stage.y = 0;
   
	//	this.stage.regX = -this.canvas.width / 2;
		//this.stage.regY = -this.canvas.height / 2;
  createjs.Touch.enable(this.stage);
 // enabled mouse over / out events
 this.stage.enableMouseOver(10);
  this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
	
// document.onselectstart = function () { return false; };
 
 this.containerField = new createjs.Container();
  this.containerField.x= 0;
   this.containerField.y = 0;
  this.stage.addChild(this.containerField);
  
  
    var back_img = this.queue.getResult("imgField");
    var back_bmp = new createjs.Bitmap(back_img);
    back_bmp.y = 100;
            
            this.containerField.addChild(back_bmp);
        
          //  this.fieldBtnsArray = [];
            
            var pbW = 40;
            var pbH = 40;
            var pbPad = 60;
            
            var xhold = pbW;
            var yhold = 40;
            var hcount =1;
            var vcount =1;
            
           var coverImg = new Image();
            
            // create and populate the screen with random daisies:
            for(var i = 0; i < 13; i++){
                          var clr;
                          var pbid;
                          var hasImg;
                          var coverImg;
                          
                          if (i < 6){
                            clr = "#0000FF";
                            pbid = "H"+ hcount;
                            hcount = hcount +1;
                          hasImg = false;
                          
                          } else if (i == 6) {
                            clr = "#000000";
                            pbid = "ball";
                           hasImg = true;
                            coverImg = this.queue.getResult("imgBall");
                          } else if ( i > 6){
                            clr = "#FF0000";
                            pbid = "V"+vcount;
                            vcount = vcount + 1;
                          hasImg = false;
                          } else {
                            
                          }
                         var pb = this.containerField.addChild(new PlayerButton(i,pbW,pbH,clr,pbid,hasImg,coverImg));
                         // if (i == 6){
                           // var pball = pb.addChild(new PlayerBall(i,pbW,pbH,"00ff00",pbid));
                           // console.log("PlayerBall");
                            //update = true;
                          //} 
                          pb.name = pbid;
                          pb.cursor = "pointer";
                          pb.x = xhold;
                          pb.y = yhold;
                          pb.setOrigin(xhold,yhold);
                          xhold = xhold + pbPad;
                         
                          // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
                          pb.addEventListener("pressmove", function(evt) {
                       //   console.log("pressmove");
                            // indicate that the stage should be updated on the next tick:
                                        app.update = true;
                                          evt.currentTarget.x = evt.stageX;
                                          evt.currentTarget.y = evt.stageY;
                                          evt.currentTarget.cursor = "pointer";
                                     //  this.stage.update();
                                        });
                          
                          pb.addEventListener("pressup", function(evt) { 
                            var newY = evt.currentTarget.getOrigin();
                            console.log("newY" + newY);
                          
                            if (app.activeFieldItem != null){
                              app.activeFieldItem.setActive(false);
                            }
                            evt.target.setActive(true);
                            app.activeFieldItem = evt.target;
                             app.update = true;
                               app.isReset = false;
                          });
                          
                          pb.addEventListener("dblclick", function(evt) { 
                          // handle_dblclick);
                          evt.target.getLabel();
                          console.log('_dblclick _cTarget'+ evt.currentTarget + ' _target='+evt.target);
                          
                        });
                        app.addFieldItem(pb);
                        //   app.fieldBtnsArray.push(pb); 
                            
                            };
                             document.getElementById("loader").className = "";
            createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", handleTicker);
           
           // createjs.Ticker.addEventListener("tick", tick);
  
 },
	
	addUndo: function () {
		this.undoBuffer.push(this.layers.toString());
		this.redoBuffer = [];
	},

	
	loadLayers: function (from, to) {
 /*
		var json, jsonString = from.pop();
		if (jsonString == undefined) return false;
		to.push(this.layers.toString());
		json = JSON.parse(jsonString);
		for (var i = 0, layer, jsonLayer; ((layer = this.layers[i]) && (jsonLayer = json[i])); i++) {
			for (value in jsonLayer) {
				if (value != 'filters')	{
					layer[value] = jsonLayer[value];
				} else {
					var hadFilters = (layer.filters != null && layer.filters.length > 0);
					layer.filters = [];
					for (var j = 0; j < jsonLayer.filters.names.length; j++) {
						if (jsonLayer.filters.names[j] == null) break;
						layer.filters[j] = new window[jsonLayer.filters.names[j]];
						for (value2 in jsonLayer.filters.values[0][j]) {
							layer.filters[j][value2] = jsonLayer.filters.values[0][j][value2];
						}
						hadFilters = true;
					}
					if (hadFilters) {
						if (layer.cacheCanvas) {
							layer.updateCache();
						} else {
							layer.cache(0, 0, layer.width, layer.height);
						}
					}
				}
			}
		}*/
		//this.refreshLayers();
	}
	
}
     
handleTicker = function (event) {
if (app.update){
   app.update = false;
   app.stage.update(event);
  //  console.log('tickkkkkk');
}
 
  
}   
$(document).ready(function () {
	app.canvas = $('canvas')[0];
 document.getElementById("loader").className = "loader";
	 //image manifest
 var manifest = [
 {src:"imgs/field_1024x640.png", id:"imgField"},
 {src:"imgs/ball_80x80.png", id:"imgBall"}
 ];

  app.queue  = new createjs.LoadQueue(true, "assets/");
  app.queue.addEventListener("complete", handlePreload_complete);
  app.queue.addEventListener("fileload", handlePreload_file);
  app.queue.loadManifest(manifest);
  
  function handlePreload_file(event){
             console.log("preload= " + event.item.type);
  }
  function handlePreload_complete(event){
    console.log("handlePreload_complete");
    app.loadFieldItems();
  }
   

    
});
        