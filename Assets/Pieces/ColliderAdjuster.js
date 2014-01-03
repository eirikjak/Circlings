#pragma strict

function Start () {

	var bounds = (this.renderer as SpriteRenderer).bounds;
	(this.collider2D as BoxCollider2D).size = Vector2(bounds.extents.x*2/this.transform.localScale.x,bounds.extents.y*2/this.transform.localScale.y);
}

function Update () {

}