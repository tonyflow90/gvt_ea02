!function(){"use strict";let e,t;document.body.onload=o=>{console.info("started!"),e=document.querySelector("#canvas"),t=e.getContext("webgl"),t.clearColor(.25,.35,.45,1);let l=r(16);a(t.LINE_STRIP,0,l.length,l)};let r=(e=8)=>{let t=[],r=e/2,a=1,o=Math.PI/r;for(let e=0;e<r;e+=1){a=.5*Math.random()+.5;let r=0,l=0,c=a*Math.cos(o*e),n=a*Math.sin(o*e),i=a*Math.cos(o*(e+1)),d=a*Math.sin(o*(e+1));t=[...t,r,l,c,n,i,d]}return t.map(e=>-1*e),t=[...t,...t.map(e=>-1*e)],new Float32Array(t)},a=(e,r=0,a=0,o)=>{let l=t.createShader(t.VERTEX_SHADER);t.shaderSource(l,"attribute vec2 pos;void main(){ gl_Position = vec4(pos, 0, 1); }"),t.compileShader(l);let c=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(c,"void main() { gl_FragColor = vec4(0,0,0,1); }"),t.compileShader(c);let n=t.createProgram();t.attachShader(n,l),t.attachShader(n,c),t.linkProgram(n),t.useProgram(n);let i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,o,t.STATIC_DRAW);let d=t.getAttribLocation(n,"pos");t.vertexAttribPointer(d,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(d),t.clear(t.COLOR_BUFFER_BIT),t.lineWidth(50),t.drawArrays(e,r,a)}}();
//# sourceMappingURL=bundle.js.map