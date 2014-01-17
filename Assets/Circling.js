#pragma strict


private var readyForJump:boolean;
private var radius:float;
public var JumpPower:float = 1.8;
public var ReJumpDistance:float = 0.1;
public var Speed:float = 70;
public var MaxSpeed:float =1.5;
public var DefaultSprite:Sprite;
public var ScaredSprite:Sprite;
public var AngrySprite:Sprite;
private var spriteRenderer:SpriteRenderer;
private var isTouchingCircling:boolean;

private var jumpPosition:Vector2;
private var stuck:boolean;

public var AngryTimer:float;
private var remainingAngryTime:float;

public var JumpTimer:float;
private var remainingJumpCooldown:float;

private var positionCheckIntervall:float = 0.1;
private var lastPositionCheck:Vector2;
private var falling:boolean;
private var collidingCirclings:Hashtable;
private var collidingStatic:Hashtable;

class Pair{
	public var First:Object;
	public var Second:Object;
	public function  Pair(obj1:Object, obj2:Object){
		this.First = obj1;
		this.Second = obj2;
	}
}
function Start () {
	jumpPosition = Vector2(-1000,-1000);
	lastPositionCheck = Vector2(-1000,-1000);
	this.spriteRenderer = this.renderer as SpriteRenderer;
	var bounds = this.renderer.bounds;
	(this.collider2D as CircleCollider2D).radius = bounds.extents.x;
	radius = bounds.extents.x;
	collidingCirclings = Hashtable();
	collidingStatic = Hashtable();
	spriteRenderer.sprite = this.DefaultSprite;
	
}

function CheckPositionStuck(){
	

}

function Update () {

	if(remainingAngryTime > 0){
		remainingAngryTime -= Time.deltaTime;
		if(remainingAngryTime <= 0){
			spriteRenderer.sprite = this.DefaultSprite;
			remainingAngryTime = 0;
		}	
	}
	
	if(remainingJumpCooldown > 0){
		remainingJumpCooldown -= Time.deltaTime;
		if(remainingJumpCooldown <= 0){
			remainingJumpCooldown = 0;
		}
	}
	
	if(this.rigidbody2D.velocity.y <= -2){
		if(!falling)
			spriteRenderer.sprite = this.ScaredSprite;
		falling = true;
	}else{
		if(falling)
			spriteRenderer.sprite = this.DefaultSprite;
		falling = false;
	}
}



function FixedUpdate(){
	if(!stuck){
		if (this.rigidbody2D.velocity.x < this.MaxSpeed) {
			rigidbody2D.AddForce(Vector2(Speed*Time.deltaTime,0));
	//		this.rigidbody2D.velocity.x = Mathf.Clamp(this.rigidbody2D.velocity.x,0,this.MaxSpeed);
		}
		if(ShouldJump()){
			Jump();
		}else{
	
			if(IsStuck()){
				LevelState.LiveCirclings--;
				this.gameObject.layer = LayerMask.NameToLayer("Static");
				this.gameObject.rigidbody2D.isKinematic = true;
				stuck = true;
			}
		}
	}
	
}

function IsInCorner(){
	
	return IsNextToWall() && (IsOnGround() || IsOnTopOfCircling());

}

function ShouldJump(){
	
	return IsInCorner() && (Vector2.Distance(this.jumpPosition,this.transform.position) > this.ReJumpDistance);
}



function IsStuck(){

	return IsInCorner() && (Vector2.Distance(this.jumpPosition,this.transform.position) <= this.ReJumpDistance) || this.transform.position.y < -1;
}




function OnCollisionEnter2D(col:Collision2D){

	if(col.gameObject.layer == LayerMask.NameToLayer("Circling")){
		collidingCirclings[col.gameObject] = Pair(col, this.transform.position);
		
	}
	else if(col.gameObject.layer == LayerMask.NameToLayer("Static") && col.gameObject.tag != "NoJump"){
		collidingStatic[col.gameObject] = Pair(col, this.transform.position);
		Debug.Log("hello");
		
	}
	
}

function OnCollisionExit2D(col:Collision2D){
	if(col.gameObject.layer == LayerMask.NameToLayer("Circling")){
		if(CirclingOnTop() && col.gameObject.rigidbody2D.velocity.y > 0){
			spriteRenderer.sprite = this.AngrySprite;
			remainingAngryTime = this.AngryTimer;
		}
		collidingCirclings.Remove(col.gameObject);
		
	}else if(col.gameObject.layer == LayerMask.NameToLayer("Static") && col.gameObject.tag != "NoJump"){
		
		collidingStatic.Remove(col.gameObject);
	}
	
}

function CirclingOnTop(){
		for(var pair:Pair  in collidingCirclings.Values){
			var col:Collision2D = pair.First as Collision2D;
			var oldPos:Vector3 = pair.Second;
			var diff:Vector3 = this.transform.position - oldPos;
			for(var contact:ContactPoint2D in col.contacts){
				var point = contact.point + diff;
				if(point.y > this.transform.position.y)
					return true;
			}	
	}
	return false;
}

function IsOnTopOfCircling(){
	for(var pair:Pair  in collidingCirclings.Values){
		var col:Collision2D = pair.First as Collision2D;
		var oldPos:Vector3 = pair.Second;
		var diff:Vector3 = this.transform.position - oldPos;
		for(var contact:ContactPoint2D in col.contacts){
			var point = contact.point + diff;
			if(point.y < this.transform.position.y)
				return true;
		}	
	}
	return false;
}

function IsNextToWall(){
	for(var pair:Pair in collidingStatic.Values){
		var col:Collision2D = pair.First as Collision2D;
		var oldPos:Vector3 = pair.Second;
		var diff:Vector3 = this.transform.position - oldPos;
		for(var contact:ContactPoint2D in col.contacts){
			var point = contact.point + diff;
			
			if(point.x > this.transform.position.x && point.y > this.transform.position.y - radius*0.75){
				Debug.Log("Wall");
				return true;
				
			}
		}	
		
	}
	return false;

}


function IsOnGround(){

	
	for(var pair:Pair in collidingStatic.Values){
		var col:Collision2D = pair.First as Collision2D;
		var oldPos:Vector3 = pair.Second;
		var diff:Vector3 = this.transform.position - oldPos;
		for(var contact:ContactPoint2D in col.contacts){
			var point = contact.point + diff;
			if(point.y + radius*0.5 <= this.transform.position.y){
				Debug.Log("Ground");
				return true;
				}
		}	
		
	}
	return false;	
}

function Jump(){
	if(remainingJumpCooldown == 0){
		Debug.Log("Jump");
		this.jumpPosition = this.transform.position;
		this.rigidbody2D.velocity.y = 0;
		this.rigidbody2D.velocity.x = 0;
		this.rigidbody2D.AddForce(Vector2(0.0,JumpPower/Time.fixedDeltaTime));
		this.rigidbody2D.angularVelocity = 0;
		remainingJumpCooldown = this.JumpTimer;
	}
		

}