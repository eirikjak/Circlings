#pragma strict


private var readyForJump:boolean;
private var radius:float;
public var JumpPower:float = 1.8;
public var Speed:float = 70;
private var isTouchingCircling:boolean;
function Start () {
	
	radius = (this.collider2D as CircleCollider2D).radius*this.transform.localScale.x;
}

function Update () {

	
}


function FixedUpdate(){
	rigidbody2D.AddForce(Vector2(Speed*Time.deltaTime,0));
	if(ShouldJump()){
		Jump();

	}
}

function IsNextToWall(){
	var ray = Physics2D.Raycast(Vector2(this.transform.localPosition.x + radius, this.transform.localPosition.y),Vector2.right,0.01,~(1<<this.gameObject.layer));
	return ray.collider != null;
}
function ShouldJump(){
	
	return IsNextToWall() && (IsOnGround() || this.isTouchingCircling);
}

function OnCollisionEnter2D(col:Collision2D){
	

	if(col.gameObject.layer == this.gameObject.layer && this.transform.position.y > col.gameObject.transform.position.y){
		this.isTouchingCircling = true;
		
	}
	
}

function OnCollisionExit2D(col:Collision2D){
	if(col.gameObject.layer == this.gameObject.layer)
		this.isTouchingCircling = false;
}



function IsOnGround(){
	
	var ray = Physics2D.Raycast(Vector2(this.transform.localPosition.x, this.transform.localPosition.y - radius),-Vector2.up,0.1,~(1<<this.gameObject.layer));
	
	return  ray.collider != null;
	
}

function Jump(){
	Debug.Log("Jump");
	this.rigidbody2D.velocity.y = 0;
	this.rigidbody2D.AddForce(Vector2(0.0,JumpPower/Time.deltaTime));
		
	
	

}