PIXI.utils.sayHello("Hi! I'm spielersun");

const SlotsApp = new PIXI.Application();

const slot_count = 3
const image_types = 4
const text_types = 4
const messages = ["WIN", "LOST", "TRY AGAIN", "SURPRISE"]

let nessage = ""
let slot
let slot_position_x = 0

const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    transparent: true,
    resolution: 1
});

SlotsApp.renderer = renderer
document.body.appendChild(SlotsApp.view);

const stage = new PIXI.Container();

PIXI.loader
    .add("card_0", "images/blue_0_large.png")
    .add("card_1", "images/green_1_large.png")
    .add("card_2", "images/red_2_large.png")
    .add("card_3", "images/yellow_3_large.png")
    .load(setup);

function setup(){
    for (let i = 1; i < slot_count+1; i++) {
        let slot_type = getRandomInt(0,2)

        if (slot_type == 0){
            let random_image = getRandomInt(0,image_types)

            slot = new PIXI.Sprite(
                PIXI.loader.resources["card_" + random_image].texture
            );
            slot.scale.set(0.5,0.5);
        } else {
            let random_text = getRandomInt(0,text_types);
            let random_font = getRandomInt(16,64);

            let text = new PIXI.Text(messages[random_text],{fontFamily : 'Arial', fontSize: random_font, fill : 0xffa500, align : 'center'});
            slot = text;
        }

        
        slot.anchor.set(0.5,0.5);

        slot_position_x = (window.innerWidth/(slot_count+1))*i
        slot.x = slot_position_x;
        slot.y = renderer.height / 2;

        SlotsApp.stage.addChild(slot);
    }

    function getRandomInt(min = 0, max = 10) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}