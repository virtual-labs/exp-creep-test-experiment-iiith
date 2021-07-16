'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // RAW DATA USED IN THE SIMULATION

    const extension = [203, 227, 244, 258, 270, 281, 294, 308, 321, 340, 361, 390, 450, 540, 590, 641, 690, 740, 800, 865, 940, 1020, 1120, 1250, 1400, 1675];
    const timec = [0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.50, 4.00, 4.25, 4.50, 4.75, 5.00, 5.25, 5.50, 5.75, 6.00, 6.25, 6.50, 6.75, 7.00];

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', function() { restart(); });

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', function() { play(); });

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', function() { pause(); });

    const slider = document.getElementById('speed');
    const output = document.getElementById('demo_speed');
    output.innerHTML = (slider.value) / 4;
    slider.oninput = function() {
        output.innerHTML = (this.value) / 4;
        fps = originalFPS * (output.innerHTML);
        restart();
    };

    function setAll() {
        step = 0;
        rodWidth = 60;

        rod = [
            [standX + gap, rodY],
            [standX + gap, rodY + rodWidth],
            [standX + gap + rodLength, rodY + rodWidth],
            [standX + gap + rodLength, rodY],
        ];

        box = [
            [boxX, boxY],
            [boxX + boxWidth, boxY],
            [boxX + boxWidth, boxY + boxHeight],
            [boxX, boxY + boxHeight],
        ];

        document.getElementById("timec").innerHTML = "0 mins";
        document.getElementById("extension").innerHTML = "0.0 mm";
    }

    function restart() {
        window.clearTimeout(tmHandle);
        setAll();
        graph();
        play();
    }

    function play() {
        tmHandle = window.setTimeout(draw, 1000 / fps);
        pauseButton.removeAttribute("disabled");
        restartButton.removeAttribute("disabled");
        playButton.setAttribute("disabled", "true");
    }

    function pause() {
        window.clearTimeout(tmHandle);
        pauseButton.setAttribute("disabled", "true");
        playButton.removeAttribute("disabled");
    }

    function drawObject(ctx, obj, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.strokeStyle = data.colors.strokestyle;
        ctx.beginPath();
        ctx.moveTo(obj[0][0], obj[0][1]);

        for (let i = 0; i < obj.length; ++i) {
            const next = (i + 1) % obj.length;
            ctx.lineTo(obj[next][0], obj[next][1]);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    function drawCircle(ctx, x, y, radius, flag) {
        ctx.beginPath();
        ctx.fillStyle = data.colors.circlefill;
        ctx.strokeStyle = data.colors.strokestyle;
        ctx.lineWidth = 6;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        if (flag === 0) {
            ctx.fill();
        }
        ctx.restore();
    }

    function connectPoints(x1, y1, x2, y2, lineWidth, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
    }

    function move(tube, flag) {
        for (let i = 0; i < tube.length; ++i) {
            tube[i][1] += flag;
        }
    }

    let tmHandle;
    let chart;
    let step = 0;

    const canvas = document.getElementById("main");
    canvas.width = 900;
    canvas.height = 1200;
    canvas.style = "border:3px solid;";
    const ctx = canvas.getContext("2d");

    const lineWidth = 1.5;
    const originalFPS = 20;
    let fps = 20;


    const standX = 100;
    const standWidth1 = 60;
    const gap = 150;
    const standY = 400;
    const standHt1 = 300;
    const standHt2 = 198;
    const standHt3 = 198;

    const rodLength = 500;
    let rodWidth = 60;
    const rodY = standY - 150;

    const boxWidth = 150;
    const boxX = standX + gap + rodLength - boxWidth;
    const boxY = standY + standHt1 + standHt2 + 20;
    const boxHeight = 100;

    const baseX = 0;
    const baseWidth = canvas.width;
    const baseHeight = 100;
    const baseY = canvas.height - baseHeight;


    const base = [
        [baseX, baseY],
        [baseX, baseY + baseHeight - 5],
        [baseX + baseWidth, baseY + baseHeight - 5],
        [baseX + baseWidth, baseY],
    ];

    const stand = [
        [standX, standY],
        [standX, standY + standHt1 + standHt2 + standHt3],
        [standX + 3 * gap, standY + standHt1 + standHt2 + standHt3],
        [standX + 3 * gap, standY],
        [standX + 3 * gap - standWidth1, standY],
        [standX + 3 * gap - standWidth1, standY + standHt1],
        [standX + 2 * gap, standY + standHt1],
        [standX + 2 * gap, standY + standHt1 + standHt2],
        [standX + gap, standY + standHt1 + standHt2],
        [standX + gap, standY + standHt1],
        [standX + standWidth1, standY + standHt1],
        [standX + standWidth1, standY]
    ];

    const hook = [
        [standX + 2 * gap, standY + standHt1],
        [standX + 2 * gap, standY + standHt1 + standHt2],
        [standX + gap, standY + standHt1 + standHt2],
        [standX + gap, standY + standHt1],
    ];
    let rod = [];
    let box = [];


    setAll();
    drawStatic();
    graph();

    function drawStatic() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.font = "50px Arial";

        ctx.fillText("Creep Testing Machine", 200, 100);

        drawObject(ctx, stand, data.colors.stand);
        drawObject(ctx, base, data.colors.bench);
        drawObject(ctx, hook, data.colors.hook);
        drawObject(ctx, rod, data.colors.rod);
        drawObject(ctx, box, data.colors.box);
        drawCircle(ctx, standX + 1.5 * gap, standY + standHt1 + standHt2 / 2, 10, 0);
        drawCircle(ctx, standX + 1.5 * gap, rod[0][1] + rodWidth / 2, 10, 0);
        drawCircle(ctx, standX + 3 * gap - standWidth1 / 2, rodY + rodWidth / 2, 10, 0);
        drawCircle(ctx, standX + 3 * gap - standWidth1 / 2, rodY + rodWidth / 2, 20, 1);
        drawCircle(ctx, boxX + boxWidth / 2, rod[2][1] - rodWidth / 2, 10, 0);
        connectPoints(standX + 1.5 * gap, standY + standHt1 + standHt2 / 2, standX + 1.5 * gap, rod[0][1] + rodWidth / 2, 6, "blue");
        connectPoints(boxX + boxWidth / 2, rod[2][1] - rodWidth / 2, boxX + boxWidth / 2, box[1][1], 10, "black");
    }

    function draw() {

        drawStatic();
        rod[0][1] -= 1;
        rod[1][1] -= 1;
        rod[2][1] += 1;
        rod[3][1] += 1;
        rodWidth += 0.5;
        move(box, 1);

        if (step < timec.length) {
            tmHandle = window.setTimeout(draw, 5000 / fps);
            updateChart();
        } else {
            connectPoints(standX + 1.5 * gap, standY + standHt1 / 2, standX + 1.5 * gap, standY + standHt1 - standHt2, 6, "white");
            pauseButton.setAttribute("disabled", "true");
        }
    }

    function graph() {

        chart = [{
            x: [0],
            y: [0],
            type: 'lines+markers'
        }];

        let layout = {
            title: {
                text: "Extension v/s Time"
            },
            yaxis: {
                title: "Extension (mm)"
            },
            xaxis: {
                title: "Time (mins)"
            },
        };
        Plotly.newPlot(chartContainer, chart, layout);
    }

    function updateChart() {

        let x = timec[step];
        let y = extension[step];

        y *= 5 / 1000;

        y = Number.parseFloat(y).toPrecision(3);
        x = Number.parseFloat(x).toPrecision(3);
        document.getElementById("timec").innerHTML = x.toString() + "mins";
        document.getElementById("extension").innerHTML = y.toString() + "mm";

        if (step < timec.length) {
            chart[0]['x'].push(x);
            chart[0]['y'].push(y);
            Plotly.redraw(chartContainer);
            step++;
        }
    }
});
