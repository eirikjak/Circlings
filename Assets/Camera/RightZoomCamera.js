#pragma strict

public var MinSize:float;
public var MaxSize:float;
public var LevelContainer:GameObject;
private var currentSize:float;
private var levelBounds:Bounds;
private var levelBottom:float;
private var levelLeft:float;
function Start () {

	var currentSize = this.camera.orthographicSize;
	var rect = this.camera.rect;
	var wDiff = this.transform.position.x - rect.width*currentSize*this.camera.aspect;
	var hDiff = this.transform.position.y - rect.height*currentSize;
	this.transform.position.x -= wDiff;
	this.transform.position.y -= hDiff;

	this.currentSize = this.camera.orthographicSize;
	this.levelBounds = ComputeBounds(LevelContainer);
	levelBottom = this.camera.WorldToScreenPoint(Vector3(0,this.levelBounds.center.y - this.levelBounds.extents.y,0)).y;

	levelLeft = this.camera.WorldToScreenPoint(Vector3(this.levelBounds.center.x - this.levelBounds.extents.x,0,0)).x;

	
}


function Update () {

	var zoomAmount = GetZoomAmount();
	if(zoomAmount !=0 && this.currentSize + zoomAmount > this.MinSize  && this.currentSize + zoomAmount < this.MaxSize){
		Zoom(zoomAmount);
		this.currentSize = this.camera.orthographicSize;	
		if(this.currentSize > this.MaxSize)
			this.currentSize = MaxSize;
		
	}
	
	var newLevelBottom = this.camera.WorldToScreenPoint(Vector3(0,this.levelBounds.center.y - this.levelBounds.extents.y,0)).y;
	var newLevelLeft = this.camera.WorldToScreenPoint(Vector3(this.levelBounds.center.x - this.levelBounds.extents.x,0,0)).x;
	var screenHDiff = levelBottom - newLevelBottom;
	var screenWDiff = levelLeft - newLevelLeft;

	this.transform.position.y -= (this.camera.orthographicSize*2)*(screenHDiff/Screen.height);
	this.transform.position.x -= (this.camera.orthographicSize*2*this.camera.aspect)*(screenWDiff/Screen.width);
	


	
}
function GetZoomAmount(){
	#if UNITY_EDITOR
		if(Input.GetKeyDown(KeyCode.Z)){
			return -0.1;
		}
		else if(Input.GetKeyDown(KeyCode.X)){
			return 0.1;
		}
	return 0;	
	#endif
	

}

function ComputeBounds(root:GameObject){
	var renderers = root.GetComponentsInChildren(Renderer);
	var bound:Bounds = Bounds(root.transform.position,Vector3(0,0,0));
	for(var renderer in renderers){
		bound.Encapsulate((renderer as Renderer).bounds);	
	}
	return bound;
	
}

function Zoom(amount:float){
	

	//this.transform.position.y += amount;
	this.camera.orthographicSize += amount;
	


	
	

}