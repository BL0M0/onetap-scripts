

var x ="[Visuals Preview] X";
var y ="[Visuals Preview] Y";
function get(element){
	return UI.GetValue("Script Items", element);
}
function getVisual(element){
	return UI.GetValue("Visual","ENEMIES","ESP", element);
}
function getVisualColor(element){
	return UI.GetColor("Visual","ENEMIES","ESP", element);
}
function setupUI(){
	var screensize = Global.GetScreenSize();
	UI.AddSliderInt(x,0,1920);
	UI.AddSliderInt(y,0,1080);
	UI.AddLabel("Warning: The flags do not work,\n	they are too much effort.")
}
function onBackground(){
	if(!UI.IsMenuOpen())return;
	
	Render.FilledRect(get(x),get(y),250,5,[226,182,102,255]);
	Render.FilledRect(get(x),get(y)+5,250,250*1.6,[44,48,55,255]);
	Render.GradientRect(get(x),get(y)+5,250,5,0,[226,182,102,255],[44,48,55,255]);
	Render.String(get(x)+125,get(y)+17,1,"Visuals Preview (ENEMIES)",[255,255,255,255],8);
	Render.Line(get(x) + 20, get(y) + 35,get(x)+230,get(y)+35,[56,60,67,255]);
}
function drawBox(){if(!UI.IsMenuOpen())return;
	if(!getVisual("Box"))return;
	var color = getVisualColor("Box");
	Render.Rect(get(x)+50,get(y)+65,150,280, [color[0],color[1],color[2],color[3]]);
	Render.Rect(get(x)+49,get(y)+64,152,282, [0,0,0,255]);
	Render.Rect(get(x)+51,get(y)+66,148,278, [0,0,0,255]);
}
function drawName(){if(!UI.IsMenuOpen())return;
	if(!getVisual("Name"))return;
	Render.String(get(x)+125,get(y)+50,1,"Jerry",getVisualColor("Name"),8);
}
function drawHealth(){if(!UI.IsMenuOpen())return;
	if(!getVisual("Health")) return;
	if(!getVisual("Health color override")){
	
		Render.FilledRect(get(x)+42,get(y)+65,2,280,[0,255,0,255]);
		Render.Rect(get(x)+41,get(y)+64,4,282,[0,0,0,255]);
	}
	else{
		Render.FilledRect(get(x)+42,get(y)+65,2,280,getVisualColor("Health color override"));
		Render.Rect(get(x)+41,get(y)+64,4,282,[0,0,0,255]);
	}
}
function drawWeapon(){if(!UI.IsMenuOpen())return;
	if(getVisual("Weapon") == 0) return;
	var type = getVisual("Weapon");
	var weapon = function(y2){Render.String(get(x)+125,get(y)+y2,1,"KNIFE",[255,255,255,255],3);}
	var icon = function(y2){Render.String(get(x)+125,get(y)+y2,1,"G",[255,255,255,255],6);}
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
		Render.Rect(get(x)+49,get(y)+64+280+4,152,4,[0,0,0,255]);
		Render.FilledRect(get(x)+50,get(y)+65+280+4,150,2,getVisualColor("Ammo"));
	}
}
function drawFlags(){if(!UI.IsMenuOpen())return;
	Global.Print(getVisual("Flags") + "\n");
	var draw = function(text,height,color){
		Render.String(get(x)+52+150,
					  get(y)+height,0,text,
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
	Render.Line(get(x)+125,get(y)+90,get(x)+127,get(y)+110,color);
	Render.Line(get(x)+127,get(y)+110,get(x)+129,get(y)+120,color);
	//shoulders
	//right
	Render.Line(get(x)+129,get(y)+120,get(x)+133,get(y)+117,color);
	Render.Line(get(x)+133,get(y)+117,get(x)+160,get(y)+115,color);
	//left
	Render.Line(get(x)+129,get(y)+120,get(x)+115,get(y)+115,color);
	Render.Line(get(x)+115,get(y)+115,get(x)+90,get(y)+116,color);
	//upper arm
	//right
	//160,115
	Render.Line(get(x)+160,get(y)+115,get(x)+162,get(y)+150,color);
	Render.Line(get(x)+162,get(y)+150,get(x)+125,get(y)+140,color);
	//left
	//90,115
	Render.Line(get(x)+90,get(y)+115,get(x)+87,get(y)+147,color);
	Render.Line(get(x)+87,get(y)+147,get(x)+110,get(y)+140,color);
	
	//neck down
	//chest
	Render.Line(get(x)+129,get(y)+120,get(x)+133,get(y)+160,color);
	//stomach
	Render.Line(get(x)+133,get(y)+160,get(x)+133,get(y)+190,color);
	//pelvis and down
	//left upper thigh
	Render.Line(get(x)+133,get(y)+190,get(x)+120,get(y)+210,color);
	//right upper thigh
	Render.Line(get(x)+133,get(y)+190,get(x)+150,get(y)+220,color);
	//left thigh
	Render.Line(get(x)+120,get(y)+210,get(x)+90,get(y)+280,color);
	//right thigh
	Render.Line(get(x)+150,get(y)+220,get(x)+155,get(y)+282,color);
	//left foot
	Render.Line(get(x)+90,get(y)+280,get(x)+94,get(y)+303,color);
	//right foot
	Render.Line(get(x)+155,get(y)+282,get(x)+167,get(y)+320,color);
}
function main(){
	Global.RegisterCallback("Draw", "onBackground");
	Global.RegisterCallback("Draw", "drawBox");
	Global.RegisterCallback("Draw", "drawName");
	Global.RegisterCallback("Draw", "drawHealth");
	Global.RegisterCallback("Draw", "drawWeapon");
	Global.RegisterCallback("Draw", "drawFlags");
	Global.RegisterCallback("Draw", "drawSkeleton");
}
main();
setupUI();