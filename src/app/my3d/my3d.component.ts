import { Component, Input } from '@angular/core';
import { HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ParticleHelper, Material, ShadowDepthWrapper, SpotLight, ShadowGenerator, Color3, Texture, CubeTexture, DynamicTexture, StandardMaterial, Scene, Engine, FreeCamera, Vector3, Mesh, HemisphericLight, MeshBuilder, Vector2, IWheelEvent, Axis, PointerEventTypes, Matrix, Quaternion, SceneLoader, AbstractMesh, ParticleSystem } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import { AdvancedDynamicTexture, TextBlock, } from "@babylonjs/gui";
import { FireMaterial } from '@babylonjs/materials';
import { Nullable } from '@babylonjs/core/types'

@Component({

  selector: 'app-my3d',
  templateUrl: './my3d.component.html',
  styleUrls: ['./my3d.component.scss']
})
export class My3dComponent implements AfterViewInit {

  @Input() height: number = 500;
  @Input() width: number = 400;
  @Input() meshName: string = "GreenDragon2.9.glb";
  @Input() camZPos: number = -10;
  @Input() camYPos: number = 5;
  @Input() makeFire: boolean = false;
  @Input() makeRain: boolean = false;



  @ViewChild('myCanvas')
  private myCanvas: ElementRef = {} as ElementRef;

  private engine!: Engine;
  private scene!: Scene;
  /** Canvas 2d context */
  private context!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private camera!: FreeCamera;
  private sphere!: Mesh;
  private ground!: Mesh;
  private light!: HemisphericLight;
  private mesh!: Mesh;
  private flames!: Mesh;

  constructor() { }

  ngAfterViewInit() {
    //this.context = (
    //  this.myCanvas.nativeElement as HTMLCanvasElement
    //).getContext('2d')!;

    //this.draw();
    this.canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
    this.engine = new Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
    // This creates a basic Babylon Scene object (non-mesh)
    this.scene = new Scene(this.engine);
    // This creates and positions a free camera (non-mesh)
    this.camera = new FreeCamera("camera1", new Vector3(0, this.camYPos, this.camZPos), this.scene);
    this.camera.maxZ = 100000;
    this.camera.minZ = -100000;
    // This targets the camera to scene origin
    let vec = new Vector3(0, this.camYPos, 0);
    this.camera.setTarget(Vector3.Zero());
    // This attaches the camera to the canvas
    this.camera.attachControl(this.canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    this.light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
    // Default intensity is 1. Let's dim the light a small amount
    this.light.intensity = 0.7;
    // Our built-in 'sphere' shape. Params: name, options, scene
    //this.sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, this.scene);
    // Move the sphere upward 1/2 its height
    //this.sphere.position.y = 1;
    // Our built-in 'ground' shape. Params: name, options, scene
    this.ground = MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 }, this.scene);
    //this.ground.renderingGroupId = 1;
    const scene: Scene = this.scene;

    var zoomValue = new Vector2(1.5, 2.5);
    var scaleU = 1;
    var scaleV = 1;
    var offsetX = 0;
    var offsetY = 0;
    let Promise = this.loadCharacter(this.meshName);
    let mesh = this.mesh;
    Promise.then(
      function (result) {
        console.log("Loaded mesh!"); mesh = result.mesh; mesh.position.y = 1;
        mesh.position.x = 1;
      },
      function (error) { console.log("Error Loading mesh!"); console.log(JSON.stringify(error)); }
    );


    //let Promise2 = this.loadCharacter("fire2.glb");
    //let flames = this.flames;
    //Promise.then(
    //  function (result) {
    //    console.log("Loaded flames!"); flames = result.mesh; flames.position.y = 1;
    //    flames.position.x = 1;
    //  },
    //  function (error) { console.log("Error Loading flames!"); console.log(JSON.stringify(error)); }
    //);


    //mesh.renderingGroupId = 1;


    //let Promise = this.other();
    //let mesh = this.other;
    //Promise.then(
    //  function (result) {
    //    console.log("Loaded mesh!"); mesh = result.mesh; mesh.position.y = 1;
    //    mesh.position.x = 1;
    //  },
    //  function (error) { console.log("Error Loading mesh!"); console.log(JSON.stringify(error)); }
    //);



    //var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    //
    //var text1 = new TextBlock();
    //text1.text = "Hello world";
    //text1.color = "white";
    //text1.fontSize = 100;
    ////text1.position = new Vector3(10, 0, -50);
    //
    //advancedTexture.addControl(text1);

    // GUI
    //var plane = MeshBuilder.CreatePlane("plane",{width: 1, height: 1}, this.scene);
    //
    //plane.parent = this.mesh;
    //plane.position.y = 2;
    //
    //var advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane);
    //var text1 = new TextBlock();
    //text1.text = "What Am I?";
    //text1.width = 2000;
    //text1.height = 5;    
    //text1.color = "white";
    //text1.fontSize = 2000;
    //text1.shadowColor = "green";
    //
    //advancedTexture.addControl(text1);



    //Set font type
    //r font_type = "Arial";

    //Set width an height for plane
    //var planeWidth = 10;
    //var planeHeight = 3;

    ////Create plane
    //var plane = MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, this.scene);

    ////Set width and height for dynamic texture using same multiplier
    //var DTWidth = planeWidth * 60;
    //var DTHeight = planeHeight * 60;

    ////Set text
    //var text = "Some words to fit";
    //
    ////Create dynamic texture
    //var dynamicTexture = new DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, this.scene);

    ////Check width of text for given font type at any size of font
    //var ctx = dynamicTexture.getContext();
    //var size = 12; //any value will work
    //ctx.font = size + "px " + font_type;
    //var textWidth = ctx.measureText(text).width;
    //
    ////Calculate ratio of text width to size of font used
    //var ratio = textWidth/size;
    //
    //set font to be actually used to write text on dynamic texture
    //var font_size = Math.floor(DTWidth / (ratio * 1)); //size of multiplier (1) can be adjusted, increase for smaller text
    //var font = font_size + "px " + font_type;
    //
    //Draw text
    //dynamicTexture.drawText(text, null, null, font, "#000000", "#ffffff", true);

    ////create material
    //var mat = new StandardMaterial("mat", scene);
    //mat.diffuseTexture = dynamicTexture;
    //
    ////apply material
    //plane.material = mat;

    var skybox = MeshBuilder.CreateBox("skyBox", { size: 10000.0 }, this.scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("assets/textures/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skybox.renderingGroupId = 0;

    if (this.makeRain) {
      ParticleHelper.CreateAsync("rain", scene, false).then((set) => {
        set.start();
      });
    }


    if (this.makeFire) {
      const explosion = Mesh.CreateSphere("explosion", 4, 0.001, this.scene);
      explosion.position = new Vector3(8, 4, 20);
      const explosion2 = Mesh.CreateSphere("explosion", 4, 0.001, this.scene);
      explosion2.position = new Vector3(0, 4, 20);
      const explosion3 = Mesh.CreateSphere("explosion", 4, 0.001, this.scene);
      explosion3.position = new Vector3(-8, 4, 20);
      //fire
      ////emitter for the particle system
      //let gizmo = Mesh.CreateBox("gizmo", 0.001, this.scene);
      //gizmo.position = new Vector3(40, 40, 40);
      //gizmo.parent = emitter;
      //let direction = vertNormal.normalize().scale(1); // move in the direction of the normal


      // Fire!
      let partSystem: ParticleSystem;
      ParticleHelper.CreateAsync("fire", this.scene).then((set) => {
        partSystem = <ParticleSystem>set.systems[0];
        partSystem.emitter = explosion;
        partSystem.start();
      });

      // Fire!
      let partSystem2: ParticleSystem;
      ParticleHelper.CreateAsync("fire", this.scene).then((set) => {
        partSystem2 = <ParticleSystem>set.systems[0];
        partSystem2.emitter = explosion2;
        partSystem2.start();
      });

      // Fire!
      let partSystem3: ParticleSystem;
      ParticleHelper.CreateAsync("fire", this.scene).then((set) => {
        partSystem3 = <ParticleSystem>set.systems[0];
        partSystem3.emitter = explosion3;
        partSystem3.start();
      });
    }

    //// Create fire material
    //var fire = new FireMaterial("fire", this.scene);
    //fire.diffuseTexture = new Texture("assets/textures/fire.png", this.scene);
    //fire.distortionTexture = new Texture("assets/textures/distortion.png", this.scene);
    //fire.opacityTexture = new Texture("assets/textures/candleopacity.png", this.scene);
    //fire.speed = 5.0;
    //
    //var light = new SpotLight("light", new Vector3(2, 2, 2), new Vector3(-1, -2, -1), 3, 1, this.scene);
    //var generator = new ShadowGenerator(1024, light);
    //generator.usePercentageCloserFiltering = true;
    //generator.bias = 0.01;
    //generator.transparencyShadow = true;
    //
    //let abstractMeshes: AbstractMesh[] = [this.mesh, this.ground];
    ////Set width an height for plane
    //var planeWidth = 10;
    //var planeHeight = 3;
    //
    //////Create plane
    //var plane = MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, this.scene);
    //plane.receiveShadows = true;
    //
    //for (var i = 0; i < abstractMeshes.length; i++) {
    //  if (abstractMeshes[i] !== plane) {
    //    let shadowMap = generator.getShadowMap()!;
    //    let renderList = shadowMap.renderList!;
    //    renderList.push(abstractMeshes[i]);
    //  }
    //}
    //
    ////plane = MeshBuilder.CreatePlane("fireplane", { width: 1, height: 1 }, this.scene);
    //plane.position = new Vector3(0, 2.2, 0);
    //plane.scaling.x = 0.1;
    //plane.scaling.y = 0.7;
    //plane.billboardMode = Mesh.BILLBOARDMODE_Y;
    //let material = plane.material!;
    //material = fire;
    //material.shadowDepthWrapper = new ShadowDepthWrapper(material);
    //let shadowMap = generator.getShadowMap()!;
    //let renderList = shadowMap.renderList!;
    //renderList.push(plane);



























    scene.onPrePointerObservable.add(function (pointerInfo, eventState) {
      // console.log(pointerInfo);
      var event = pointerInfo.event as IWheelEvent;
      var delta = 0;
      if (event.wheelDelta) {
        delta = event.wheelDelta;
      }
      else if (event.detail) {
        delta = -event.detail;

      }
      if (delta && scene && scene.activeCamera) {
        var dir = scene?.activeCamera.getDirection(Axis.Z);
        // console.log("dir: ", dir);
        if (delta > 0) {
          scene.activeCamera.position.addInPlace(dir);
          scaleU -= 0.1;
          scaleV -= 0.1;
          offsetX -= 0.1;
          offsetY -= 0.1;
        }
        else {
          scene.activeCamera.position.subtractInPlace(dir);
          scaleU += 0.1;
          scaleV += 0.1;
          offsetX += 0.1;
          offsetY += 0.1;
        }
      }
      //        layer.texture.uScale=scaleU;
      //layer.texture.vScale=scaleV;
      //            layer.texture.vOffset.x=offsetX;
      //layer.texture.vOffset=offsetY;
    }, PointerEventTypes.POINTERWHEEL, false);



    this.engine.runRenderLoop(function () {
      scene.render();
    });


  }






  private async loadCharacter(meshToLoad: string) {
    //collision mesh

    //move origin of box collider to the bottom of the mesh (to match player mesh)
    const outer = MeshBuilder.CreateBox("outer", { width: 2, depth: 1, height: 3 }, this.scene);
    outer.isVisible = false;
    outer.isPickable = false;
    outer.checkCollisions = true;

    outer.bakeTransformIntoVertices(Matrix.Translation(0, 1.5, 0))
    //for collisions
    outer.ellipsoid = new Vector3(1, 1.5, 1);
    outer.ellipsoidOffset = new Vector3(0, 1.5, 0);

    outer.rotationQuaternion = new Quaternion(0, 1, 0, 0); // rotate the player mesh 180 since we want to see the back of the player

    //--IMPORTING MESH--

    //let result = await SceneLoader.ImportMeshAsync(null, "../../assets/models/", "basefemale.glb", this.scene);
    let result = await SceneLoader.ImportMeshAsync(null, "assets/models/", meshToLoad, this.scene);
    const root = result.meshes[0];
    //body is our actual player mesh
    const body = root;
    body.parent = outer;
    body.isPickable = false;
    let Meshes: Mesh[] = body.getChildMeshes();
    Meshes.forEach(m => {
      m.isPickable = false;
    })

    //return the mesh and animations

    return {
      mesh: outer as Mesh,
      animationGroups: result.animationGroups
    }


  }




  @HostListener('window:keydown.enter', ['$event'])
  onResize(event: any) {
    //https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.engine.resize();
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: any) {
    event.preventDefault();
  }
  /**
   * Draws something using the context we obtained earlier on
   */
  //private draw() {
  //  this.context.font = '30px Arial';
  //  this.context.textBaseline = 'middle';
  //  this.context.textAlign = 'center';
  //
  //  const x = (this.myCanvas.nativeElement as HTMLCanvasElement).width / 2;
  //  const y = (this.myCanvas.nativeElement as HTMLCanvasElement).height / 2;
  //  this.context.fillText('@realappie', x, y);
  //}

  open() {
    window.open('https://github.com/realappie', '_blank');
  }


}
