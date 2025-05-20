// ------------------------------
// 🔧 CONSTANTS
// ------------------------------
const CANVAS_WIDTH = 620;
const CANVAS_HEIGHT = 500;
const LANE_POSITIONS = [60, 180, 330, 440, 560];
const CAR_COUNT = 6;
const LINE_COUNT = 5;
const LINE_SPACING = 120;
const LINE_WIDTH = 14;
const LINE_HEIGHT = 100;
const POLICE_Y_POSITION = CANVAS_WIDTH / 2;
const POLICE_MOVE_STEP = 4;
const POLICE_WIDTH = 60; // width of police car
const BARCODE_LEFT = "left";
const BARCODE_RIGHT = "right";

// ------------------------------
// 🧩 VARIABLES
// ------------------------------
let red_car, green_car, yellow_car, blue_car;
let police0, police1, police2;
let cars_type = [];
let cars = [];

let x, y;
let step = 0;
let target = 0;
let street_y = 0;
let xi = 0;
let mid;

// ------------------------------
// 🚗 CAR CLASS
// ------------------------------
class Car {
  constructor() {
    this.new_car();
  }

  draw() {
    image(this.image, this.x, this.y);
  }

  new_car() {
    xi++;
    if (xi >= LANE_POSITIONS.length) xi = 0;
    this.x = LANE_POSITIONS[xi];
    this.y = random(-100, -200);
    this.speed = random(3, 8);
    this.image = random(cars_type);
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.new_car();
    }
  }
}

// ------------------------------
// 🧱 SETUP
// ------------------------------
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  // بارگذاری تصاویر
  police0 = loadImage("./cars/police.png");
  police1 = loadImage("./cars/police1.png");
  police2 = loadImage("./cars/police2.png");

  red_car = loadImage("./cars/red.png");
  green_car = loadImage("./cars/green.png");
  blue_car = loadImage("./cars/blue.png");
  yellow_car = loadImage("./cars/yellow.png");

  cars_type = [red_car, green_car, blue_car, yellow_car];

  // موقعیت اولیه پلیس
  x = 230;
  y = POLICE_Y_POSITION;
  mid = CANVAS_WIDTH / 2;

  for (let i = 0; i < CAR_COUNT; i++) {
    cars.push(new Car());
  }
}

// ------------------------------
// 🖼️ DRAW LOOP
// ------------------------------
function draw() {
  background(0);

  // حرکت خطوط جاده
  street_y += 6;
  if (street_y > height) street_y = -LINE_SPACING;

  fill(255, 200);
  for (let i = 0; i < LINE_COUNT; i++) {
    let sy = street_y + i * LINE_SPACING;
    if (sy > height) sy -= height + LINE_SPACING;
    rect(mid, sy, LINE_WIDTH, LINE_HEIGHT);
  }

  // حرکت نرم پلیس در پاسخ به بارکد یا کلید
  if (target > 0) {
    x += step;
    target -= POLICE_MOVE_STEP;
    x = constrain(x, 0, CANVAS_WIDTH - POLICE_WIDTH);
  }

  // حرکت و رسم ماشین‌ها
  cars.forEach((car) => {
    car.move();
    car.draw();
  });

  // رسم پلیس با تصویر تصادفی
  let police = random([police0, police1, police2]);
  image(police, x, y);
}

// ------------------------------
// 🧾 BARCODE SCANNER
// ------------------------------
function barcodeScanned(barcode) {
  barcode = barcode.toUpperCase();

  if (barcode === BARCODE_LEFT) {
    x += POLICE_MOVE_STEP;
    target = 100;
    step = -POLICE_MOVE_STEP;
  } else if (barcode === BARCODE_RIGHT) {
    x -= POLICE_MOVE_STEP;
    target = 100;
    step = POLICE_MOVE_STEP;
  }
}

// ------------------------------
// ⌨️ KEYBOARD CONTROL
// ------------------------------
function keyPressed() {
  let txt = document.getElementById("txt");

  switch (keyCode) {
    case LEFT_ARROW:
      x += POLICE_MOVE_STEP;
      target = 100;
      step = -POLICE_MOVE_STEP;
      txt.value = "LEFT";
      break;

    case RIGHT_ARROW:
      x -= POLICE_MOVE_STEP;
      target = 100;
      step = POLICE_MOVE_STEP;
      txt.value = "RIGHT";
      break;

    default:
      console.log("Unknown key");
      break;
  }
}
