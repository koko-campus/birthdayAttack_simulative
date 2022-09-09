"use strict";

const [Nbox, probabilityLine] = getElm(["Nbox", "probabilityLine"]);

const solver = (n, k) => 1 - (power(Math.exp(1), -1 * k * (k - 1) / (2 * n)));

Nbox.addEventListener("input", function() {
    const n = parseInt(this.value);
    const pointSets = [];
    doNtimes(n, k => {
        const p = solver(n, k);
        pointSets.push([k / n * 150, 100 - p * 100]);
    });
    probabilityLine.setAttribute("points", pointSets.map(pointSet => pointSet.join(",")).join(" "));
});


