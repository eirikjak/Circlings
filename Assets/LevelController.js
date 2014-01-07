#pragma strict

public static class LevelState{
	//The number of circlings that has reached the goal
	public static var CirclingsInGoal:int;
	//The number of circlings that are active or waiting for launch
	public static var LiveCirclings:int;
	//The number of coins collected
	public static var CollectedCoins:int;
	
	public static function Reset(){
		CirclingsInGoal = 0;
		LiveCirclings = 0;
		CollectedCoins = 0;
	}

}

public var MinimumGoal:int = 0;
public var LevelContainer:GameObject;
public var Menu:GameObject;
private var menuHeight:float = 0.1;
function Start () {
	LevelState.Reset();
	var menuBound = ComputeBounds(Menu);
	var bound = ComputeBounds(LevelContainer);
	LevelContainer.transform.localPosition.x += bound.extents.x - bound.center.x;
	LevelContainer.transform.localPosition.y += bound.extents.y - bound.center.y + menuBound.extents.y*2;
	Debug.Log(menuBound);
	
	
}


function ComputeBounds(root:GameObject){
	var renderers = root.GetComponentsInChildren(Renderer);
	var bound:Bounds = Bounds(root.transform.position,Vector3(0,0,0));
	for(var renderer in renderers){
		bound.Encapsulate((renderer as Renderer).bounds);	
	}
	return bound;
	
}
function Update () {

}