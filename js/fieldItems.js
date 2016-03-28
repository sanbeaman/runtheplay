fiReset = function(){
 
   if (!app.isReset) {
    console.log("fiReset" + app.fieldsBtnsArray.length);
    
   for(var j = 0; j < app.fieldsBtnsArray.length; j++){
        var opoint = app.fieldsBtnsArray[j].getOrigin();
                app.fieldsBtnsArray[j].x = opoint.x;
                app.fieldsBtnsArray[j].y = opoint.y;
                
               }
               app.isReset = true;
            }
              app.update = true;
}

fiChangeLabel = function (newLbl) {
	app.activeFieldItem.setNewLabel(newLbl);
	hideDialog('#dialog-inspector');

}
app.callbacks.fiReset = function () {
	fiReset();
 }


app.callbacks.fiChangeLabel = function (e) {
	switch (e.type) {
		case "click":
			fiChangeLabel($('#dialog-inspector input').val());
			break;
		case "keydown":
			if (e.keyCode == 13)	fiChangeLabel($('#dialog-inspector input').val());
			break;
	}
}