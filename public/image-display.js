const upload = document.getElementById("imageUpload");
const original = document.getElementById("originalPreview");
const originalContext = original.getContext("2d");
const canvas = document.getElementById("simulatedPreview");
const context = canvas.getContext("2d");
const densitySlider = document.getElementById("densitySetting");
const speedSlider = document.getElementById("speedSetting");
const sizeSlider = document.getElementById("sizeSetting");
const colorSlider = document.getElementById("colorSetting");
const opacitySlider = document.getElementById("opacitySetting");

let baseImage = null;

original.style.display = "none";
canvas.style.display = "none";
document.getElementById("originalLabel").style.display = "none";
document.getElementById("simulatedLabel").style.display = "none";

densitySlider.addEventListener('input', () => {
    document.getElementById('densityValue').textContent = densitySlider.value + '%';
});

speedSlider.addEventListener('input', () => {
    document.getElementById('speedValue').textContent = speedSlider.value + '%';
});

sizeSlider.addEventListener('input', () => {
    document.getElementById('sizeValue').textContent = sizeSlider.value + 'px';
});

colorSlider.addEventListener('input', () => {
    document.getElementById('colorValue').textContent = colorSlider.value + '%';
});

opacitySlider.addEventListener('input', () => {
    document.getElementById('opacityValue').textContent = opacitySlider.value + '%';
});

upload.addEventListener("change", () => {
    const file = upload.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {

        original.width = img.width;
        original.height = img.height;
        canvas.width = img.width;
        canvas.height = img.height;

        baseImage = img;

        if (!baseImage) return;
        originalContext.drawImage(baseImage, 0, 0, original.width, original.height);

        original.style.display = "block";
        canvas.style.display = "block";
        document.getElementById("originalLabel").style.display = "block";
        document.getElementById("simulatedLabel").style.display = "block";

        simulateSnow();
    };
});

function simulateSnow() {
    if (!baseImage) return;

    context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    let density = densitySlider.value / 100;
    let speed = 100 - speedSlider.value;
    let grainSize = Math.max(1, parseInt(sizeSlider.value));
    let colorAmount = colorSlider.value / 100;
    let opacity = opacitySlider.value / 100;

    for (let y = 0; y < canvas.height; y += grainSize) {
        for (let x = 0; x < canvas.width; x += grainSize) {
            if (Math.random() < density) {

                let r = Math.floor(Math.random() * 256);
                let g = Math.floor(Math.random() * 256);
                let b = Math.floor(Math.random() * 256);

                let gray = (r + g + b) / 3;

                let grainR = gray + (r - gray) * colorAmount;
                let grainG = gray + (g - gray) * colorAmount;
                let grainB = gray + (b - gray) * colorAmount;

                for (let dy = 0; dy < grainSize && y + dy < canvas.height; dy++) {
                    for (let dx = 0; dx < grainSize && x + dx < canvas.width; dx++) {
                        let i = ((y + dy) * canvas.width + (x + dx)) * 4;

                        let origR = data[i];
                        let origG = data[i + 1];
                        let origB = data[i + 2];

                        data[i] = origR * (1 - opacity) + grainR * opacity;
                        data[i + 1] = origG * (1 - opacity) + grainG * opacity;
                        data[i + 2] = origB * (1 - opacity) + grainB * opacity;
                    }
                }
            }
        }
    }

    context.putImageData(imageData, 0, 0);

    setTimeout(simulateSnow, speed);
}