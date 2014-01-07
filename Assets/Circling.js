#pragma strict


private var readyForJump:boolean;
private var radius:float;
public var JumpPower:float = 1.8;
public var ReJumpDistance:float = 0.1;
public var Speed:float = 70;
public var MaxSpeed:float =1.5;
public var DefaultSprite:Sprite;
public var AngrySprite:Sprite;
private var spriteRenderer:SpriteRenderer;
private var isTouchingCircling:boolean;

private var jumpPosition:Vector2;
private var stuck:boolean;

public var AngryTimer:float;
private var remainingAngryTime:float;

function Start () {
	this.jumpPosition = Vector2(-1000,-1000);
	this.spriteRenderer = this.renderer as SpriteRenderer;
	var bounds = this.renderer.bounds;
	(this.collider2D as CircleCollider2D).radius = bounds.extents.x;
	radius = bounds.extents.x;
	Debug.Log("radius:" + radius);
	spriteRenderer.sprite = this.DefaultSprite;
	
}

function Update () {

	if(remainingAngryTime > 0){
		remainingAngryTime -= Time.deltaTime;
		if(remainingAngryTime <= 0){
			spriteRenderer.sprite = this.DefaultSprite;
			remainingAngryTime = 0;
		}	
	}
}



function FixedUpdate(){
	if(!stuck){
		//if(!ShouldJump() && IsOnGround()){
			rigidbody2D.AddForce(Vector2(Speed*Time.deltaTime,0));
		//}
		
		this.rigidbody2D.velocity.x = Mathf.Clamp(this.rigidbody2D.velocity.x,0,this.MaxSpeed);
		if(ShouldJump()){
			Jump();
		}else{
			if(IsStuck()){
				Debug.Log("stuck");
				//Destroy(this.rigidbody2D);
				this.gameObject.layer = LayerMask.NameToLayer("Static");
				this.gameObject.rigidbody2D.isKinematic = true;
				stuck = true;
			}
		}
	}
	
}

function IsInCorner(){
	return IsNextToWall() && IsOnGround();

}

function IsStuck(){
	return IsInCorner() && (Vector2.Distance(this.jumpPosition,this.transform.position) <= this.ReJumpDistance);
}
function IsNextToWall(){
	var ray = Physics2D.Raycast(Vector2(this.transform.localPosition.x + radius, this.transform.localPosition.y),Vector2.right,0.01,~(1<<this.gameObject.layer));
	
	return ray.collider != null && ray.collider.gameObject.layer == LayerMask.NameToLayer("Static");;
}

function ShouldJump(){
	
	return IsInCorner() && (Vector2.Distance(this.jumpPosition,this.transform.position) > this.ReJumpDistance);
}


function OnCollisionEnter2D(col:Collision2D){

	if(col.gameObject.layer == LayerMask.NameToLayer("Circling")){
		Debug.Log("hello:" + stuck);
		if(this.transform.position.y + this.radius < col.gameObject.transform.position.y  && col.gameObject.rigidbody2D.velocity.y > 0){
			spriteRenderer.sprite = this.AngrySprite;
			remainingAngryTime = this.AngryTimer;
			
		}
	}
	
}


function OnCollisionExit2D(col:Collision2D){
	
}



function IsOnGround(){
	if(this.rigidbody2D.velocity.y > 0)
		return false;
	var ray = Physics2D.Raycast(Vector2(this.transform.localPosition.x, this.transform.localPosition.y - radius),-Vector2.up,0.01,~(1<<this.gameObject.layer));
	
	return  ray.collider != null && ray.collider.gameObject.layer == LayerMask.NameToLayer("Static");
	
}

function Jump(){
	//Debug.Log(Vector2.Distance(this.jumpPosition,this.transform.position));
		Debug.Log("Jump");
		this.jumpPosition = this.transform.position;
		this.rigidbody2D.velocity.y = 0;
		this.rigidbody2D.velocity.x = 0;
		this.rigidbody2D.AddForce(Vector2(0.0,JumpPower/Time.deltaTime));
		this.rigidbody2D.angularVelocity = 0;
		

}