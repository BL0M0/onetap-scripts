//CREDITS:
// Yuca (gamesense watermark)(https://onetap.su/members/yuca.6427/)
//


var x = Global.GetScreenSize()[0]/4;
var y = Global.GetScreenSize()[1]/3;
var settings = {
	top_bar_color_r: 226,
	top_bar_color_g: 182,
	top_bar_color_b: 102,
	checkbox_color_r: 226,
	checkbox_color_g: 182,
	checkbox_color_b: 102
}
function hsv2rgb(h, s, v)
{
   var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
var checkbox_state = [];
var checkbox_waitforunclick = [];
var checkbox_create = function(name,xx,yy,id){
		var cur = Global.GetCursorPosition();
		var colorDeselected = [31,33,37,255];
		var rgb = hsv2rgb(Global.Tickcount() % 350 / 350,1,1);
		var hovered = [56,60,67,255];
		if(checkbox_waitforunclick[id]){
			if(checkbox_state[id] && !checkbox_state[1])colorDeselected = [settings.checkbox_color_r,settings.checkbox_color_g,settings.checkbox_color_b,255];
			if(checkbox_state[id] && checkbox_state[1])colorDeselected = [rgb.r,rgb.g,rgb.b,255];
			Render.FilledRect(xx,yy,10,10,colorDeselected);
			Render.Rect(xx-1,yy-1,12,12,[56,60,67,255]);
			Render.String(xx+13,yy-2,0,name,[255,255,255,255],7);
			var size = Render.TextSize(name);
			if(cur[0] > xx && cur[0] < 10+xx && cur[1] > yy && cur[1] < 10+yy){
				hovered = checkbox_state[1] ? [rgb.r,rgb.b,rgb.b,255] : [settings.top_bar_color_r,settings.top_bar_color_g,settings.top_bar_color_b,255];
			}
			if(!Global.IsKeyPressed(0x01) && cur[0] > xx && cur[0] < 10+xx && cur[1] > yy && cur[1] < 10+yy){
				checkbox_waitforunclick[id] = false;
			}
			return;
		}
		if(cur[0] > xx && cur[0] < 10+xx && cur[1] > yy && cur[1] < 10+yy){
			hovered = checkbox_state[1] ? [rgb.r,rgb.b,rgb.b,255] : [settings.top_bar_color_r,settings.top_bar_color_g,settings.top_bar_color_b,255];
		}
		if(Global.IsKeyPressed(0x01)&1 && cur[0] > xx && cur[0] < 10+xx && cur[1] > yy && cur[1] < 10+yy){
			checkbox_state[id] = !checkbox_state[id];
			checkbox_waitforunclick[id] = true;
		}
		if(checkbox_state[id] && !checkbox_state[1])colorDeselected = [settings.checkbox_color_r,settings.checkbox_color_g,settings.checkbox_color_b,255];
		if(checkbox_state[id] && checkbox_state[1])colorDeselected = [rgb.r,rgb.g,rgb.b,255];
		Render.FilledRect(xx,yy,10,10,colorDeselected);
		Render.Rect(xx-1,yy-1,12,12,hovered);
		Render.String(xx+13,yy-2,0,name,[255,255,255,255],7);
	}
function getKeyPressed(){
	for(i = 0; i < 0xA3; i++){
		if(Global.IsKeyPressed(i))return i;
		
	}
}
var hotkey_key = [];
var hotkey_waitforunclick = [];
var hotkey_create = function(xx,yy,id){
	var cur = Global.GetCursorPosition();
	var colorDeselected = [31,33,37,255];
	var rgb = hsv2rgb(Global.Tickcount() % 350 / 350,1,1);
	var hovered = [56,60,67,255];
	if(hotkey_waitforunclick[id]){
		if(checkbox_state[id] && !checkbox_state[1])colorDeselected = [settings.checkbox_color_r,settings.checkbox_color_g,settings.checkbox_color_b,255];
		if(checkbox_state[id] && checkbox_state[1])colorDeselected = [rgb.r,rgb.g,rgb.b,255];
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
function onBackground(){
	if(!UI.IsMenuOpen())return;
	var rgb = hsv2rgb(Global.Tickcount() % 350 / 350,1,1);
	if(!checkbox_state[1]){
		Render.FilledRect(x,y,500,5,[settings.top_bar_color_r,settings.top_bar_color_g,settings.top_bar_color_b,255]);
	}
	else{
		Render.FilledRect(x,y,500,5,[rgb.r,rgb.g,rgb.b,255]);
		
	}
	Render.FilledRect(x,y+5,500,250*1.6,[44,48,55,255]);
	if(!checkbox_state[1]){
		Render.GradientRect(x,y+5,500,5,0,[settings.top_bar_color_r,settings.top_bar_color_g,settings.top_bar_color_b,255],[44,48,55,255]);
	}
	else{
		Render.GradientRect(x,y+5,500,5,0,[rgb.r,rgb.g,rgb.b,255],[44,48,55,255]);
	}
	Render.String(x+250,y+17,1,"VexatiousCheff's GUI",[255,255,255,255],8);
	Render.Line(x + 20, y + 35,x+480,y+35,[56,60,67,255]);
	
}
var swap = 0;
var waitUntilLetdown = false;
function drawPosition(){
	var cur = Global.GetCursorPosition();
	
	if(Global.IsKeyPressed(0x01) && cur[0] > x && cur[0] < 500+x && cur[1] > y && cur[1] < 40+y){
		x = cur[0] -250;
		y = cur[1] - 20;
		waitUntilLetdown = true;
	}
	if(waitUntilLetdown){
		x = cur[0] -250;
		y = cur[1] - 20;
		if(!Global.IsKeyPressed(0x01))waitUntilLetdown = false;
	}
}

var tickcount = 0;

function draw_fatality_rect(x, y, width, height)
{
        var rgbcolor = hsv2rgb(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Gradient Speed"), 1, 1);

}

function draw_fatality_rect2(x2, y2, width2, height2)
{
        var rgbcolor = {r:0,g:0,b:0};

      Render.Rect( x2 + 45, y2 + 2, width2 + 60, height2 + -10, [ rgbcolor.g, rgbcolor.b, rgbcolor.r, 200 ] );
     Render.FilledRect( x2 + 46, y2 + 3, width2 + 58, height2 + -10, [ 55, 55, 55, 200 ] );
     Render.FilledRect( x2 + 50, y2 + 7, width2 - -50, height2 - 19, [ 30, 30, 30, 200 ] ); // black
      Render.Rect( x2 + 50, y2 + 6, width2 - -50, height2 + -17, [ rgbcolor.g, rgbcolor.b, rgbcolor.r, 200 ] );
}

function draw_fatality_rect3(x3, y3, width3, height3)
{

}
var fps = 0;
var iterate = 0;
var averagefps = 0;
function draw_gs_watermark() // credit to dude who already made it :D
{
	if(!checkbox_state[3])return;
  var rgbcolor = hsv2rgb(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Gradient Speed"), 1, 1);
  var fps1 = 1 / Global.Frametime()
  var fps2 = Math.floor(fps1);
  averagefps = (fps1 + fps2) / 2;
  //var fps = Math.floor(fps1)
  iterate++;
  var rgb = hsv2rgb(Global.Tickcount() % 350 / 350,1,1);
  if(iterate%100==0){fps=Math.floor(averagefps);}
  var watermark_name = Entity.GetName(Entity.GetLocalPlayer( ));
  var today = new Date();
  var hours = today.getHours();
  var currenthours = hours % 12;
  var pmamtext = hours >= 12 ? "pm" : "am";
  var minutestext = today.getMinutes() >= 10 ? today.getMinutes(): "0" + today.getMinutes();
  var datetime = currenthours + ":" + minutestext + " " + pmamtext;
  var screensize = Global.GetScreenSize();
    x1 = screensize[0]/1.06;
    y1 = screensize[1]/150;
    draw_fatality_rect(x1, y1, 40, 35);
    draw_fatality_rect2(x1 - 150, y1, 140, 35);
    draw_fatality_rect3(x1 - 300, y1, 140, 35);
	Render.GradientRect(x1-100,y1+6,190,2,1,[255, 165, 0, 150], [ 65,105,225, 255]);
    Render.String( x1 + -64, y1 + 10, 0, "sense", [ 166, 243, 65, 255], 8 );
    Render.String( x1 + -96, y1 + 10, 0, "game", [ 255, 255, 255, 255], 8 );
    Render.String( x1 + -28, y1 + 10, 0, "|", [ 255, 255, 255, 255], 8 );
    Render.String( x1 - 20, y1 + 10, 0, "" + fps, [ 166, 243, 65, 255], 8 );
    Render.String( x1 + 5, y1 + 10, 0, "fps |", [ 255, 255, 255, 255], 8 );
    Render.String( x1 + 28, y1 + 10, 0, " " + datetime, [ 255, 255, 255, 255 ], 8 );

}
function radiospammer(){
	if(!checkbox_state[2])return;
	if(tickcount + 32 <= Global.Tickcount()){
		Global.ExecuteCommand("getout");
		tickcount = Global.Tickcount();
		
	}
}
function rainbow_bar(){
	if(!checkbox_state[4])return;
	var local = Entity.GetLocalPlayer();
	if(!local || !Entity.IsValid(local)) return;
	var rgb = hsv2rgb(Global.Tickcount() % 350 / 350,1,1);
	var screensize = Global.GetScreenSize();
	Render.FilledRect(0,0,screensize[0],2,[rgb.r,rgb.g,rgb.b,255])
}


function fakelagonkey(){
	if(!checkbox_state[5])return;
	if(Global.IsKeyPressed(hotkey_key[6]))UI.SetValue("Anti-Aim","Fake-Lag","Enabled",true);
	else UI.SetValue("Anti-Aim","Fake-Lag","Enabled",false);
}
var iterate2 = 0;
var anti_spam = false;
function doorspam(){
	if(!checkbox_state[7])return;
	iterate2++;
	if(iterate2%2==0 && Global.IsKeyPressed(hotkey_key[8]))Global.ExecuteCommand("+use"),anti_spam = true;
	else if(anti_spam){
		Global.ExecuteCommand("-use");
	}
}
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

function drawBox(){if(!UI.IsMenuOpen())return;if(!checkbox_state[9])return;
	if(!getVisual("Box"))return;
	var color = getVisualColor("Box");
	Render.Rect(x+50+250,y+65,150,280, [color[0],color[1],color[2],color[3]]);
	Render.Rect(x+49+250,y+64,152,282, [0,0,0,255]);
	Render.Rect(x+51+250,y+66,148,278, [0,0,0,255]);
}
function drawName(){if(!UI.IsMenuOpen())return;if(!checkbox_state[9])return;
	if(!getVisual("Name"))return;
	Render.String(x+125+250,y+50,1,"Jerry",getVisualColor("Name"),8);
}
function drawHealth(){if(!UI.IsMenuOpen())return;if(!checkbox_state[9])return;
	if(!getVisual("Health")) return;
	if(!getVisual("Health color override")){
	
		Render.FilledRect(x+42+250,y+65,2,280,[0,255,0,255]);
		Render.Rect(x+41+250,y+64,4,282,[0,0,0,255]);
	}
	else{
		Render.FilledRect(x+42+250,y+65,2,280,getVisualColor("Health color override"));
		Render.Rect(x+41+250,y+64,4,282,[0,0,0,255]);
	}
}
function drawWeapon(){if(!UI.IsMenuOpen())return;if(!checkbox_state[9])return;
	if(getVisual("Weapon") == 0) return;
	var type = getVisual("Weapon");
	var weapon = function(y2){Render.String(x+125+250,y+y2,1,"KNIFE",[255,255,255,255],3);}
	var icon = function(y2){Render.String(x+125+250,y+y2,1,"G",[255,255,255,255],6);}
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
function drawFlags(){if(!UI.IsMenuOpen())return;if(!checkbox_state[9])return;
	var draw = function(text,height,color){
		Render.String(x+52+150+250,
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
function drawSkeleton(){
	if(!checkbox_state[9])return;
	if(!UI.IsMenuOpen())return;
	if(!getVisual("Skeleton"))return;
	var color = getVisualColor("Skeleton");
	//head and neck
	Render.Line(x+125+250,y+90,x+127+250,y+110,color);
	Render.Line(x+127+250,y+110,x+129+250,y+120,color);
	//shoulders
	//right
	Render.Line(x+129+250,y+120,x+133+250,y+117,color);
	Render.Line(x+133+250,y+117,x+160+250,y+115,color);
	//left
	Render.Line(x+129+250,y+120,x+115+250,y+115,color);
	Render.Line(x+115+250,y+115,x+90+250,y+116,color);
	//upper arm
	//right
	//160,115
	Render.Line(x+160+250,y+115,x+162+250,y+150,color);
	Render.Line(x+162+250,y+150,x+125+250,y+140,color);
	//left
	//90,115
	Render.Line(x+90+250,y+115,x+87+250,y+147,color);
	Render.Line(x+87+250,y+147,x+110+250,y+140,color);
	
	//neck down
	//chest
	Render.Line(x+129+250,y+120,x+133+250,y+160,color);
	//stomach
	Render.Line(x+133+250,y+160,x+133+250,y+190,color);
	//pelvis and down
	//left upper thigh
	Render.Line(x+133+250,y+190,x+120+250,y+210,color);
	//right upper thigh
	Render.Line(x+133+250,y+190,x+150+250,y+220,color);
	//left thigh
	Render.Line(x+120+250,y+210,x+90+250,y+280,color);
	//right thigh
	Render.Line(x+150+250,y+220,x+155+250,y+282,color);
	//left foot
	Render.Line(x+90+250,y+280,x+94+250,y+303,color);
	//right foot
	Render.Line(x+155+250,y+282,x+167+250,y+320,color);
}
function menu(){
	if(!UI.IsMenuOpen())return;
	checkbox_create("Rainbow",x+50,y+50,1);
	checkbox_create("Radiospammer (broken?)",x+50,y+70,2);
	checkbox_create("Gamesense Watermark",x+50,y+90,3);
	checkbox_create("Gamesense bar",x+50,y+110,4);
	checkbox_create("Fakelag on key", x + 50, y + 130, 5);
	checkbox_create("Doorspam on key", x + 50, y + 150, 7);
	checkbox_create("Preview Visuals", x + 50, y + 170, 9);
	hotkey_create(x+155,y+134,6);
	hotkey_create(x+170,y+154,8);
}
function setupUI(){
	UI.AddLabel("[VexatiousCheff's GUI Stuff] (CONFIGURE FROM GUI)")
	UI.AddCheckbox("Rainbow");
	UI.AddCheckbox("Radiospammer");
	UI.AddCheckbox("GS Watermark");
	UI.AddCheckbox("GS Bar");
	UI.AddCheckbox("Fakelagonkey");
	UI.AddCheckbox("Doorspamonkey");
	UI.AddCheckbox("Preview Visuals");
	UI.AddSliderInt("Fakelag key", 0, 0xA3);
	UI.AddSliderInt("Doorspammer", 0, 0xA3);
	var screensize = Global.GetScreenSize();
	UI.AddSliderInt("[]X", 0, screensize[0]);
	UI.AddSliderInt("[]Y", 0, screensize[1]);
	//UI.AddHotkey("Fakelag key");
	//UI.AddHotkey("Doorspammer");
	checkbox_state[1] = get("Rainbow");
	checkbox_state[2] = get("Radiospammer");
	checkbox_state[3] = get("GS Watermark");
	checkbox_state[4] = get("GS Bar");
	checkbox_state[5] = get("Fakelagonkey");
	hotkey_key[6] = get("Fakelag key");
	hotkey_key[7] = get("Doorspammer");
	checkbox_state[9] = get("Preview Visuals");
	x = get("[]X");
	y = get("[]Y");
}
function setUIValues(){
	UI.SetValue("Rainbow",checkbox_state[1])
	UI.SetValue("Radiospammer",checkbox_state[2])
	UI.SetValue("GS Watermark",checkbox_state[3])
	UI.SetValue("GS Bar",checkbox_state[4])
	UI.SetValue("Fakelagonkey",checkbox_state[5])
	UI.SetValue("Fakelag key",hotkey_key[6]);
	UI.SetValue("Doorspammer",hotkey_key[8]);
	UI.SetValue("Doorspamonkey",checkbox_state[7]);
	UI.SetValue("Preview Visuals", checkbox_state[9]);
	UI.SetValue("[]X",x);
	UI.SetValue("[]Y",y);
}
function main(){
	setupUI();
	Global.RegisterCallback("Draw","onBackground");
	Global.RegisterCallback("Draw", "drawBox");
	Global.RegisterCallback("Draw", "drawName");
	Global.RegisterCallback("Draw", "drawHealth");
	Global.RegisterCallback("Draw", "drawWeapon");
	Global.RegisterCallback("Draw", "drawFlags");
	Global.RegisterCallback("Draw", "drawSkeleton");
	Global.RegisterCallback("Draw", "drawPosition");
	Global.RegisterCallback("Draw", "rainbow_bar");
	Global.RegisterCallback("CreateMove","radiospammer");
	Global.RegisterCallback("CreateMove","doorspam");
	Global.RegisterCallback("CreateMove","fakelagonkey");
	Global.RegisterCallback("Draw","setUIValues");
	Global.RegisterCallback("Draw", "draw_gs_watermark");
	Global.RegisterCallback("Draw","menu");
}main();