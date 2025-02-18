document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const errorDiv = document.createElement("div");
  errorDiv.id = "error";
  errorDiv.style.color = "red";
  output.appendChild(errorDiv);

  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.innerHTML = "Loading...";
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
    errorDiv.innerHTML = ""; // Clear previous errors
    output.innerHTML = ""; // Clear previous images
    output.appendChild(loadingDiv); // Show loading

    const promises = images.map((img) => downloadImage(img.url));

    Promise.all(promises)
      .then((loadedImages) => {
        loadingDiv.style.display = "none"; // Hide loading
        loadedImages.forEach((img) => output.appendChild(img));
      })
      .catch((error) => {
        loadingDiv.style.display = "none"; // Hide loading
        errorDiv.innerHTML = error; // Show error
        output.appendChild(errorDiv);
      });
  }

  // Automatically start downloading images when the page loads
  downloadImages();
});
