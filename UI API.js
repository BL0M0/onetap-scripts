var x = 0;
var y = 0;
var color = [];
var dimensions = [];
var checkbox_state = [];
var checkbox_waitforunclick = [];
var checkbox_create = function(name,id){
	var xx = x + 30;
	var yy = y + (id*20) + 30;
	if(yy > y+dimensions[1]-20)yy = y + (6-id*20)+422,xx = xx + 140;
	if(yy > y+dimensions[1]-20)return;
	//if(yy > y+dimensions[1]-20)yy = y + (id-8*20)-110,xx=xx+140;
		var cur = Global.GetCursorPosition();
		var colorDeselected = [31,33,37,255];
		var hovered = [56,60,67,255];
		if(checkbox_waitforunclick[id]){
			if(checkbox_state[id])colorDeselected = color;
			Render.FilledRect(xx,yy,10,10,colorDeselected);
			Render.Rect(xx-1,yy-1,12,12,[56,60,67,255]);
			Render.String(xx+13,yy-2,0,name,[255,255,255,255],7);
			var size = Render.TextSize(name);
			if(cur[0] > xx && cur[0] < 10+xx && cur[1] > yy && cur[1] < 10+yy){
				hovered = color;
			}
			if(!Global.IsKeyPressed(0x01) && cur[0] > xx && cur[0] < 10+xx && cur[1] > yy && cur[1] < 10+yy){
				checkbox_waitforunclick[id] = false;
			}
			return;
		}
		if(cur[0] > xx && cur[0] < 10+xx && cur[1] > yy && cur[1] < 10+yy){
			hovered = color;
		}
		if(Global.IsKeyPressed(0x01)&1 && cur[0] > xx && cur[0] < 10+xx && cur[1] > yy && cur[1] < 10+yy){
			checkbox_state[id] = !checkbox_state[id];
			checkbox_waitforunclick[id] = true;
		}
		if(checkbox_state[id])colorDeselected = color;
		Render.FilledRect(xx,yy,10,10,colorDeselected);
		Render.Rect(xx-1,yy-1,12,12,hovered);
		Render.String(xx+13,yy-2,0,name,[255,255,255,255],7);
	}
function getKeyPressed(){
	for(i = 0; i < 0xA3; i++){
		if(Global.IsKeyPressed(i))return i;
	}
}
/*var slider_value = []; doesnt work yet, other stuff does
var slider_waitforunclick = [];
var slider_create = function(name,id,min,max){
	var yy = y + (id*20) + 30;
	var xx = x+30;
	var cur = Global.GetCursorPosition();
	var color_unfilled = [31,33,37,255];
	var color_filled = color;
	var hovered = [56,60,67,255];
	if(Global.IsKeyPressed(0x01)&1 && cur[0] > xx && cur[0] < 15+xx && cur[1] > yy && cur[1] < 15+yy){
		slider_waitforunclick[id] = true;
	}
	var delta = min + max;
	Render.FilledRect(x+30,yy,100+dimensions[0]/4-50,5,color_unfilled);
}*/

var hotkey_key = [];
var hotkey_waitforunclick = [];
var hotkey_create = function(xx,id){
	var yy = y + (id*20) + 30;
	var cur = Global.GetCursorPosition();
	var colorDeselected = [31,33,37,255];
	var hovered = [56,60,67,255];
	if(hotkey_waitforunclick[id]){
		if(checkbox_state[id])colorDeselected = color;
		Render.FilledRect(xx,yy,15,10,colorDeselected);
		Render.Rect(xx,yy,15,10,hovered);
		Render.String(xx+3,yy-5,0,"..",[255,255,255,255],7);
		var key = getKeyPressed();
		if(key == 27){
			hotkey_waitforunclick[id] = false;
			hotkey_key[id] = 0;
			return;
		}
		if(key >=2){
			hotkey_waitforunclick[id] = false;
			hotkey_key[id] = key;
			return;
		}
		return;
		
	}
	if(Global.IsKeyPressed(0x01)&1 && cur[0] > xx && cur[0] < 15+xx && cur[1] > yy && cur[1] < 15+yy){
			hotkey_waitforunclick[id] = true;
	}
	
	//var size = Render.TextSize(5 + " ");
	if(hotkey_key[id] + "" == "undefined")hotkey_key[id] = 0;
	Render.FilledRect(xx,yy-5,20,15,colorDeselected);
	Render.Rect(xx,yy-5,20,15,hovered);
	Render.String(xx+3,yy-5,0,hotkey_key[id] + "",[255,255,255,255],7);
}
var waitUntilLetdown2 = false;
var waitUntilLetdown = false;
var first = 1;
var previous_cur = [];
var was_clicked = false;
var was_clicked2 = false;
var create_window = function( label, dimension, colo , allowResize ){
	var cur = Global.GetCursorPosition();
	if(first == 1){
		dimensions = dimension;
		first=0;
	}
	if(!Global.IsKeyPressed(0x01))was_clicked = true;
	if(Global.IsKeyPressed(0x01) && was_clicked){
		previous_cur = Global.GetCursorPosition();
		previous_cur[0] = previous_cur[0] % x;
		previous_cur[1] = previous_cur[1] % y; // i just yolo'd this LMAO
		was_clicked = false;
	}
	
	Global.Print("Prev: " + previous_cur + ", Cur: " + cur + "\n");
	
	
	if(Global.IsKeyPressed(0x01) && cur[0] > x && cur[0] < dimension[0]+x && cur[1] > y && cur[1] < 40+y){
		x = cur[0] - previous_cur[0];
		y = cur[1] - previous_cur[1];
		waitUntilLetdown = true;
	}
	if(waitUntilLetdown){
		x = cur[0] - previous_cur[0];
		y = cur[1] - previous_cur[1];
		if(!Global.IsKeyPressed(0x01))waitUntilLetdown = false;
	}
	
	if(waitUntilLetdown2){
		dimensions[0] = cur[0]-x;
			dimensions[1] = cur[1]-y;
		if(!Global.IsKeyPressed(0x01))waitUntilLetdown2 = false;
	}
	
	if(allowResize){
		var start = [x+dimensions[0]/1.1,y+dimensions[1]];
		var middle = [x+dimensions[0],y+dimensions[1]];
		var end = [x+dimensions[0],y+dimensions[1]/1.1];
		
		if(Global.IsKeyPressed(0x01) && cur[0] > start[0] && cur[0] < end[0] && cur[1] < start[1] && cur[1] > end[1]){
			dimensions[0] = cur[0]-x;
			dimensions[1] = cur[1]-y;
			waitUntilLetdown2 = true;
		}
	}
	color = colo;
	Render.FilledRect(x,y,dimensions[0],5,colo);
	Render.FilledRect(x,y+5,dimensions[0],dimensions[1],[44,48,55,255]);
	Render.GradientRect(x,y+5,dimensions[0],5,0,color,[44,48,55,255]);
	Render.String(x+(dimensions[0]/2),y+15,1,label,[255,255,255,255],7);
	Render.Line(x+20,y+35,x+dimensions[0]-20,y+35,[56,60,67,255]);
	if(allowResize)
	Render.Polygon([middle,start,end],colo);
}

function setVariables(){
	UI.SetValue("Script Items", "\x20\x20\x20", x);
	UI.SetValue("Script Items", "\x20\x20\x20\x20", y);
}
function setupWindow(){
	var screensize = Global.GetScreenSize();
	UI.AddSliderInt("\x20\x20\x20",0,screensize[0]);
	UI.AddSliderInt("\x20\x20\x20\x20",0,screensize[1]);
	
	x = UI.GetValue("Script Items", "\x20\x20\x20");
	y = UI.GetValue("Script Items", "\x20\x20\x20\x20");
}


//
//
// DRAW YOUR MENU HERE!
// DRAW YOUR MENU HERE!
// DRAW YOUR MENU HERE!
//
//
function menu(){
	if(!UI.IsMenuOpen())return;
	create_window("GUI Label",[300,200],[255,255,255,255],true);
	checkbox_create("GUI Checkbox",1);
	checkbox_create("GUI Checkbox",2);
	checkbox_create("GUI Checkbox",3);
	hotkey_create(x+130,2);
	hotkey_create(x+130,3);
	hotkey_create(x+130,1);
	if(Global.IsKeyPressed(hotkey_key[1])){Global.Print(hotkey_key[1] + " is pressed\n");}
	if(Global.IsKeyPressed(hotkey_key[2])){Global.Print(hotkey_key[2] + " is pressed\n");}
	if(Global.IsKeyPressed(hotkey_key[3])){Global.Print(hotkey_key[3] + " is pressed\n");}
}
function main(){
	// must have for your script, saves where the menu last was and also draws it.
	setupWindow();
	Global.RegisterCallback("Draw","menu");
	Global.RegisterCallback("Draw","setVariables");
}main();