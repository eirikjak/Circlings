#pragma strict


interface DragInputListener{
	function BeginDrag();
	function OnDrag(x:float,y:float);
	function EndDrag();

}
class DragInput extends MonoBehaviour{
	
	private var listeners:Array;
	private var dragging:boolean;
	
	function Awake(){
		this.listeners = new Array();
	
	}
	
	function Start(){
		
		
		
	}
	public function AddDragListener(listener:DragInputListener){
		this.listeners.push(listener);
		if(dragging)
			listener.BeginDrag();
	}
	
	public function RemoveDragListener(listener:DragInputListener){
		this.listeners.Remove(listener);
	}
	
	function OnDestroy(){
		if(dragging){
			for(var listener:DragInputListener in this.listeners)
				listener.EndDrag();
		}
	}
	
	#if UNITY_EDITOR
	function OnMouseDown(){
		dragging = true;
		for(var listener:DragInputListener in this.listeners)
			listener.BeginDrag();
	}
	function OnMouseDrag(){
		
		var pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		for(var listener:DragInputListener in this.listeners)
			listener.OnDrag(pos.x,pos.y);

	}
	function OnMouseUp(){
		dragging = false;
		for(var listener:DragInputListener in this.listeners)
			listener.EndDrag();

	}
	#endif

}

