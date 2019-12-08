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
var create_window = function( label, start,dimensions, color ){
	Render.FilledRect(start[0],start[1],dimensions[0],5,color);
	Render.FilledRect(x,y+5,500,250*1.6,[44,48,55,255]);
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

function main(){
	// Put all your callbacks here for features
	Global.RegisterCallback("Draw","menu");
}main();