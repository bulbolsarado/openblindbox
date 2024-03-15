// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    // Function to trigger the download
    function downloadWebsite() {
        // Create a zip file
        var zip = new JSZip();

        // Add all files to the zip
        zip.file("index.html", document.documentElement.outerHTML);
        zip.file("./assets/css/style.css", "/* Your CSS styles */");
        zip.file("./js/script.js", "/* Your JavaScript code */");
        // Add images
        var imgFolder = zip.folder("assets/images");
        imgFolder.file("image1.jpg", getBase64Image("image1.jpg"));
        imgFolder.file("image2.jpg", getBase64Image("image2.jpg"));
        // Add other files as needed

        // Generate the zip file
        zip.generateAsync({ type: "blob" }).then(function(content) {
            // Create a download link
            var link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = "appsvip.zip";
            link.click();
        });
    }

    // Function to convert image to base64
    function getBase64Image(imgName) {
        var img = new Image();
        img.src = "./assets/images/" + imgName;
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/jpeg");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    // Event listener for the download button
    var downloadButton = document.getElementById("downloadButton");
    downloadButton.addEventListener("click", downloadWebsite);
});
