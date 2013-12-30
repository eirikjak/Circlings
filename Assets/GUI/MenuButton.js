#pragma strict
public var Piece:GameObject;
private var draggingPiece:GameObject;
public var Owner:PieceMenuController;
function Start () {

}

function Update () {

}


function BeginDrag(){
	Debug.Log("Begin");
	this.draggingPiece = Instantiate(this.Piece);
	this.renderer.material.color.a = 0.5;

}
function OnDrag(x:float,y:float){
	Debug.Log("x:" + x + " y:" + y);
	this.draggingPiece.transform.position.x = x;
	this.draggingPiece.transform.position.y = y;
}

function EndDrag(){
	Debug.Log("End");
	Owner.Placed(this.gameObject);
	Destroy(this.gameObject);
}

#if UNITY_EDITOR
function OnMouseDown(){

	BeginDrag();
}
function OnMouseDrag(){
	var pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	OnDrag(pos.x,pos.y);

}
function OnMouseUp(){
	EndDrag();

}
#endif