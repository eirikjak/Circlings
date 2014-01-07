#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other:Collider2D){

	Debug.Log(other.gameObject.tag);

}

