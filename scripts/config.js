function loadFont(name, url) {
    let newFont = new FontFace(name, `url(${url})`);
    newFont.load()
        .then((loaded) => document.fonts.add(loaded))
        .catch((error) => error);
}
loadFont('pixel', '/assets/pixel.ttf');
let rope = 200;
const diff_rope = 30;
let add_rope = 20;
let level = 4;
const vel = 50;
let bg_music;
const buttons = [
    [3,12,15,2],
    [4,11,22,7],
    [2,12,22,5],
    [3,3,22,2],
    [5,2,22,7],
    [3,2,22,12],
    [22,2,22,12]
];
const teleports = [
    null,
    null,
    [3,3,6,11,1],
    [20,12,14,2,2],
    [2,2,9,9,1],
    [22,2,22,7,2],
    [6,2,2,12,1]
];
const helixs = [
    null,
    null,
    null,
    null,
    [14,6],
    [9,10],
    [12,6]
];
const ropes = [
    null,
    [2,2],
    null,
    [22,12],
    null,
    [3,12],
    null,
]
