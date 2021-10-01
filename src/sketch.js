const ROBOTO_FONT_URI = "assets/Roboto-Regular.ttf";

const DEFAULT_INPUT = "How can a clam cram in a clean cream can?"

let robotoFont;

let inputEdit;
let goBtn;
let resetBtn;
let nextBtn;
let prevBtn;

let usrInput;
let currentState;
let lastState;
let endStateReached;

let huffTree;

function preload() {
  robotoFont = loadFont(ROBOTO_FONT_URI);
}

function setup() {

  usrInput = DEFAULT_INPUT;
  currentState = 0;
  endStateReached = false;

  createCanvas(1920, 800);

  inputEdit = createInput("");
  inputEdit.size(500);
  inputEdit.input(onUserInputChanged);
  inputEdit.value(DEFAULT_INPUT);

  goBtn = createButton("Go");
  goBtn.mousePressed(onGoBtnPressed);

  resetBtn = createButton("Reset");
  resetBtn.mousePressed(onResetBtnPressed);

  prevBtn = createButton("Previous");
  prevBtn.hide();
  prevBtn.mousePressed(onPrevBtnPressed);

  nextBtn = createButton("Next");
  nextBtn.mousePressed(onNextBtnPressed);

  frameRate(10);
}

function draw() {

  background(30);
  endStateReached = false;

  switch (currentState) {

    case 0:
      fill(255);
      textFont(robotoFont, 22);
      textAlign(CENTER, CENTER);
      text("Enter text to start", width / 2, height / 2);

      break;

    case 1:
      {
        let drawX = 20;
        let drawY = 20;

        textFont(robotoFont, 15);
        for (let i = 0; i < usrInput.length; i++) {
          const [drawRect,] = new HuffNode(usrInput.charAt(i).toString(), 0).draw(drawX, drawY);
          drawX += drawRect.width;
        }
      }
      break;

    case 2:
      {
        let drawX = 20;
        let drawY = 20;

        let table = HuffTree.buildFreqTable(usrInput);

        huffTree = new HuffTree(table);
        let drawPt = huffTree.visualize(drawX, drawY);

        fill(255);
        textAlign(LEFT, CENTER);
        textFont(robotoFont, 16);
        text("Frequencies of each character is calculated", drawPt.x + 20, drawY + 20);
      }
      break;

    case 3:
      {
        let freqTable = sortFreqTable(huffTree.freqTable);
        huffTree = new HuffTree(freqTable);

        let drawX = 20;
        let drawY = 20;

        let drawPt = huffTree.visualize(drawX, drawY);

        fill(255);
        textAlign(LEFT, CENTER);
        textFont(robotoFont, 16);
        text("Sort each character by frequency", drawPt.x + 20, drawY + 20);
      }
      break;

    default:
      if (!endStateReached) {
        if (huffTree != null) {
          if (currentState != lastState) {
            let nextAvail = huffTree.next();
            huffTree.visualize(width * 0.15, 20, true);
            if (!nextAvail) {
              endStateReached = true;
            }

            lastState = currentState;
          } else {
            huffTree.visualize(width * 0.15, 20, true);
          }
        }
      }
      break;

  }

}

function onUserInputChanged() {
  usrInput = this.value();
}

function onNextBtnPressed() {
  if (!endStateReached)
    currentState++;
}

function onPrevBtnPressed() {
  if (currentState > 1)
    currentState--;
}

function onGoBtnPressed() {
  if (usrInput != null || usrInput != "") {
    currentState = 1;
  }
}

function onResetBtnPressed() {
  usrInput = "";
  inputEdit.value("");
  currentState = 0;
  endStateReached = false;
  lastState = 0;
}

const KVNode = class {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}