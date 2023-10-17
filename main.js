var data = [
    {
        "name": "Illiterate",
        "value": 0.8,
        "value2": 3.8,
        "total": 4.6
    },
    {
        "name": "No school completed",
        "value": 1.6,
        "value2": 5.5,
        "total": 7.1
    },
    {
        "name": "Primary school",
        "value": 13.7,
        "value2": 21,
        "total": 34.7
    },
    {
        "name": "Primary education",
        "value": 10.6,
        "value2": 6.1,
        "total": 16.7
    },
    {
        "name": "Junior high school",
        "value": 26.1,
        "value2": 29.3,
        "total": 55.4
    },
    {
        "name": "High school",
        "value": 29.9,
        "value2": 21.3,
        "total": 51.2
    },
    {
        "name": "Higher education",
        "value": 16.2,
        "value2": 12.7,
        "total": 28.9
    }
];

data = data.sort(function(a, b) {
    return a.total - b.total;
});

var margin = {
    top: 40,
    right: 25,
    bottom: 60,
    left: 140,
};

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var canvas = document.getElementById("graph");
canvas.style.width = width + margin.left + margin.right + "px";
canvas.style.height = height + margin.top + margin.bottom + "px";

var xScale = function(d) {
    return (d / data[data.length - 1].total) * width;
};

var yScale = function(d, i) {
    return i * 50;
};

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", width + margin.left + margin.right);
svg.setAttribute("height", height + margin.top + margin.bottom);
canvas.appendChild(svg);

// Add a title at the top
var title = document.createElementNS("http://www.w3.org/2000/svg", "text");
title.setAttribute("class", "title");
title.setAttribute("y", 20);
title.setAttribute("x", width / 4);
title.setAttribute("text-anchor", "middle");
title.setAttribute("font-weight", "bold");
title.textContent = "Eğitim durumu ve cinsiyete göre intiharlar, 2022";
svg.appendChild(title);

var percentSign = document.createElementNS("http://www.w3.org/2000/svg", "text");
percentSign.setAttribute("y", 42);
percentSign.setAttribute("x", margin.left + 8);
percentSign.setAttribute("text-anchor", "middle");
percentSign.setAttribute("font-weight", "bold");
percentSign.textContent = "(%)";
svg.appendChild(percentSign);

data.forEach(function(d, i) {

    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("class", "label");
    text.setAttribute("y", yScale(d, i) + 75); 
    text.setAttribute("x", 2);
    text.setAttribute("font-weight", "bold");
    text.textContent = d.name;
    svg.appendChild(text);

    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("class", "bar");
    rect.setAttribute("y", yScale(d, i) + 50);
    rect.setAttribute("height", 40);
    rect.setAttribute("x", margin.left);
    rect.setAttribute("width", xScale(d.value));
    svg.appendChild(rect);

    var value2Rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    value2Rect.setAttribute("class", "red-bar");
    value2Rect.setAttribute("y", yScale(d, i) + 50);
    value2Rect.setAttribute("height", 40);
    value2Rect.setAttribute("x", margin.left + xScale(d.value));
    value2Rect.setAttribute("width", xScale(d.value2));
    svg.appendChild(value2Rect);

    // Calculate x position for values to place them in the center of bars
    var valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueText.setAttribute("class", "label");
    valueText.setAttribute("y", yScale(d, i) + 75); 
    valueText.setAttribute("x", margin.left + xScale(d.value) / 2 - 5); // Centered x position
    valueText.setAttribute("fill", "white");
    valueText.setAttribute("font-weight", "bold");
    valueText.textContent = d.value;
    svg.appendChild(valueText);

    var value2Text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    value2Text.setAttribute("class", "label");
    value2Text.setAttribute("y", yScale(d, i) + 75); 
    value2Text.setAttribute("x", margin.left + xScale(d.value) + xScale(d.value2) / 2);
    value2Text.setAttribute("fill", "white");
    value2Text.setAttribute("font-weight", "bold");
    value2Text.textContent = d.value2;
    svg.appendChild(value2Text);
});

var legendGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
legendGroup.setAttribute("class", "legend");
legendGroup.setAttribute("transform", "translate(" + (margin.left + xScale(data[data.length - 1].value/2)) + "," + (height + margin.top - 20) + ")");

svg.appendChild(legendGroup);

// Create the text for Male (Blue)
var blueDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
blueDot.setAttribute("cx", 20);
blueDot.setAttribute("cy", 0);
blueDot.setAttribute("r", 5);
blueDot.setAttribute("fill", "#498dc9");
legendGroup.appendChild(blueDot);

var maleLegend = document.createElementNS("http://www.w3.org/2000/svg", "text");
maleLegend.setAttribute("x", 30);
maleLegend.setAttribute("y", 5);
maleLegend.setAttribute("font-weight", "bold");
maleLegend.textContent = "Male";
legendGroup.appendChild(maleLegend);

// Create the text for Female (Red)
var redDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
redDot.setAttribute("cx", 80);
redDot.setAttribute("cy", 0);
redDot.setAttribute("r", 5);
redDot.setAttribute("fill", "#c92006");
legendGroup.appendChild(redDot);

var femaleLegend = document.createElementNS("http://www.w3.org/2000/svg", "text");
femaleLegend.setAttribute("x", 90);
femaleLegend.setAttribute("y", 5);
femaleLegend.setAttribute("font-weight", "bold");
femaleLegend.textContent = "Female";
legendGroup.appendChild(femaleLegend);