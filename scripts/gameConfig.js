
window.addEventListener('load', () => {

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 400,
    pixelArt:true,
    // _resolution: window.devicePixelRatio,
    // resolution: 2,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                y: 0
            }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "thegame"
    },
    pixelArt: true,
    scene: [GameScene, EscuelaScene]
}
const game = new Phaser.Game(config)
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