var Map1 = function (scene,x,y,z,width) //largura e altura são fixas, o que muda são só as posições
{	
	
	    var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = BABYLON.Color3.FromInts(204,255,255);
        var mur = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        mur.scaling = new BABYLON.Vector3(300,10,2);
		mur.position.y = 5;
        mur.position.z = -150;
        mur.material = mat;
        mur.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});

		
		var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = BABYLON.Color3.FromInts(204,255,255);
        var mur = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        mur.scaling = new BABYLON.Vector3(300,10,2);
		mur.position.y = 5;
        mur.position.z = 150;
        mur.material = mat;
        mur.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});

		var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = BABYLON.Color3.FromInts(204,255,255);
        var mur = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        mur.scaling = new BABYLON.Vector3(2, 10, 300);
		mur.position.x = -150;
		mur.position.y = 5;
        mur.material = mat;
        mur.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});
	
		var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = BABYLON.Color3.FromInts(204,255,255);
        var mur = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        mur.scaling = new BABYLON.Vector3(2, 10, 280);
		mur.position.x = 150;
		mur.position.y = 5;
		mur.position.z = -10;
        mur.material = mat;
        mur.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});
		
		var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = BABYLON.Color3.FromInts(204,255,255);
        var mur = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        mur.scaling = new BABYLON.Vector3(2, 10, 250);
		mur.position.x = -80;
		mur.position.y = 5;
		mur.position.z = 20;
        mur.material = mat;
        mur.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});
		
		var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = BABYLON.Color3.FromInts(204,255,255);
        var mur = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        mur.scaling = new BABYLON.Vector3(2, 10, 200);
		mur.position.x = 60;
		mur.position.y = 5;
        mur.material = mat;
        mur.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass:0, restitution:0.5, friction:0.1});
		
}
