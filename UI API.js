var x = 0;
var y = 0;
var color = [];
var dimensions = [];
var checkbox_state = [];
var checkbox_waitforunclick = [];
var hotkey_id_should_move_back = [];
var first_checkbox = [];
var test2 = 0;
var highest_id = 0;
var previous_id = 0;
function is_checkbox_active(id){
	return checkbox_state[id];
}
function checkbox_create(name,id){
	var ui_name = "";
	if(!first_checkbox[id]){
		ui_name = ui_name + name;
		for(i = 0;i < id;i++){
			ui_name = ui_name + "\x20";
		}
		UI.AddCheckbox(ui_name);
		first_checkbox[id] = true;
		checkbox_state[id] = UI.GetValue("Script Items",ui_name);
		ui_name = "";
		return;
	}
	ui_name = ui_name + name;
	for(i = 0;i < id;i++){
		ui_name = ui_name + "\x20";
	}
	UI.SetValue("Script Items",ui_name,checkbox_state[id]);
	ui_name = "";
	if(id > previous_id){
		highest_id = id;
	}
	
	var xx = x + 30;
	var yy = y + (id*20) + 30;
	var antiweird = false;
	if(yy > y+dimensions[1]-20){yy = y + (6-id*20)+422,xx = xx + dimensions[0]/2;antiweird = true;};
	if(yy > y+dimensions[1]-20)return;
	var size = Render.TextSize(name);
	
	//have to do the size*1.05 thing because the width is inaccurate
	if(!antiweird){
		if((size[0]*1.05)+70 > dimensions[0]){name = "..";hotkey_id_should_move_back[id] = true;}
		else hotkey_id_should_move_back[id] = false;
	}
	else if (antiweird){
		var test = (dimensions[0]/2)+(size[0]*1.05)+70;
		if(test > dimensions[0]){
			name = "  ..";
			hotkey_id_should_move_back[id] = true;
			if(Render.TextSize("  ..")[0]*5>(dimensions[0]/2))return;
		}
		else hotkey_id_should_move_back[id] = false;
	}
	
	else hotkey_id_should_move_back[id] = false;
		var cur = Global.GetCursorPosition();
		var colorDeselected = [31,33,37,255];
		var hovered = [56,60,67,255];
		
		if(checkbox_waitforunclick[id]){
			if(checkbox_state[id])colorDeselected = color;
			if(xx > x+dimensions[0]-40)return;
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
		if(xx > x+dimensions[0]-40)return;
		if(!antiweird){
		Render.FilledRect(xx,yy,10,10,colorDeselected);
		Render.Rect(xx-1,yy-1,12,12,hovered);
		Render.String(xx+13,yy-2,0,name,[255,255,255,255],7);
		}else{
		Render.FilledRect(xx,yy,10,10,colorDeselected);
		Render.Rect(xx-1,yy-1,12,12,hovered);
		Render.String(xx+13/2,yy-2,0,name,[255,255,255,255],7);
		}
	}
function getKeyPressed(){
	for(i = 0; i < 0xA3; i++){
		if(Global.IsKeyPressed(i))return i;
	}
}
function clamp(val,low,high){
	if(low > val)
		return low;
	if(high < val)
		return high;
	return val;
	
}
var slider_value = [];
var slider_waitforunclick = [];
var gui_val = 0;
var slider_first = [];
function get_slider_value(id){
	return slider_value[id];
}
function slider_create(name,id,min,max){
	var ui_name = "";
	if(!slider_first[id]){
		ui_name = ui_name + name;
		for(i = 0;i < id;i++){
			ui_name = ui_name + "\x20";
		}
		UI.AddSliderInt(ui_name,min,max);
		slider_first[id] = true;
		slider_value[id] = UI.GetValue("Script Items",ui_name);
		ui_name = "";
		return;
	}
	ui_name = name;
	for(i = 0;i < id;i++){
		ui_name = ui_name + "\x20";
	}
	UI.SetValue("Script Items",ui_name,slider_value[id]);
	ui_name = "";
	var yy = y + (id*20) + 45;
	var xx = x+30;
	var cur = Global.GetCursorPosition();
	var color_unfilled = [31,33,37,255];
	var hovered = [56,60,67,255];
	if(slider_waitforunclick[id]){
		var delta = max - min;
		var cur2 = (cur[0] - xx)/100;
		cur2 = clamp(cur2,0,1)*100;
		var a = (cur[0]-xx)/100;
		a = clamp(a,0,1.25)*100;
		gui_val = Math.floor(a);
		var b = (cur[0]-xx)/125;
		slider_value[id] = Math.floor(clamp(b*delta,min,max));
		if(!Global.IsKeyPressed(0x01))slider_waitforunclick[id] = false;
	}
	if(Global.IsKeyPressed(0x01)&& cur[0] > xx && cur[0] < 100+xx && cur[1] > yy && cur[1] < 15+yy){
		slider_waitforunclick[id] = true;
	}
	if(slider_value[id] + "" == "undefined")slider_value[id] = 0;
	Render.FilledRect(xx,yy,125,5,color_unfilled);
	Render.FilledRect(xx,yy,gui_val,5,color);
	Render.String(xx,yy-15,0,name,[255,255,255,255],7);
	Render.String(xx+105,yy-15,0,slider_value[id] + "",[255,255,255,255],7);
}
var hotkey_key = [];
var hotkey_waitforunclick = [];
var hotkey_first = [];
function is_hotkey_active(id){
	return Global.IsKeyPressed(hotkey_key[id]);
}
function hotkey_create(xx,id){
	var ui_name = "";
	if(!hotkey_first[id]){
		ui_name = ui_name + id;
		for(i = 0;i < id;i++){
			ui_name = ui_name + "\x20";
		}
		UI.AddSliderInt(ui_name,0,0xA3);
		hotkey_first[id] = true;
		hotkey_key[id] = UI.GetValue("Script Items",ui_name);
		ui_name = "";
		return;
	}
	ui_name = id;
	for(i = 0;i < id;i++){
		ui_name = ui_name + "\x20";
	}
	UI.SetValue("Script Items", ui_name,hotkey_key[id]);
	var cur = Global.GetCursorPosition();
	var yy = y + (id*20) + 30;
	if(yy > y+dimensions[1]-20)return;
	if(hotkey_id_should_move_back[id])xx = x + 55;
	if(xx > x+dimensions[0]-30)return;
	var e = dimensions;
	if(80 < e) return;
	var colorDeselected = [31,33,37,255];
	var hovered = [56,60,67,255];
	if(hotkey_waitforunclick[id]){
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
var create_window = function( label, dimension, colo , allowResize , safezone){
	var cur = Global.GetCursorPosition();
	if(first == 1){
		dimensions = dimension;
		first=0;
	}
	if(!Global.IsKeyPressed(0x01))was_clicked = true;
	if(Global.IsKeyPressed(0x01) && was_clicked){
		previous_cur = Global.GetCursorPosition();
		previous_cur[0] = previous_cur[0] - x;
		previous_cur[1] = previous_cur[1] - y;
		was_clicked = false;
	}
	
	
	if(Global.IsKeyPressed(0x01) && cur[0] > x && cur[0] < dimension[0]+x && cur[1] > y && cur[1] < 40+y){
		waitUntilLetdown = true;
	}
	if(waitUntilLetdown){
		x = cur[0]-previous_cur[0];
		y = cur[1]-previous_cur[1];
		if(!Global.IsKeyPressed(0x01))waitUntilLetdown = false;
	}
	
	if(waitUntilLetdown2){
		dimensions[0] = cur[0]-x;
			dimensions[1] = cur[1]-y;
		if(!Global.IsKeyPressed(0x01))waitUntilLetdown2 = false;
	}
	if(dimensions[0] < safezone[0]){
		dimensions[0] = safezone[0];
		
	}
	if(dimensions[1] < safezone[1]){
		dimensions[1] = safezone[1];
	}
	if(allowResize){
		var start = [x+dimensions[0]-20,y+dimensions[1]];
		var middle = [x+dimensions[0],y+dimensions[1]];
		var end = [x+dimensions[0],y+dimensions[1]-20];
		
		if(Global.IsKeyPressed(0x01) && cur[0] > start[0] && cur[0] < end[0] && cur[1] < start[1] && cur[1] > end[1]){
			dimensions[0] = cur[0]-x;
			dimensions[1] = cur[1]-y;
			waitUntilLetdown2 = true;
			
		}
	}
	if(dimensions[0] < safezone[0]){
		dimensions[0] = safezone[0];
		
	}
	if(dimensions[1] < safezone[1]){
		dimensions[1] = safezone[1];
	}
	color = colo;
	Render.FilledRect(x,y,dimensions[0],5,colo);
	Render.FilledRect(x,y+5,dimensions[0],dimensions[1],[44,48,55,255]);
	Render.GradientRect(x,y+5,dimensions[0],5,0,color,[44,48,55,255]);
	Render.String(x+(dimensions[0]/2),y+15,1,label,[255,255,255,255],7);
	Render.Line(x+20,y+35,x+dimensions[0]-20,y+35,[56,60,67,255]);
	var swap = false;
	var pulse = Math.floor(Math.sin(Global.Realtime() * 2)*255);
	if(pulse < 0)pulse = -pulse;
	if(allowResize)
		Render.Polygon([middle,start,end],[colo[0],colo[1],colo[3],pulse]);
}

function setVariables(){
	
	UI.SetValue("Script Items", "\x20\x20", y);
	UI.SetValue("Script Items", "\x20\x20\x20", x);
}
function setupWindow(){
	var screensize = Global.GetScreenSize();
	UI.AddSliderInt("\x20\x20\x20",0,screensize[0]);
	UI.AddSliderInt("\x20\x20",0,screensize[1]);
	
	x = UI.GetValue("Script Items", "\x20\x20\x20");
	y = UI.GetValue("Script Items", "\x20\x20");
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
	create_window("GUI Label",[300,200],[255,255,255,255],true,[300,200]);
	checkbox_create("GUI Checkbox", 1);
	hotkey_create(x+130,1);
	slider_create("GUI Slider",2,0,50);
	var pulse = Math.floor(Math.sin(Global.Realtime() * 2)*255);
	if(pulse < 0)pulse = -pulse;
	if(is_checkbox_active(1)){
		Render.String(x+170,y+45,0,"Checkbox Active",[255,255,255,pulse],7);
	}
	if(is_hotkey_active(1)){
		Render.String(x+170,y+65,0,"Hotkey Active",[255,255,255,pulse],7);
	}
}
function main(){
	// must have for your script, saves where the menu last was and also draws it.
	setupWindow();
	Global.RegisterCallback("Draw","menu");
	Global.RegisterCallback("Draw","setVariables");
}main();