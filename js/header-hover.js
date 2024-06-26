// Select the h1 and h2 elements
var h1 = document.querySelector('.home .text-container h1 a');
var h2 = document.querySelector('.home .text-container h2 a');

// Define the RGB values of the colors for h1
var color1_h1 = [240, 255, 255]; // azure
var color2_h1 = [171, 153, 204]; // rebeccapurple
var hoverColor_h1 = [250, 235, 215]; // antiquewhite

// Define the RGB values of the colors for h2
var color1_h2 = [240, 255, 255]; // azure
var color2_h2 = [171, 153, 204]; // rebeccapurple
var hoverColor_h2 = [250, 235, 215]; // antiquewhite

// Add a flag to indicate whether the mouse is hovering over the h1 element
var isHoveringOverH1 = false;
var isHoveringOverH2 = false;

// Add mouseover and mouseout event listeners to h1
h1.addEventListener('mouseover', function() {
    h1.style.color = 'rgb(' + hoverColor_h1 + ')';
    isHoveringOverH1 = true;
});
h1.addEventListener('mouseout', function() {
    h1.style.color = 'rgb(' + color1_h1 + ')';
    isHoveringOverH1 = false;
});

// Add mouseover and mouseout event listeners to h2
h2.addEventListener('mouseover', function() {
    h2.style.color = 'rgb(' + hoverColor_h2 + ')';
    isHoveringOverH2 = true;
});
h2.addEventListener('mouseout', function() {
    h2.style.color = 'rgb(' + color1_h2 + ')';
    isHoveringOverH2 = false;
});

var style_h1 = window.getComputedStyle(h1); // Get the computed style of the h1 element
var style_h2 = window.getComputedStyle(h2); // Get the computed style of the h2 element

// Define the minimum and maximum font sizes for h1 and h2
var maxFontSize_h1 = parseFloat(style_h1.fontSize);
var minFontSize_h1 = maxFontSize_h1 / 1.25;
var maxFontSize_h2 = parseFloat(style_h2.fontSize);
var minFontSize_h2 = maxFontSize_h2 / 1.25;

// Calculate the maximum distance (diagonal of the viewport)
var maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);

// Add a mousemove event listener to the document
document.addEventListener('mousemove', function(e) {
    // Calculate the distance between the cursor and the center of the h1 element
    var rect1 = h1.getBoundingClientRect();
    var x1 = rect1.left + rect1.width / 2;
    var y1 = rect1.top + rect1.height / 2;
    var dx1 = e.clientX - x1;
    var dy1 = e.clientY - y1;
    var distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

    // Calculate the distance between the cursor and the center of the h2 element
    var rect2 = h2.getBoundingClientRect();
    var x2 = rect2.left + rect2.width / 2;
    var y2 = rect2.top + rect2.height / 2;
    var dx2 = e.clientX - x2;
    var dy2 = e.clientY - y2;
    var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    // Calculate the ratio of the distance to the maximum distance
    var ratio1 = Math.min(distance1 / maxDistance, 1);
    var ratio2 = Math.min(distance2 / maxDistance, 1);

    // Interpolate between the RGB values of the colors for h1
    var color_h1 = color1_h1.map(function(start, i) {
        return Math.round(start + ratio1 * (color2_h1[i] - start));
    });

    // Interpolate between the RGB values of the colors for h2
    var color_h2 = color1_h2.map(function(start, i) {
        return Math.round(start + ratio2 * (color2_h2[i] - start));
    });

    // Interpolate between the minimum and maximum font sizes for h1 and h2
    var fontSize_h1 = minFontSize_h1 + (1 - ratio1) * (maxFontSize_h1 - minFontSize_h1);
    var fontSize_h2 = minFontSize_h2 + (1 - ratio2) * (maxFontSize_h2 - minFontSize_h2);

    // Set the color and font size of the h1 and h2 elements
    if (!isHoveringOverH1) { // Only change the color if the mouse is not hovering over h1
        h1.style.color = 'rgb(' + color_h1 + ')';
    }
    h1.style.fontSize = fontSize_h1 + 'px';
    if (!isHoveringOverH2) { // Only change the color if the mouse is not hovering over h2
        h2.style.color = 'rgb(' + color_h2 + ')';
    }
    h2.style.fontSize = fontSize_h2 + 'px';
});
