#pragma strict

public var CirclingPrefab:Circling;
public var Ammunition:int;
public var StartInterval:float;
private var pile:Array;
private var launching:boolean;
private var launchTimer:float;
private var started:boolean;
private var launchedCircling:Circling;
function Start () {
	BuildPile();
}

function Update () {
	//Dont start the timer untill the circle leaves the collider
	if(launching && !this.collider2D.OverlapPoint(launchedCircling.transform.position)){
		launchTimer += Time.deltaTime;
		if(launchTimer >= StartInterval){
			LaunchCirclings();
			launchTimer = 0;
		
		}
	
	}
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



function LaunchCirclings(){
	if(pile.length > 0){
		var circling = pile.Pop() as Circling;
		launchedCircling = circling;
		circling.rigidbody2D.isKinematic = false;
		if(pile.length >= GetPileWidth(this.Ammunition)){
			circling.JumpPower /= 2;
			circling.Jump();
			circling.JumpPower *= 2;
		}
		if(pile.length == 0){
			launching = false;
		}else{
			launching = true;
		
		}
	}
}

function BeginLaunch(){
	if(!started){
		started = true;
		LaunchCirclings();
	}

}
#if UNITY_EDITOR
private var down:boolean;
function OnMouseDown(){
	down = true;
}
function OnMouseUp(){
	if(down){
		BeginLaunch();
	}
	down = false;
	
}
#endif
