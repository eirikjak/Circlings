#pragma strict
public static class LevelState{
	//The number of circlings that has reached the goal
	public static var CirclingsInGoal:int;
	//The number of circlings that are active or waiting for launch
	public static var LiveCirclings:int;
	//The number of coins collected
	public static var CollectedCoins:int;
	
	public static function Reset(){
		CirclingsInGoal = 0;
		LiveCirclings = 0;
		CollectedCoins = 0;
	}

}