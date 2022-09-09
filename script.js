"use strict";

const [Nbox, chart, probabilityLine, lineGroup] = getElm(["Nbox", "chart", "probabilityLine", "lineGroup"]);
const SVG_VIEWPORT_WIDTH = 150;
const SVG_VIEWPORT_HEIGHT = 100;

chart.setAttribute("viewBox", `0 0 ${SVG_VIEWPORT_WIDTH} ${SVG_VIEWPORT_HEIGHT}`);

const solver = (n, k) => 1 - (power(Math.exp(1), -1 * k * (k - 1) / (2 * n)));

Nbox.addEventListener("input", function() {
    const n = parseInt(this.value);
    if (n < 2) return;
    const pointSets = [];
    doNtimes(n + 1, k => {
        const p = solver(n, k + 1);
        console.log(p);
        pointSets.push([k / n * SVG_VIEWPORT_WIDTH, SVG_VIEWPORT_HEIGHT - p * SVG_VIEWPORT_HEIGHT]);
    });
    probabilityLine.setAttribute("points", pointSets.map(pointSet => pointSet.join(",")).join(" "));
});


chart.addEventListener("click", function(event) {
    const clickX = event.pageX;
	const clickY = event.pageY;

	const clientRect = this.getBoundingClientRect();
	const positionX = clientRect.left + window.pageXOffset;
	const positionY = clientRect.top + window.pageYOffset;

	const x = clickX - positionX;
	const y = clickY - positionY;

    const width = this.clientWidth;
    const height = this.clientHeight;

    console.log(x, y);
});


(() => {
    const LINE_SPAN = 10;
    for (let index = 0; index < SVG_VIEWPORT_WIDTH; index = index + LINE_SPAN) {
        const [line] = mkElmSVG(["line"]);
        line.setAttribute("x1", index);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", index);
        line.setAttribute("y2", SVG_VIEWPORT_HEIGHT);
        append([line], lineGroup);
    }
    for (let index = 0; index < SVG_VIEWPORT_HEIGHT; index = index + LINE_SPAN) {
        const [line] = mkElmSVG(["line"]);
        line.setAttribute("x1", 0);
        line.setAttribute("y1", index);
        line.setAttribute("x2", SVG_VIEWPORT_WIDTH);
        line.setAttribute("y2", index);
        append([line], lineGroup);
    }
})();

