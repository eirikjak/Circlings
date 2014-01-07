﻿#pragma strict
public var LevelContainer:GameObject;
public var Menu:GameObject;
private var menuHeight:float = 0.1;
function Start () {
	
	var menuBound = ComputeBounds(Menu);
	//Menu.gameObject.transform.position = Vector3(0.1,menuBound.extents.y/2,0);
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