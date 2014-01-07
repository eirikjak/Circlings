#pragma strict

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