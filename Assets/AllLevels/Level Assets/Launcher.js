#pragma strict

public var CirclingPrefab:Circling;
public var Ammunition:int;

private var pile:Array;
function Start () {
	BuildPile();
}

function BuildPile(){

	 
	pile = new Array();
	var radius = this.CirclingPrefab.DefaultSprite.bounds.extents.x;
	
	var pileWidth = GetPileWidth(this.Ammunition);
	var height = pileWidth;
	
	for(var level = 0; level <= height; level++){
		var remaining = Ammunition - pile.length;
		for(var i = 0; i< Mathf.Min(pileWidth - level,remaining); i++){
			var circling = Instantiate(CirclingPrefab, this.transform.position + Vector3(2*radius*i + level*radius,2*radius*level - level*radius/4,0),this.transform.rotation);
			circling.transform.position.y += radius;
			circling.transform.position.x += radius;
			circling.transform.parent = this.transform.parent;
			circling.rigidbody2D.isKinematic = true;
			pile.push(circling);
		
		}
	}
	

	var collider = this.gameObject.AddComponent(BoxCollider2D) as BoxCollider2D;

	collider.size = Vector2(2*radius*pileWidth,(pile[pile.length -1] as Circling).transform.position.y - radius);
	collider.center = collider.size/2;

}

function GetPileWidth(count:int){
	//With formula derived from triangle numbers. N = n(n+1)/2
	return Mathf.Ceil((-1 + Mathf.Sqrt(1 + 8*count))/2);
}


function Update () {

}

function LaunchCircling(){
	
	var circling = pile.Pop() as Circling;
	circling.rigidbody2D.isKinematic = false;
	if(pile.length >= GetPileWidth(this.Ammunition)){
		circling.JumpPower /= 2;
		circling.Jump();
		circling.JumpPower *= 2;
	}	
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
