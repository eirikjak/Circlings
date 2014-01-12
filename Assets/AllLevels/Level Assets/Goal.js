#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other:Collider2D){
	if (other.gameObject.tag=="Circling") {
		LevelState.CirclingsInGoal+=1;
		LevelState.LiveCirclings--;
	}

}

