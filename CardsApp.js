PIXI.utils.sayHello("Hi! I'm spielersun");

const cardsApp = new PIXI.Application();

const card_count = 144
const card_types = 4

const card_fps = 60
const move_fps = 120

let timer = 0
let cards_placed = false
let card_counter = 1

const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    transparent: true,
    resolution: 1
});

const framerate = document.getElementById("framerate");
let elapsed = Date.now();

cardsApp.renderer = renderer
document.body.appendChild(cardsApp.view);

const stage = new PIXI.Container();
const deck = new PIXI.Container();
const reverse_deck = new PIXI.Container();

let card;

PIXI.loader
    .add("card_0", "images/blue_0_large.png")
    .add("card_1", "images/green_1_large.png")
    .add("card_2", "images/red_2_large.png")
    .add("card_3", "images/yellow_3_large.png")
    .load(setup);

function setup(){
    cardsApp.stage.addChild(reverse_deck);
    
    for (let i = 1; i < card_count+1; i++) {
        let random_card = getRandomInt(0,card_types)
        let random_position_x = getRandomInt(-15,15)
        let random_position_y = getRandomInt(-15,15)
        let random_rotation = getRandomInt(-5,5)

        card = new PIXI.Sprite(
            PIXI.loader.resources["card_" + random_card].texture
        );

        card.scale.set(0.5,0.5);
        card.anchor.set(0.5,0.5);

        card.x = (renderer.width / 4) + random_position_x;
        card.y = (renderer.height / 2) + random_position_y;
        card.rotation = (0.1/random_rotation);

        deck.addChild(card);
        if (i == card_count){cards_placed = true;}
    }

    cardsApp.stage.addChild(deck);

    cardsApp.ticker.add(function(delta){
        if (cards_placed == true && card_counter <= card_count){
            timer += 1
            if (timer == card_fps){
                move_card(card_count - card_counter)
                card_counter += 1
                timer = 0;
            }
        }
        let now = Date.now();
        framerate.innerHTML = (1000 / (now - elapsed)).toFixed(2);
        elapsed = now
    });

    function move_card(queue){
        let period = (window.innerWidth/2) / move_fps;
        let object = deck.children[queue]
        let random_rotation_new = getRandomInt(-5,5)

        cardsApp.ticker.add(function(delta){
            if (object.x <= (3*window.innerWidth/4)){
                object.x += period;
                object.rotation += (0.003/random_rotation_new)
            } else {
                reverse_deck.addChild(object);
                return;
            }
        });
    }

    function getRandomInt(min = 0, max = 10) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}