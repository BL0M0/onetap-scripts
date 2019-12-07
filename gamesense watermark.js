//
// This script was originally made by Yuca
// (https://onetap.su/members/yuca.6427/)
// Props to him for the original script!
//


function hsv_to_rgb(h, s, v)
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
function getCustomValue(xy) {
var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", xy);
return value;}
var position = {
  x1: 0,
  y1: 0
}

function draw_fatality_rect(x, y, width, height)
{
        var rgbcolor = hsv_to_rgb(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Gradient Speed"), 1, 1);

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
  var rgbcolor = hsv_to_rgb(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Gradient Speed"), 1, 1);
  var fps1 = 1 / Global.Frametime()
  var fps2 = Math.floor(fps1);
  averagefps = (fps1 + fps2) / 2;
  //var fps = Math.floor(fps1)
  iterate++;
  var rgb = hsv_to_rgb(Global.Tickcount() % 350 / 350,1,1);
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
Global.RegisterCallback("Draw", "draw_gs_watermark")

