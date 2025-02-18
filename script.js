document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const button = document.getElementById("download-images-button");

    const errorDiv = document.createElement("div");
    errorDiv.id = "error";
    errorDiv.style.color = "red";
    output.appendChild(errorDiv);

    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.innerHTML = "Loading...";
    loadingDiv.style.display = "none";
    output.appendChild(loadingDiv);

    const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" },
    ];

    function downloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load image: ${url}`);
        });
    }

    function downloadImages() {
        output.innerHTML = ""; // Clear previous content
        errorDiv.innerHTML = ""; // Clear error messages
        output.appendChild(loadingDiv);
        loadingDiv.style.display = "block"; // Show loading

        const promises = images.map(img => downloadImage(img.url));

        Promise.all(promises)
            .then(loadedImages => {
                loadingDiv.style.display = "none"; // Hide loading
                loadedImages.forEach(img => output.appendChild(img));
            })
            .catch(error => {
                loadingDiv.style.display = "none"; // Hide loading
                errorDiv.innerHTML = error; // Show error
                output.appendChild(errorDiv);
            });
    }

    button.addEventListener("click", downloadImages);
});
