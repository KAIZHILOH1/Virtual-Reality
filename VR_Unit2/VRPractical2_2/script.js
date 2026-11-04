let scene, pokemon, rocket, sun, car, dude
window.addEventListener("DOMContentLoaded",function() {
scene = document.querySelector("a-scene");
car = document.querySelector("#car");
rocket = document.querySelector("#rocket");
pokemon = document.querySelector("#pokemon");

car.x = 0;
car.dx = 0.01;

rocket.y = 0;
rocket.dy = 0.01;

pokemon.x = 0;
pokemon.dx = 5;

loop();

})

function loop(){
    car.x+=car.dx;
    car.setAttribute("position", {x:car.x,y:0,z:-5});
    
    rocket.y+=rocket.dy;
    rocket.setAttribute("position", {x:0,y:rocket.y,z:-0});
    
    pokemon.x+=pokemon.dx;
    pokemon.setAttribute("rotation", {x:pokemon.x,y:0,z:0});

    window.requestAnimationFrame(loop);
}