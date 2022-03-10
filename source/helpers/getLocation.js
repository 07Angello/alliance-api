const satelites = [
    {name: 'Kenobi', x: -500, y: -200},
    {name: 'Skywalker', x: 100, y: -100},
    {name: 'Sato', x: 500, y: 100},
];

const getLocation = (distances) => {
    //formula de sustitucion para encontrar coordenadas
    const x1 = satelites[0].x;
    const y1 = satelites[0].y;

    const x2 = satelites[1].x;
    const y2 = satelites[1].y;

    const x3 = satelites[2].x;
    const y3 = satelites[2].y;

    const r1 = distances[0];
    const r2 = distances[1];
    const r3 = distances[2];

    const A = x1 - x2;
    const B = y1 - y2;
    const D = x1 - x3;
    const E = y1 - y3;

    const T = (r1*r1 - x1*x1 - y1*y1);
    const C = (r2*r2 - x2*x2 - y2*y2) - T;
    const F = (r3*r3 - x3*x3 - y3*y3) - T;

    const Mx = ((C*E) - (B*F)) /2;
    const My = ((A*F) - (D*C)) /2;
    const M  = ((A*E) - (D*B));

    const x = Mx/M;
    const y = My/M;

    return {x: x,y: y};
}

module.exports = {
    getLocation
}
