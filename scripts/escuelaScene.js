class EscuelaScene extends Phaser.Scene {
    constructor() {

        super('EscuelaScene')
    }

preload() {
        console.log (this.game)
        this.cursors
        this.cameras.main.setBackgroundColor(0x00000)
        //this.load.image('miimagen2', '../assets/sprites/escritorio3.jpg')
        this.load.image('desk_pic', '../assets/sprites/Tilemap/tiles_desk.png')
        this.load.tilemapTiledJSON('desk', '../assets/sprites/Tilemap/mapaEscritorio.json')
       
        
} //end preload

create() {
        /////////////////////////////////
        ////


 /////////////////////////////////////
        //tilemap

       const desk = this.make.tilemap({
            key: 'desk'
        })

        const mesaset = desk.addTilesetImage('desk_json', 'desk_pic')
        const mesa = desk.createStaticLayer('capa1', mesaset, 0, 0)
        const planta = desk.createStaticLayer('capa2', mesaset, 0, 0)
        const lapices = desk.createStaticLayer('capa3', mesaset, 0, 0)
        
      

        ////// aqui le digo que esta capa tubos 2 es "colisionable"
      //  map.setCollisionBetween(1, 999, true, aboveLayer);

     
       //this.cameras.main.Speed(100,100)

    



     /////////////////////
    /// azul
    var escritorio
   
    escritorio = this.physics.add.staticImage(400, 200, 'miimagen2');
    escritorio.setScale(0.5)
   
     
 } //end create

///////////////////////////////////////////////////////////////////////////////////////

 
    update(time, delta) { // tiempo desde que empezo el programa // delta desde el ultimo last frame cicle?



      

    } //end update


} //end gameScene