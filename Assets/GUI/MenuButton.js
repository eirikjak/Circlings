#pragma strict
public var Piece:GameObject;
private var draggingPiece:GameObject;
public var Owner:PieceMenuController;
function Start () {

}

function Update () {

}

function Selected(){
	this.renderer.material.color.a = 0.5;
}

function UnSelected(){
	this.renderer.material.color.a = 1.0;
}

function BeginDrag(){
	this.draggingPiece = Instantiate(this.Piece);
	(this.draggingPiece.renderer as SpriteRenderer).sprite = (this.renderer as SpriteRenderer).sprite;
	Selected();

}
function OnDrag(x:float,y:float){
	this.draggingPiece.transform.position.x = x;
	this.draggingPiece.transform.position.y = y;
}

function EndDrag(){

	if(!draggingPiece.renderer.bounds.Intersects(ComputeBounds(Owner.gameObject))){
		Owner.Placed(this.gameObject);
		Destroy(this.gameObject);
	}else{
		Destroy(draggingPiece);
		UnSelected();
		
	}
	
}


function ComputeBounds(root:GameObject){
	var renderers = root.GetComponentsInChildren(Renderer);
	var bound:Bounds = Bounds(root.transform.position,Vector3(1,1,1));
	for(var renderer in renderers){
		bound.Encapsulate((renderer as Renderer).bounds);	
	}
	return bound;
	
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