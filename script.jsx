
// English:
// Script to reverse layer order and save Photoshop document as PSD with only the bottom layer visible.
// Author: TheMaestr-o

// Function to remove file extensions from layer names
function removeExtensions(layerName) {
    return layerName.replace(/\.(tif|jpg|png)$/i, '');
}

// Function to reverse the order of layers
function reverseLayers(doc) {
    var reversedLayers = [];
    for (var i = doc.layers.length - 1; i >= 0; i--) {
        reversedLayers.push(doc.layers[i]);
    }
    for (var i = 0; i < reversedLayers.length; i++) {
        reversedLayers[i].move(doc, ElementPlacement.PLACEATEND);
    }
}

// Main part of the script
function main() {
    var doc = app.activeDocument;

    // Remove file extensions from layer names
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        var newName = removeExtensions(layer.name);
        if (newName !== layer.name) {
        }
    }

    // Reverse the order of layers
    reverseLayers(doc);

    // Make only the bottom layer visible and hide others
    var bottomLayer = doc.layers[doc.layers.length - 1];
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        layer.visible = (layer === bottomLayer);
    }

    // Define the path and filename for saving
    var desktopPath = createPSDFolder();
    var layerName = removeExtensions(bottomLayer.name);
    var filePath = desktopPath + "/" + layerName + ".psd";

    // Save the document as PSD
    savePSD(filePath);
}

// Function to save the document as PSD
function savePSD(filePath) {
    var psdOptions = new PhotoshopSaveOptions();
    psdOptions.embedColorProfile = true;
    psdOptions.alphaChannels = true;
    psdOptions.layers = true;


}

// Function to create PSD folder on desktop if it doesn't exist
function createPSDFolder() {
    var desktopPath = Folder.desktop + "/PSD";
    var folder = new Folder(desktopPath);
    if (!folder.exists) {
        folder.create();
    }
    return desktopPath;
}

// Run the main part of the script
main();