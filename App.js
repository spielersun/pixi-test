PIXI.utils.sayHello("I'm spielersun");

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    transparent: true,
    resolution: 1
});

document.getElementById("App").appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
    .add("card_0", "images/blue_0_large.png")
    .add("card_1", "images/green_1_large.png")
    .add("card_2", "images/red_2_large.png")
    .add("card_3", "images/yellow_3_large.png")
    .load(setup);

var card;

function setup(){
    stage.interactive = true;

    for (var i = 0; i < 145; i++) {
        var random_card = getRandomInt(0,4)
        card = new PIXI.Sprite(
            PIXI.loader.resources["card_" + random_card].texture
        );

        card.interactive = true;
        card.scale.set(0.5,0.5);
        card.anchor.set(0.5,0.5);
        // card.pivot.set(0,0);

        card.click = function (){
            card.scale.x -= 0.1;
            card.scale.y -= 0.1;
        };
        var random_position_x = getRandomInt(-15,15)
        var random_position_y = getRandomInt(-15,15)
        var random_rotation = getRandomInt(-5,5)

        card.x = (renderer.width / 4) + random_position_x;
        card.y = (renderer.height / 2) + random_position_y;
        card.rotation = (0.1/random_rotation)

        stage.addChild(card);
    }

    animationLoop();

    function animationLoop(){
        renderer.render(stage);
    }
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}