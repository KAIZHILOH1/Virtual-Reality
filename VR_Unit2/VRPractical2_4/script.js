let rnd = (min, max) => Math.random() * (max - min) + min;
let scene;
let rockets = [];
let ufos = [];

class Rocket {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = rnd(0.02, 0.07); // Slightly faster launch speed
    this.obj = document.createElement("a-entity");

    // Main Body (Sleek White Multi-stage)
    let body = document.createElement("a-cylinder");
    body.setAttribute("position", "0 0.5 0");
    body.setAttribute("radius", "0.12");
    body.setAttribute("height", "1.0");
    body.setAttribute("color", "#f8f9f9");
    this.obj.append(body);

    // Sharp Nose Cone (Gold/Yellow Accent)
    let nose = document.createElement("a-cone");
    nose.setAttribute("position", "0 1.15 0");
    nose.setAttribute("radius-bottom", "0.12");
    nose.setAttribute("height", "0.4");
    nose.setAttribute("color", "#f39c12");
    this.obj.append(nose);

    // Neon Orange Body Stripe
    let stripe = document.createElement("a-box");
    stripe.setAttribute("position", "0 0.5 0");
    stripe.setAttribute("width", "0.26");
    stripe.setAttribute("height", "0.15");
    stripe.setAttribute("depth", "0.26");
    stripe.setAttribute("color", "#e74c3c");
    this.obj.append(stripe);

    // Quad Fins (4 angled fins around the base)
    for (let i = 0; i < 4; i++) {
      let angle = i * 90;
      let fin = document.createElement("a-box");
      fin.setAttribute("position", "0 0.1 0");
      fin.setAttribute("width", "0.02");
      fin.setAttribute("height", "0.3");
      fin.setAttribute("depth", "0.3");
      fin.setAttribute("rotation", `0 ${angle} -20`);
      fin.setAttribute("color", "#2c3e50");
      this.obj.append(fin);
    }

    // Glowing Booster Exhaust Flame
    let flame = document.createElement("a-cone");
    flame.setAttribute("position", "0 -0.25 0");
    flame.setAttribute("radius-bottom", "0.15");
    flame.setAttribute("height", "0.4");
    flame.setAttribute("rotation", "180 0 0");
    flame.setAttribute("color", "#ff5733");
    flame.setAttribute("opacity", "0.9");
    this.obj.append(flame);

    this.obj.setAttribute("position", { x: x, y: y, z: z });
    scene.append(this.obj);
  }

  launch() {
    this.y += this.speed;
    this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
  }
}

class UFO {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = rnd(0.015, 0.045);
    this.obj = document.createElement("a-entity");

    // Main Lower Saucer Hull
    let hull = document.createElement("a-cylinder");
    hull.setAttribute("radius", "0.9");
    hull.setAttribute("height", "0.12");
    hull.setAttribute("color", "#7f8c8d");
    this.obj.append(hull);

    // Outer Glowing Neon Ring / Trim
    let rim = document.createElement("a-torus");
    rim.setAttribute("radius", "0.92");
    rim.setAttribute("radius-tubular", "0.03");
    rim.setAttribute("rotation", "90 0 0");
    rim.setAttribute("color", "#e91e63");
    this.obj.append(rim);

    // Large Crystal Command Dome
    let dome = document.createElement("a-sphere");
    dome.setAttribute("position", "0 0.25 0");
    dome.setAttribute("radius", "0.45");
    dome.setAttribute("scale", "1 0.6 1");
    dome.setAttribute("color", "#00bcd4");
    dome.setAttribute("opacity", "0.75");
    this.obj.append(dome);

    // Pulsing Tractor Beam / Under-glow
    let beam = document.createElement("a-cone");
    beam.setAttribute("position", "0 -0.4 0");
    beam.setAttribute("radius-bottom", "0.6");
    beam.setAttribute("radius-top", "0.1");
    beam.setAttribute("height", "0.5");
    beam.setAttribute("color", "#8e44ad");
    beam.setAttribute("opacity", "0.5");
    this.obj.append(beam);

    this.obj.setAttribute("position", { x: x, y: y, z: z });
    scene.append(this.obj);
  }

  invade() {
    if (this.y > 0.2) {
      this.y -= this.speed;
      this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
    }
  }
}

window.addEventListener("DOMContentLoaded", function() {
  scene = document.querySelector("a-scene");

  // Spawn 100 rockets
  for (let i = 0; i < 100; i++) {
    let x = rnd(-40, 40);
    let z = rnd(-40, 40);
    let y = rnd(-4, -0.5);
    let rocket = new Rocket(x, y, z);
    rockets.push(rocket);
  }

  // Spawn 20 UFOs
  for (let i = 0; i < 20; i++) {
    let x = rnd(-40, 40);
    let z = rnd(-40, 40);
    let y = rnd(15, 30);
    let ufo = new UFO(x, y, z);
    ufos.push(ufo);
  }

  loop();
});

function loop() {
  for (let rocket of rockets) {
    rocket.launch();
  }

  for (let ufo of ufos) {
    ufo.invade();
  }

  window.requestAnimationFrame(loop);
}