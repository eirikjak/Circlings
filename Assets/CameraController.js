#pragma strict

public var MinSize:float;
public var MaxSize:float;
public var LeftCorner:Vector2;
private var currentSize:float;
function Start () {
	this.currentSize = this.camera.orthographicSize;
	var rect = this.camera.rect;
	var wDiff = this.LeftCorner.x + this.transform.position.x - rect.width/2;
	Debug.Log(rect);
	
}


function Update () {
	
	var zoomAmount = GetZoomAmount();
	
	if(zoomAmount > 0 && this.currentSize > this.MinSize && this.currentSize < this.MaxSize){
		Zoom(zoomAmount);
		this.currentSize = this.camera.orthographicSize;	
	}	
	
}
function GetZoomAmount(){
	#if UNITY_EDITOR
		return Input.GetAxis("Mouse ScrollWheel");
	#endif
	
	return -10000;

}

function Zoom(amount:float){
	Debug.Log(this.camera.pixelRect);
	this.camera.orthographicSize += amount;
	this.transform.position.x += amount*(this.camera.aspect);
	this.transform.position.y += amount;

}