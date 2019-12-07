

var x = Global.GetScreenSize()[0]/4;
var y = Global.GetScreenSize()[1]/3;
function get(element){
	return UI.GetValue("Script Items", element);
}
function getVisual(element){
	return UI.GetValue("Visual","ENEMIES","ESP", element);
}
function getVisualColor(element){
	return UI.GetColor("Visual","ENEMIES","ESP", element);
}
function onBackground(){
	if(!UI.IsMenuOpen())return;
	
	Render.FilledRect(x,y,250,5,[226,182,102,255]);
	Render.FilledRect(x,y+5,250,250*1.6,[44,48,55,255]);
	Render.GradientRect(x,y+5,250,5,0,[226,182,102,255],[44,48,55,255]);
	Render.String(x+125,y+17,1,"Visuals Preview (ENEMIES)",[255,255,255,255],8);
	Render.Line(x + 20, y + 35,x+230,y+35,[56,60,67,255]);
}
function drawBox(){if(!UI.IsMenuOpen())return;
	if(!getVisual("Box"))return;
	var color = getVisualColor("Box");
	Render.Rect(x+50,y+65,150,280, [color[0],color[1],color[2],color[3]]);
	Render.Rect(x+49,y+64,152,282, [0,0,0,255]);
	Render.Rect(x+51,y+66,148,278, [0,0,0,255]);
}
function drawName(){if(!UI.IsMenuOpen())return;
	if(!getVisual("Name"))return;
	Render.String(x+125,y+50,1,"Jerry",getVisualColor("Name"),8);
}
function drawHealth(){if(!UI.IsMenuOpen())return;
	if(!getVisual("Health")) return;
	if(!getVisual("Health color override")){
	
		Render.FilledRect(x+42,y+65,2,280,[0,255,0,255]);
		Render.Rect(x+41,y+64,4,282,[0,0,0,255]);
	}
	else{
		Render.FilledRect(x+42,y+65,2,280,getVisualColor("Health color override"));
		Render.Rect(x+41,y+64,4,282,[0,0,0,255]);
	}
}
function drawWeapon(){if(!UI.IsMenuOpen())return;
	if(getVisual("Weapon") == 0) return;
	var type = getVisual("Weapon");
	var weapon = function(y2){Render.String(x+125,y+y2,1,"KNIFE",[255,255,255,255],3);}
	var icon = function(y2){Render.String(x+125,y+y2,1,"G",[255,255,255,255],6);}
	if(!getVisual("Ammo")){
		if(type == 1){
			icon(282+65);
		}
		if(type == 2){
			weapon(282+65);
		}
		if(type >= 3){
			weapon(282+77);
			icon(282+65);
		}
		
	}
	else{
		if(type == 1){
			icon(282+65+6);
		}
		if(type == 2){
			weapon(282+65+6);
		}
		if(type >= 3){
			weapon(282+77+6);
			icon(282+65+6);
		}
		Render.Rect(x+49,y+64+280+4,152,4,[0,0,0,255]);
		Render.FilledRect(x+50,y+65+280+4,150,2,getVisualColor("Ammo"));
	}
}
function drawFlags(){if(!UI.IsMenuOpen())return;
	var draw = function(text,height,color){
		Render.String(x+52+150,
					  y+height,0,text,
					  [color[0],color[1],color[2],255],8);
	}
	var flag = getVisual("Flags");
	if(flag == 0)return;
	if(flag >= 1){
		draw("$1337",65,[84,196,84]);
		draw("LC",65+10,[255,255,255]);
		draw("SCOPE",65+20,[255,255,255]);
		draw("FLASH",65+30,[9,127,196]);
		draw("R",65+40,[9,127,196]);
	}
}
function drawSkeleton(){if(!UI.IsMenuOpen())return;
	if(!getVisual("Skeleton"))return;
	var color = getVisualColor("Skeleton");
	//head and neck
	Render.Line(x+125,y+90,x+127,y+110,color);
	Render.Line(x+127,y+110,x+129,y+120,color);
	//shoulders
	//right
	Render.Line(x+129,y+120,x+133,y+117,color);
	Render.Line(x+133,y+117,x+160,y+115,color);
	//left
	Render.Line(x+129,y+120,x+115,y+115,color);
	Render.Line(x+115,y+115,x+90,y+116,color);
	//upper arm
	//right
	//160,115
	Render.Line(x+160,y+115,x+162,y+150,color);
	Render.Line(x+162,y+150,x+125,y+140,color);
	//left
	//90,115
	Render.Line(x+90,y+115,x+87,y+147,color);
	Render.Line(x+87,y+147,x+110,y+140,color);
	
	//neck down
	//chest
	Render.Line(x+129,y+120,x+133,y+160,color);
	//stomach
	Render.Line(x+133,y+160,x+133,y+190,color);
	//pelvis and down
	//left upper thigh
	Render.Line(x+133,y+190,x+120,y+210,color);
	//right upper thigh
	Render.Line(x+133,y+190,x+150,y+220,color);
	//left thigh
	Render.Line(x+120,y+210,x+90,y+280,color);
	//right thigh
	Render.Line(x+150,y+220,x+155,y+282,color);
	//left foot
	Render.Line(x+90,y+280,x+94,y+303,color);
	//right foot
	Render.Line(x+155,y+282,x+167,y+320,color);
}
function drawPosition(){
	var cur = Global.GetCursorPosition();
	
	if(Global.IsKeyPressed(0x01) && cur[0] > x && cur[0] < 250+x && cur[1] > y && cur[1] < (250*1.6)+y){
		x = cur[0]-125;
		y = cur[1]-50;
	}
}
function main(){
	Global.RegisterCallback("Draw", "onBackground");
	Global.RegisterCallback("Draw", "drawBox");
	Global.RegisterCallback("Draw", "drawName");
	Global.RegisterCallback("Draw", "drawHealth");
	Global.RegisterCallback("Draw", "drawWeapon");
	Global.RegisterCallback("Draw", "drawFlags");
	Global.RegisterCallback("Draw", "drawSkeleton");
	Global.RegisterCallback("Draw", "drawPosition");
}
main();