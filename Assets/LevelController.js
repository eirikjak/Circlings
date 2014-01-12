#pragma strict

public var MinimumGoal:int = 0;
public var LevelContainer:GameObject;
public var Menu:GameObject;
private var menuHeight:float = 0.1;
function Start () {
	var menuBound = Util.ComputeBounds(Menu);
	var bound = Util.ComputeBounds(LevelContainer);
	LevelContainer.transform.localPosition.x += bound.extents.x - bound.center.x;
	LevelContainer.transform.localPosition.y += bound.extents.y - bound.center.y + menuBound.extents.y*2;
	
	
	
}



function Update () {
	if (LevelState.LiveCirclings==0) {
		if (LevelState.CirclingsInGoal>= this.MinimumGoal) {
			Debug.Log("WINNERRRRRRRRRRRRRRR");
			}
		else {
			Debug.Log("FAILED");
		}
	}
}