let canvas, gl;
let aVertices = [];

// let kontur_vertices = new Float32Array([
//     290, 20, 241, 30, 195, 48, 154, 77, 127, 119, 111, 166, 120, 211, 103, 257, 84, 302, 67, 349, 63, 397, 85, 443, 106, 488, 127, 533, 172, 543, 222, 538, 271, 530, 321, 531, 371, 538, 421, 543, 467, 536, 487, 490, 507, 444, 527, 398, 522, 349, 506, 302, 489, 255, 470, 216, 480, 170, 470, 121, 441, 81, 401, 51, 355, 32, 307, 20
// ]);

// let vertices1 = kontur_vertices.map(x => {
//     // x=x*2;
//     if (kontur_vertices.indexOf(x) % 2) {
//         // console.log(x);
//         x = x * -1;
//     } else {
//         x = x - 300;
//     }
//     return x;
// });

// let visor_vertices = new Float32Array([
//     130, 210, 146, 256, 190, 263, 231, 235, 272, 208, 320, 208, 363, 232, 405, 261, 447, 258, 466, 213, 422, 205, 372, 202, 322, 200, 272, 201, 222, 202, 172, 203
// ]);

// let vertices2 = visor_vertices.map(x => {
//     // x=x*2;
//     if (visor_vertices.indexOf(x) % 2) {
//         // console.log(x);
//         x = x * -1;
//     } else {
//         x = x - 300;
//     }
//     return x;
// });

document.body.onload = _ => {
    console.info("started!");

    canvas = document.querySelector('#canvas');
    gl = canvas.getContext('webgl');

    // Pipeline setup
    gl.clearColor(.25, .35, .45, 1);

    let verticies = createVertices(16);

    draw(gl.LINE_STRIP, 0, verticies.length, verticies);
};

let createVertices = (nCount=8) => {
    let vertices = [];
    let triangleCount = nCount/2;
    let r = 1;
    let g = Math.PI / triangleCount;

    // 1. half
    for (let i = 0; i < triangleCount; i += 1) {
        r = Math.random() * .5 + .5;
        let x1 = 0;
        let y1 = 0;

        let x2 = r * Math.cos(g * i);
        let y2 = r * Math.sin(g * i);

        let x3 = r * Math.cos(g * (i + 1));
        let y3 = r * Math.sin(g * (i + 1));

        vertices = [...vertices, x1, y1, x2, y2, x3, y3];
    }

    // 2. half
    vertices.map(x => x * -1);
    vertices = [...vertices, ...vertices.map(x => x * -1)];
    return new Float32Array(vertices);
}

let draw = (mode, nStart = 0, nEnd = 0, aVertices) => {

    // Compile a vertex shader
    let vsSource = 'attribute vec2 pos;' +
        'void main(){ gl_Position = vec4(pos, 0, 1); }';
    let vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Compile a fragment shader
    let fsSouce = 'void main() { gl_FragColor = vec4(0,0,0,1); }';
    let fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Link together into a program
    let prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);


    let vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, aVertices, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute letiable
    let coordinatesAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(coordinatesAttrib, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coordinatesAttrib);

    // Clear framebuffer and render primitives
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.lineWidth(50.0);
    gl.drawArrays(mode, nStart, nEnd);

}