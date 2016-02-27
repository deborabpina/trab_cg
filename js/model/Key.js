var Key = function(game, scene, player, score, x, z)
{
	this.player   = player;
  this.game     = game;
  this.scene    = scene;
	this.score    = score;
	this.collided = false;

    /* MESH */
	this.sphere            = BABYLON.Mesh.CreateSphere("key", 10.0, 6.0, scene);
	this.sphere.position.y = 8;
	this.sphere.position.z = z;
  var matos              = new BABYLON.StandardMaterial("matos", this.scene);
  matos.diffuseColor     = BABYLON.Color3.Yellow();
  this.sphere.material   = matos;
	this.sphere.isPickable = false;
	this.sphere.setPhysicsState({impostor:BABYLON.PhysicsEngine.SphereImpostor, move:true, mass:1, friction:0.5, restitution:0.5});

  var _this = this;
  this.scene.registerBeforeRender(function()
  {
      _this.collision();
  });
};


Key.prototype =
{

    update : function()
    {
        this.move();
    },

    destroy : function()
    {
		this.sphere.dispose();
    },

	collision : function()
	{
		if ((this.sphere.intersectsMesh(this.player.box, false)) && !this.collided)
		{
			this.collided     = true;
			this.score.count += 1;
			this.destroy();
		}
	}
};
