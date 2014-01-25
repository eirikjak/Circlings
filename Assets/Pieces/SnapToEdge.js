#pragma strict

class SnapToEdge extends MonoBehaviour implements DragInputListener{

	public var Distance:float = 0.1;
	private var origionalLayer:int;
	function Start () {
		var input = this.gameObject.GetComponent(DragInput);
		if(!input)
			input = this.gameObject.AddComponent(DragInput);
		
		input.AddDragListener(this);
		this.origionalLayer = this.gameObject.layer;
	}

	function Update () {
		
	}
	function OnDestroy(){

		var input = this.gameObject.GetComponent(DragInput);
		input.RemoveDragListener(this);
	
	}

	function BeginDrag(){
	}
	function OnDrag(x:float,y:float){
		
		this.transform.localPosition.x = x;
		this.transform.localPosition.y = y;
		this.gameObject.layer = LayerMask.NameToLayer("Ignore Raycast");
		var bounds:Bounds = this.renderer.bounds;
		for(var i in [-1,1])
			for(var j in [-1,1]){
			var pos = this.transform.position;
			var corner = pos - Vector2.Scale(bounds.extents,Vector2(i,j));
			var horizontalRayOut = Physics2D.Raycast(corner,-Vector2.right*i,Distance, ~((1 << this.gameObject.layer) | 1 << LayerMask.NameToLayer("GUI")));
			var horizontalRayIn = Physics2D.Raycast(corner,Vector2.right*i,Distance, ~((1 << this.gameObject.layer) | 1 << LayerMask.NameToLayer("GUI")));
			var verticalRay = Physics2D.Raycast(corner,-Vector2.up*j,Distance, ~((1 << this.gameObject.layer) | 1 << LayerMask.NameToLayer("GUI")));
			//Debug
			Debug.DrawRay(this.transform.position - Vector3.Scale(bounds.extents,Vector3(i,j,0)),-Vector2.right*i*Distance,!horizontalRayOut.collider ? Color.black: Color.red);
			Debug.DrawRay(this.transform.position - Vector3.Scale(bounds.extents,Vector3(i,j,0)),Vector2.right*i*Distance,!horizontalRayIn.collider ? Color.black: Color.red);
			Debug.DrawRay(this.transform.position - Vector3.Scale(bounds.extents,Vector3(i,j,0)),-Vector2.up*j*Distance, !verticalRay.collider ? Color.black: Color.red);
			
			if(horizontalRayOut.collider){
				this.transform.position.x -= corner.x - horizontalRayOut.point.x;
			}else if(horizontalRayIn.collider){
				this.transform.position.x -= corner.x - horizontalRayIn.point.x;
			}
			if(verticalRay.collider){
				
				this.transform.position.y -= corner.y - verticalRay.point.y;
			
			}
		}
		
		this.gameObject.layer = this.origionalLayer;
		
	}
	function EndDrag(){
	}



}