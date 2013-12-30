#pragma strict
public var LevelContainer:GameObject;
public var Menu:GameObject;
private var menuHeight:float = 0.6;
function Start () {
	var bound = ComputeBounds(LevelContainer);
	LevelContainer.transform.localPosition.x += bound.extents.x + -menuHeight;
	LevelContainer.transform.localPosition.y += bound.extents.y + menuHeight;
	var menuBound = ComputeBounds(Menu);
	Menu.gameObject.transform.position = Vector3(0,menuBound.extents.y/2,0);
	
	
}


function ComputeBounds(root:GameObject){
	var renderers = root.GetComponentsInChildren(Renderer);
	var bound:Bounds = Bounds(root.transform.position,Vector3(1,1,1));
	for(var renderer in renderers){
		bound.Encapsulate((renderer as Renderer).bounds);	
	}
	return bound;
	
}
function Update () {

}