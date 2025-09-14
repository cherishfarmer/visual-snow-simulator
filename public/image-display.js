const upload = document.getElementById("imageUpload");
const original = document.getElementById("originalPreview");
const canvas = document.getElementById("simulatedPreview");
const context = canvas.getContext("2d");
const densitySlider = document.getElementById("densitySetting");
const speedSlider = document.getElementById("speedSetting");
const sizeSlider = document.getElementById("sizeSetting");
const colorSlider = document.getElementById("colorSetting");

let baseImage = null;

upload.addEventListener("change", () => {
    const file = upload.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        original.src = img.src;
        baseImage = img;
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
    let size = sizeSlider.value / 100;

    let minColor = 1;
    let maxColor = colorSlider.value;

    // (Math.floor(Math.random() * (maxColor - minColor)) + minColor); -- snippet trying to implement color


    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < density) {
            let gray = Math.random() * 255;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
        }
    }

    context.putImageData(imageData, 0, 0);

    setTimeout(simulateSnow, speed);
}
