#pragma strict

public var Background:Sprite;
public var PieceSeparation:float;
public var Pieces:Button[];
private var buttons:Array;

class Button{
	public var Piece:GameObject;
	public var ButtonSprite:Sprite;
	public var Count:int;
}

function Start () {

	this.buttons = Array();
	for(var i = 0; i<this.Pieces.length; i++){
		var button = this.Pieces[i];
		var sprite = button.ButtonSprite;
		
		for(var j= 0; j<button.Count; j++){
			var gObject = GameObject();
			var renderer = gObject.AddComponent(SpriteRenderer);
			var collider = gObject.AddComponent(BoxCollider2D);
			var script = gObject.AddComponent("MenuButton") as MenuButton;
			script.Piece = button.Piece;
			script.Owner = this;
			renderer.sprite = sprite;
			gObject.transform.parent = this.transform;
			gObject.transform.localPosition = Vector3(0,0,0);
			gObject.transform.localPosition.y = gObject.renderer.bounds.extents.y/2;
			gObject.transform.localScale = Vector3(1,1,1);
			gObject.layer = this.gameObject.layer;
			var bounds = renderer.bounds;
			collider.size.x = bounds.extents.x*2;
			collider.size.y = bounds.extents.y*2;
			buttons.push(gObject);
		}
	}
	AlignButtons();
	
	var backgroundObject = GameObject();
	var backgroundRenderer:SpriteRenderer = backgroundObject.AddComponent(SpriteRenderer);
	backgroundRenderer.sprite = this.Background;
	backgroundObject.transform.parent = this.transform;
	backgroundObject.transform.position += backgroundRenderer.bounds.extents;
	backgroundObject.transform.localScale.x = 2;
	backgroundObject.layer = this.gameObject.layer;
	var width = backgroundObject.renderer.bounds.extents.x*2;
	
	
}

function AlignButtons(){
	var nextX = 0.0;
	for(var i=0; i<this.buttons.length; i++){
		var button:GameObject = this.buttons[i];
		if(i > 0){
			var lastButton:GameObject = this.buttons[i-1];
			var left = lastButton.transform.localPosition.x + lastButton.renderer.bounds.extents.x;
			button.transform.localPosition.x = left + this.PieceSeparation + button.renderer.bounds.extents.x;
		}else{
			button.transform.localPosition.x = button.renderer.bounds.extents.x;
		}	
	}
}

function Placed(piece:GameObject){
	buttons.Remove(piece);
	AlignButtons();
	
}
function Update () {

}