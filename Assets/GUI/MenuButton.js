#pragma strict
class MenuButton extends MonoBehaviour implements DragInputListener{
public var Piece:GameObject;
private var draggingPiece:GameObject;
public var Owner:PieceMenuController;
function Start () {
	
	var input:DragInput = this.gameObject.AddComponent(DragInput);
	input.AddDragListener(this);
	
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
	var snap = this.draggingPiece.GetComponent(SnapToEdge);
	this.gameObject.GetComponent(DragInput).AddDragListener(snap as DragInputListener);

	this.draggingPiece.transform.position = this.transform.position;
	(this.draggingPiece.renderer as SpriteRenderer).sprite = (this.renderer as SpriteRenderer).sprite;
	Selected();

}
function OnDrag(x:float,y:float){	

}

function EndDrag(){
	this.gameObject.GetComponent(DragInput).RemoveDragListener(this.draggingPiece.GetComponent(SnapToEdge) as DragInputListener);
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
	
}