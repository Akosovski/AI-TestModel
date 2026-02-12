const URL = "./my_model/";

let model, maxPredictions;
let labelContainer;
let uploadedImage = document.getElementById("preview");

async function init() {

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";

    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    alert("Model Loaded Successfully!");
}

// Handle Image Upload
document.getElementById("imageUpload").addEventListener("change", async function(event) {

    const file = event.target.files[0];
    if (!file || !model) return alert("Load model first!");

    const reader = new FileReader();

    reader.onload = async function(e) {

        uploadedImage.src = e.target.result;
        uploadedImage.style.display = "block";

        uploadedImage.onload = async () => {
            await predict(uploadedImage);
        };
    };

    reader.readAsDataURL(file);
});

// Prediction Function
async function predict(image) {

    const prediction = await model.predict(image);

    for (let i = 0; i < maxPredictions; i++) {

        const classPrediction =
            prediction[i].className + ": " +
            prediction[i].probability.toFixed(2);

        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}
