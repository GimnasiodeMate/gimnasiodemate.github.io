
window.addEventListener('load', () => {

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 400,
     pixelArt:true,
     // _resolution: window.devicePixelRatio,
      resolution: 2,
      roundPixels: true,
    backgroundColor: 0x000000,

    physics: {
        default: 'arcade',
        arcade: {
                debug: false,
                gravity: { y: 0}
                },
        matter: { 
                debug: false,
                gravity: { y: 0.5 } }
    },
    scale: {
        parent: "thegame",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
        
    },
    pixelArt: true,
    scene: [GameScene, AterrizaScene, RescateScene]
}


const game = new Phaser.Game(config)
game.scale.gameSize.width = window.innerWidth;
game.scale.gameSize.height = window.innerHeight+100;

console.log(game.scale);
    //game(config);
}) //end load listener




class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    preload() {

    } //end preload

    create() {

    } //end create

    update() {

    } //end update
} //end title scene

class WinScene extends Phaser.Scene {
    constructor() {
        super('winScene')
    }

    preload() {

    } //end preload

    create() {

    } //end create

    update() {

    } //end update
} //end title scene

class LoseScene extends Phaser.Scene {
    constructor() {
        super('loseScene')
    }

    preload() {

    } //end preload

    create() {

    } //end create

    update() {

    } //end update
} //end title scene
