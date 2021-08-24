function loadFont(name, url) {
    let newFont = new FontFace(name, `url(${url})`);
    newFont.load()
        .then((loaded) => document.fonts.add(loaded))
        .catch((error) => error);
}
loadFont('pixel', '/assets/pixel.ttf');
let rope = 200;
const diff_rope = 40;
let add_rope = 20;
let level = 3;
const vel = 50;
const buttons = [
    [3,12,15,2],
    [4,11,22,7],
    [2,12,22,5],
    [3,3,22,2],
    [2,2,21,2],
    [2,2,21,2],
    [2,2,21,2]
];
const teleports = [
    null,
    null,
    [3,3,6,11,1],
    [20,12,14,2,2],
    [1,2,3,4,1],
    [1,2,3,4,2],
    [2,2,21,2,1]
];
const helixs = [
    null,
    null,
    null,
    null,
    [1,2],
    [3,4],
    [1,2]
];
const ropes = [
    null,
    [2,2],
    null,
    [22,12],
    null,
    [1,1],
    null,
]
