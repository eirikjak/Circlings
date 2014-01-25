#pragma strict
public var BoostForce:float=1.0;
public var climbingCirclings:Hashtable; 
function Start () {
	climbingCirclings = Hashtable();
}

function Update () {

}



function OnCollisionStay2D(other:Collision2D){
	if (other.gameObject.tag=="Circling") {
		climbingCirclings[other.gameObject] = other;
		if(other.gameObject.transform.position.x < this.renderer.bounds.max.x)
			other.gameObject.rigidbody2D.AddForce(Vector2(0.5,0.5)*BoostForce/Time.fixedDeltaTime);
		
		
	}
}