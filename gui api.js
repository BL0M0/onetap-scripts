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

function menu(){
	if(!UI.IsMenuOpen())return;
	checkbox_create("Rainbow",x+50,y+50,1);
	checkbox_create("Radiospammer (broken?)",x+50,y+70,2);
	checkbox_create("Gamesense Watermark",x+50,y+90,3);
	checkbox_create("Gamesense bar",x+50,y+110,4);
	checkbox_create("Fakelag on key", x + 50, y + 130, 5);
	checkbox_create("Doorspam on key", x + 50, y + 150, 7);
	hotkey_create(x+155,y+134,6);
	hotkey_create(x+170,y+154,8);
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
function main(){
	Global.RegisterCallback("Draw","onBackground");
	Global.RegisterCallback("Draw","drawPosition");
	Global.RegisterCallback("Draw", "rainbow_bar");
	Global.RegisterCallback("CreateMove","radiospammer");
	Global.RegisterCallback("CreateMove","doorspam");
	Global.RegisterCallback("CreateMove","fakelagonkey");
	Global.RegisterCallback("Draw", "draw_gs_watermark");
	Global.RegisterCallback("Draw","menu");
}main();