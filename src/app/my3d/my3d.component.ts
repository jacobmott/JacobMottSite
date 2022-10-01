import { Component} from '@angular/core';
import {HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'app-my3d',
  templateUrl: './my3d.component.html',
  styleUrls: ['./my3d.component.scss']
})
export class My3dComponent implements  AfterViewInit {


  @ViewChild('myCanvas')
  private myCanvas: ElementRef = {} as ElementRef;

  private engine!: BABYLON.Engine;
  private scene!: BABYLON.Scene;
  /** Canvas 2d context */
  private context!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private camera!: BABYLON.FreeCamera;
  private sphere!: BABYLON.Mesh;
  private ground!: BABYLON.Mesh;
  private light!: BABYLON.HemisphericLight
  ;
  constructor() {}

  ngAfterViewInit() {
    //this.context = (
    //  this.myCanvas.nativeElement as HTMLCanvasElement
    //).getContext('2d')!;

    //this.draw();
    this.canvas =  this.myCanvas.nativeElement as HTMLCanvasElement;
    this.engine  = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true});
    // This creates a basic Babylon Scene object (non-mesh)
    this.scene = new BABYLON.Scene(this.engine);
    // This creates and positions a free camera (non-mesh)
    this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this.scene);
    this.camera.minZ = 0.1;
    // This targets the camera to scene origin
    this.camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    this.camera.attachControl( this.canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    this.light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
    // Default intensity is 1. Let's dim the light a small amount
    this.light.intensity = 0.7;
    // Our built-in 'sphere' shape. Params: name, options, scene
    this.sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, this.scene);
    // Move the sphere upward 1/2 its height
    this.sphere.position.y = 1;
    // Our built-in 'ground' shape. Params: name, options, scene
    this.ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, this.scene);

    const scene:BABYLON.Scene = this.scene;

    var zoomValue = new BABYLON.Vector2(1.5,2.5);
    var scaleU=1;
    var scaleV=1;
    var offsetX=0;
    var offsetY=0;
    scene.onPrePointerObservable.add( function(pointerInfo, eventState) {
      // console.log(pointerInfo);
      var event = pointerInfo.event as BABYLON.IWheelEvent;
      var delta = 0;
      if (event.wheelDelta) {
          delta = event.wheelDelta;
      }
      else if (event.detail) {
          delta = -event.detail;

      }
      if (delta && scene && scene.activeCamera) {
          var dir = scene?.activeCamera.getDirection(BABYLON.Axis.Z);
          // console.log("dir: ", dir);
          if (delta>0)
           {
              scene.activeCamera.position.addInPlace(dir);
              scaleU-=0.1;
              scaleV-=0.1;
              offsetX-=0.1;
              offsetY-=0.1;
           }
          else
          {
              scene.activeCamera.position.subtractInPlace(dir);
              scaleU+=0.1;
              scaleV+=0.1;
               offsetX+=0.1;
              offsetY+=0.1;
          }
      }
  //        layer.texture.uScale=scaleU;
  //layer.texture.vScale=scaleV;
  //            layer.texture.vOffset.x=offsetX;
  //layer.texture.vOffset=offsetY;
  }, BABYLON.PointerEventTypes.POINTERWHEEL, false);



    this.engine.runRenderLoop(function(){
      scene.render();
    });


  }

  @HostListener('window:keydown.enter', ['$event'])
  onResize(event: any) {
    this.engine.resize();
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: any) {
    event.preventDefault();
    console.log('Hello World');
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
