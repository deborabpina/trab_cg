var Enemy = function(game, scene, x, z, player, direction)
{
	this.x = x;
	this.z = z;
    this.game = game;
    this.scene = scene;
	this.player = player;
	//[top, bottom, right, left]
	this.mvtDirection = direction;

    /* MESH */
    this.box = BABYLON.Mesh.CreateBox("enemy", 10, this.scene);
	this.box.position.x = x;
    this.box.position.y = 2;
	this.box.position.z = z;
    this.body = this.box.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:1, friction:0.1, restitution:0.1});
    var matos = new BABYLON.StandardMaterial("matos", this.scene);
    matos.diffuseColor = BABYLON.Color3.Red();
    this.box.material = matos;
	this.box.isPickable = false;
	this.firstTime = true;
	this.haventSeen = true;
    // The enemy speed
    this.speed = 0.8;

    var _this = this;
    this.scene.registerBeforeRender(function()
    {
        _this.update();
    });

};


Enemy.prototype =
{

    update : function()
    {
        this.chooseDirection();
		this.seenPlayer();
		this.collidedWithPlayer();
		this.move();
    },
	
	move : function()
	{
		
	},

    chooseDirection : function()
    {
    	if (this.haventSeen)
    	{
			//Looking Up
	        if (this.mvtDirection[0] != 0) {
				//Front ray
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(this.box.position.x, this.box.position.y, (150 - this.box.position.z)));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
				this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.newPick, Math.PI/2, 0, this.scene);
				this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
				this.visionLight.intensity = 50;
				//this.visionRange(this.box.position.x - this.dist, this.box.position.x + this.dist, this.box.position.y, this.box.position.z + this.dist, this.box.position.z + this.dist);

	        }
			//Looking Down
	        if (this.mvtDirection[1] != 0) {
				//Front ray
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(this.box.position.x, this.box.position.y, (-150 - this.box.position.z)));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
				this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.newPick, Math.PI/2, 0, this.scene);
				this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
				this.visionLight.intensity = 50;
				//this.visionLight.excludeMeshes = [this.player.box]; PEGAR VERSAO NOVA NO GITHUB!!!!
				//this.visionRange(this.newPick.x - this.dist, this.newPick.x + this.dist, this.newPick.y, this.newPick.z - this.dist, this.newPick.z - this.dist);
			
			}
			//Looking to the Right
	        if (this.mvtDirection[2] != 0) {
				//Front ray
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3((150 - this.box.position.x), this.box.position.y, this.box.position.z));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
				this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.newPick, Math.PI/2, 0, this.scene);
				this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
				this.visionLight.intensity = 50;
				//this.visionRange(this.box.position.x + this.dist, this.box.position.x + this.dist, this.box.position.y, this.box.position.z + this.dist, this.box.position.z - this.dist);

	        }
	        if (this.mvtDirection[3] != 0) {
				//Front ray
				this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3((-150 - this.box.position.x), this.box.position.y, this.box.position.z));
				this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
				this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.newPick, Math.PI/2, 0, this.scene);
				this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
				this.visionLight.intensity = 50;
				//this.visionRange(this.box.position.x - this.dist, this.box.position.x - this.dist, this.box.position.y, this.box.position.z + this.dist, this.box.position.z - this.dist);
	
	        }  
	    }
	     
	    else
	    {
	      	this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.targetPos);
			this.newPick = this.scene.pickWithRay(this.ray1).pickedPoint;
			this.visionLight = new BABYLON.SpotLight("visionLight", new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z),
					this.targetPos, Math.PI/2, 0, this.scene);
			this.visionLight.diffuse = new BABYLON.Color3(1, 0, 0);
			this.visionLight.specular = new BABYLON.Color3(1, 0, 0);
			this.visionLight.intensity = 50;
			//this.visionLight.excludeMeshes = [this.player.box]; PEGAR VERSAO NOVA NO GITHUB!!!!

	    }

	    this.matrix1 = new BABYLON.Matrix.RotationY(Math.PI / 5,7);
		this.P1 = new BABYLON.Vector3.TransformCoordinates(this.newPick, this.matrix1);
		this.matrix2 = new BABYLON.Matrix.RotationY(-Math.PI / 5,7);
		this.P2 = new BABYLON.Vector3.TransformCoordinates(this.newPick, this.matrix2);
				
		this.visionRange(this.P1.x, this.P2.x, 0, this.P1.z, this.P2.z);
    },

    destroy : function()
    {
        this.box.dispose();
    },
	
	visionRange : function(r2_x, r3_x, y, r2_z, r3_z)
	{
		//Angular rays 
		this.ray2 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(r2_x, y, r2_z));
		this.point2 = this.scene.pickWithRay(this.ray2).pickedPoint;
		this.ray3 = new BABYLON.Ray(new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), new BABYLON.Vector3(r3_x, y, r3_z));
		this.point3 = this.scene.pickWithRay(this.ray3).pickedPoint;
		
		if (this.firstTime){
			this.firstTime = false;
			this.lines = BABYLON.Mesh.CreateLines("lines", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point2, 
				new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point3], this.scene);
		    this.lines.Color = new BABYLON.Color3(1, 0, 0);
		}
		else{
			this.eraseVisionRange();
			this.lines = BABYLON.Mesh.CreateLines("lines", [new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point2,
				new BABYLON.Vector3(this.box.position.x, this.box.position.y, this.box.position.z), this.point3], this.scene);
		    this.lines.Color = new BABYLON.Color3(1, 0, 0);
		}
		this.oldPick = this.newPick;
	},
	
	seenPlayer : function()
	{
		if (this.lines.intersectsMesh(this.player.box, false)){
			// inimigo acompanha
			this.haventSeen = false;
			console.log("viu");
			this.targetPos = new BABYLON.Vector3(this.player.box.position.x, this.player.box.position.y, this.player.box.position.z);
			//this.eraseVisionRange();
		}
		else{
			console.log("nao viu");
		}
	},
	
	collidedWithPlayer : function ()
	{
		if ((this.box.intersectsMesh(this.player.box, false))){
			//the game ends when the player touchs the enemy
			this.player.destroy();
			var music = new BABYLON.Sound("Music", "sounds/game_over.wav", this.scene,
			function () {
			// Sound has been downloaded & decoded
			music.play();
			},{ loop: true, autoplay: true }
			);
			window.location = 'gameover.html';
		}
	},
	
	eraseVisionRange: function ()
	{
		this.lines.dispose();
		this.visionLight.dispose();
	}
};
