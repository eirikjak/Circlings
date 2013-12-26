#pragma strict

public var CirclingPrefab:Circling;
function Start () {

}

function Update () {

}

function LaunchCircling(){
	var circling = Instantiate(CirclingPrefab, this.transform.position,this.transform.rotation);

}

#if UNITY_EDITOR
private var down:boolean;
function OnMouseDown(){
	down = true;
}
function OnMouseUp(){
	if(down){
		LaunchCircling();
	}
	down = false;
	
}
#endif
