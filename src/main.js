let canvas, gl;
let aVertices = [];

document.body.onload = _ => {
    canvas = document.querySelector('#canvas');
    gl = canvas.getContext('webgl');

    // Pipeline setup
    gl.clearColor(.25, .35, .45, 1);

    let verticies = createVertices(16);

    draw(gl.LINE_STRIP, 0, 48, verticies);
};

let createVertices = (nCount=8) => {
    let vertices = [];
    let triangleCount = nCount;
    let r = 1;
    let g = 2 * Math.PI / triangleCount;

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
    gl.drawArrays(mode, nStart, nEnd);

}