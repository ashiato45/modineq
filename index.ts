var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;
var topm = 10;
var leftm = 10;
var size = 500;

interface IPos {
    x: number;
    y: number;
}

function getPos(sp: number, x_: number, y_: number): IPos {
    return { x: leftm + sp * x_, y: size + topm - sp * y_ }
}
function mod(a: number, b: number): number {
    return ((a % b) + b) % b;
}

function draw() {
    if (ctx == null) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1280, 720);

    var a = parseInt((<HTMLInputElement>document.getElementById("txtA")).value);
    var b = parseInt((<HTMLInputElement>document.getElementById("txtB")).value);
    var c = parseInt((<HTMLInputElement>document.getElementById("txtC")).value);
    var m = parseInt((<HTMLInputElement>document.getElementById("txtM")).value);
    var d = parseInt((<HTMLInputElement>document.getElementById("txtD")).value);
    var e = parseInt((<HTMLInputElement>document.getElementById("txtE")).value);

    var sp = size / m;
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < m; j++) {
            ctx.beginPath();
            ctx.moveTo(leftm, size + topm - sp * j);
            ctx.lineTo(size + leftm, size + topm - sp * j);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(leftm + sp * i, topm);
        ctx.lineTo(leftm + sp * i, topm + size);
        ctx.stroke();

    }
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < m; j++) {
            var temp = mod(a * i + b * j + e, m)
            if (temp <= mod(c, m)) {
                ctx.beginPath();
                var p = getPos(sp, i, j);
                ctx.arc(p.x, p.y, sp / 3, 0, 2 * Math.PI, false);
                console.log(a * i + b * j + e, 0 <= a * i + b * j + e, a * i + b * j + e < m, 0 <= c, c < m, 0 <= d, d < m);
                if (0 <= a * i + b * j + e && a * i + b * j < m && 0 <= c && c < m && 0 <= d && d < m) {
                    ctx.fillStyle = "Blue";
                } else {
                    ctx.fillStyle = "Red";
                }
                ctx.fill();
            }
        }
    }

}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    (<HTMLButtonElement>document.getElementById("btnGo")).onclick = draw;
}


