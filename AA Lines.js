function deg2rad( degress ) {
    return degress * Math.PI / 180.0;
}
function angle_to_vec( pitch, yaw ) {
    var p = deg2rad( pitch );
    var y = deg2rad( yaw )
    var sin_p = Math.sin( p );
    var cos_p = Math.cos( p );
    var sin_y = Math.sin( y );
    var cos_y = Math.cos( y );
    return [ cos_p * cos_y, cos_p * sin_y, -sin_p ];
}
function drawLines(){
	
	var realyaw = [0,Local.GetRealYaw(),0];
	var fakeyaw = [0,Local.GetFakeYaw(),0];
	var realforward = angle_to_vec(0,realyaw[1]);
	var fakeforward = angle_to_vec(0,fakeyaw[1]);
	Global.Print(realforward + "\n");
	realforward[0]*=50;
	realforward[1]*=50;
	realforward[2]*=50;
	fakeforward[0]*=50;
	fakeforward[1]*=50;
	fakeforward[2]*=50;
	var origin = Entity.GetRenderOrigin(Entity.GetLocalPlayer());
	var endreal = [];
	endreal[0] = realforward[0] + origin[0];
	endreal[1] = realforward[1] + origin[1];
	endreal[2] = realforward[2] + origin[2];
	var fakereal = [];
	fakereal[0] = fakeforward[0] + origin[0];
	fakereal[1] = fakeforward[1] + origin[1];
	fakereal[2] = fakeforward[2] + origin[2];
	Render.Line(Render.WorldToScreen(origin)[0],Render.WorldToScreen(origin)[1],Render.WorldToScreen(endreal)[0],Render.WorldToScreen(endreal)[1],[255,255,255,255]);
	Render.Line(Render.WorldToScreen(origin)[0],Render.WorldToScreen(origin)[1],Render.WorldToScreen(fakereal)[0],Render.WorldToScreen(fakereal)[1],UI.GetColor("Visual","SELF","Chams","Desync Color"));
	Render.String(Render.WorldToScreen(endreal)[0]-15,Render.WorldToScreen(endreal)[1],0,"REAL",[255,255,255,255],7);
	Render.String(Render.WorldToScreen(fakereal)[0]-15,Render.WorldToScreen(fakereal)[1],0,"REAL",[255,255,255,255],7);
	
}Cheat.RegisterCallback("Draw","drawLines")