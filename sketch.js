//////////////////////////////////////////////////
// Object for creation and real-time resize of canvas
// Good function to create canvas and resize functions. I use this in all examples.
const C = {
  loaded: false,
  prop() {
    return this.height / this.width;
  },
  isLandscape() {
    return window.innerHeight <= window.innerWidth * this.prop();
  },
  resize() {
    if (this.isLandscape()) {
      console.log("yes");
      document.getElementById(this.css).style.height = "100%";
      document.getElementById(this.css).style.removeProperty("width");
    } else {
      document.getElementById(this.css).style.removeProperty("height");
      document.getElementById(this.css).style.width = "100%";
    }
  },
  setSize(w, h, p, css) {
    (this.width = w), (this.height = h), (this.pD = p), (this.css = css);
  },
  createCanvas() {
    (this.main = createCanvas(this.width, this.height, WEBGL)),
      pixelDensity(this.pD),
      this.main.id(this.css),
      this.resize();
  },
};
C.setSize(1500, 2000, 1, "mainCanvas");

function windowResized() {
  C.resize();
}

//////////////////////////////////////////////////
// The example really starts here

let palette = [
  "#7b4800",
  "#002185",
  "#003c32",
  "#fcd300",
  "#ff2702",
  "#6b9404",
];

function red(color) {
  return parseInt(color.slice(1).slice(0, 2), 16) / 255;
}

function green() {
  return parseInt(color.slice(1).slice(2, 4), 16) / 255;
}

function blue() {
  return parseInt(color.slice(1).slice(4, 6), 16) / 255;
}

function setup() {
  C.createCanvas();
  angleMode(DEGREES);
  background("#fffceb");

  translate(-width / 2, -height / 2);

  // We create a grid here
  //   let num_cols = 12;
  //   let num_rows = 6;
  let num_cols = 3;
  let num_rows = 2;
  //   let num_cols = 1;
  //   let num_rows = 1;
  let border = 300;
  let col_size = (width - border) / num_cols;
  let row_size = (height - border) / num_rows;

  // We define the brushes for the hatches, and the brushes for the strokes
  let hatch_brushes = ["marker", "marker2"];
  let stroke_brushes = ["2H", "HB", "charcoal"];

  // Test Different Flowfields here: "zigzag", "seabed", "curved", "truncated"
  //   brush.field("truncated");
  brush.noField();
  // You can also disable field completely with brush.noField()

  //   brush.setHatch(random(hatch_brushes), random(palette));
  brush.rect(0, 0, 1, 1, false);

  brush.noStroke();

  const startTime = performance.now();

  //   randomSeed(99);

  // We create the grid here
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_cols; j++) {
      // We fill 10% of the cells
      //   if (random() < 0.1) {
      if (true) {
        // Set Fill
        brush.fill(random(palette), random(60, 100));
        brush.bleed(random(0.03, 0.05));
        brush.fillTexture(0.55, 0.8);
      }

      // We stroke + hatch the remaining
      else {
        // Set Stroke
        brush.set(random(stroke_brushes), random(palette));

        // Set Hatch
        // You set color and brush with .setHatch(brush_name, color)
        brush.setHatch(random(hatch_brushes), random(palette));
        // You set hatch params with .hatch(distance_between_lines, angle, options: see reference)
        brush.hatch(random(10, 60), random(0, 180), {
          rand: 0,
          continuous: false,
          gradient: false,
        });
      }

      // We draw the rectangular grid here
      brush.rect(
        border / 2 + col_size * j,
        border / 2 + row_size * i,
        col_size,
        row_size,
        false
      );

      // Reset states for next cell
      brush.noStroke();
      brush.noFill();
      brush.noHatch();
    }
  }
  const endTime = performance.now();
  console.log(endTime - startTime);
}
