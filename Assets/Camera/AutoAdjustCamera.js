#pragma strict


function Start () {
	var currentSize = this.camera.orthographicSize;
	var rect = this.camera.rect;
	var wDiff = this.transform.position.x - rect.width*currentSize*this.camera.aspect;
	var hDiff = this.transform.position.y - rect.height*currentSize;
	this.transform.position.x -= wDiff;
	this.transform.position.y -= hDiff;
}

function Update () {

}