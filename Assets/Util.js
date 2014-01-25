#pragma strict

 
public static function ComputeBounds(root:GameObject){
	var renderers = root.GetComponentsInChildren(Renderer);
	var bound:Bounds = Bounds(root.transform.position,Vector3(0,0,0));
	for(var renderer in renderers){
		bound.Encapsulate((renderer as Renderer).bounds);	
	}
	return bound;
	
}

class Pair{
	public var First:Object;
	public var Second:Object;
	public function  Pair(obj1:Object, obj2:Object){
		this.First = obj1;
		this.Second = obj2;
	}
}