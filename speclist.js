var observators = [];
function getObservators(){
	var ents = Entity.GetPlayers();
	var local = Entity.GetLocalPlayer();
	var localtarget = Entity.GetProp(local,"DT_BasePlayer","m_hObserverTarget");
	if(!local)return;
	observators = [];
	for(i = 0; i < ents.length;i++){
		if(Entity.IsAlive(local)){
			if(!ents[i] || Entity.IsAlive(ents[i]))continue;
			var observer = Entity.GetProp(ents[i],"DT_BasePlayer","m_hObserverTarget");
			if(!observer || observer == "m_hObserverTarget")continue;
			if(observer == local)observators.push(Entity.GetName(ents[i]));
		}
		else{
			if(!ents[i] || Entity.IsAlive(ents[i]))continue;
			var observer = Entity.GetProp(ents[i],"DT_BasePlayer","m_hObserverTarget");
			if(!observer || observer == "m_hObserverTarget")continue;
			if(observer == localtarget)observators.push(Entity.GetName(ents[i]));
		}
	}
}
function drawObservators(){
	var screen = Render.GetScreenSize();
	var type = UI.GetValue("Script Items","type");
	var font = Render.AddFont("Verdana",8,100);
	for(i = 0; i < observators.length; i++){
		var name = observators[i];
		var size = Render.TextSizeCustom(name,font);
		Render.StringCustom(screen[0]-size[0]-15,(i*20)+5,0,name,[255,255,255,255],font);
	}
	
}
function onRoundStart(){
	observators = [];
}
Global.RegisterCallback("Draw","getObservators");
Global.RegisterCallback("Draw","drawObservators");
Global.RegisterCallback("round_start","onRoundStart");
