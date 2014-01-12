#pragma strict
public var BoostForce:float=1.0;

function Start () {

}

function Update () {

}

function OnCollisionEnter2D(other:Collision2D) {
	if (other.gameObject.tag=="Circling") {
		if (other.gameObject.transform.position.y >=this.transform.position.y) {
		other.gameObject.rigidbody2D.AddForce(Vector2(BoostForce/Time.fixedDeltaTime,0));
		}
	}
}