```javascript
// Initial storage in GB
let usedStorage = 2.4;
const totalStorage = 10;

// Update storage display
function updateStorage() {
    let percentage = (usedStorage / totalStorage) * 100;

    if (percentage > 100) {
        percentage = 100;
    }

    document.getElementById("progress").style.width =
        percentage + "%";

    document.getElementById("storageText").textContent =
        usedStorage.toFixed(2) + " GB / " + totalStorage + " GB";

    document.getElementById("storagePercentage").textContent =
        Math.round(percentage) + "% used";
}

// Upload a file
function uploadFile() {
    const input = document.getElementById("fileInput");
    const file = input.files[0];

    if (!file) {
        return;
    }

    // Convert bytes to MB
    const fileSizeMB = file.size / (1024 * 1024);

    // Convert MB to GB
    const fileSizeGB = fileSizeMB / 1024;

    // Check storage
    if (usedStorage + fileSizeGB > totalStorage) {
        alert("Not enough cloud storage!");
        input.value = "";
        return;
    }

    // Select file type
    let fileType = file.name.split(".").pop().toUpperCase();

    // Add icon according to file type
    let icon = "📄";

    if (
        fileType === "JPG" ||
        fileType === "JPEG" ||
        fileType === "PNG" ||
        fileType === "GIF"
    ) {
        icon = "🖼️";
    } else if (
        fileType === "MP4" ||
        fileType === "AVI" ||
        fileType === "MOV"
    ) {
        icon = "🎬";
    } else if (
        fileType === "MP3" ||
        fileType === "WAV"
    ) {
        icon = "🎵";
    }

    // Add file to storage
    usedStorage += fileSizeGB;

    const table = document.getElementById("fileList");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${icon} ${file.name}</td>
        <td>${fileType}</td>
        <td>${formatFileSize(file.size)}</td>
        <td>
            <button class="delete-btn"
                onclick="deleteFile(this, ${fileSizeGB})">
                Delete
            </button>
        </td>
    `;

    table.appendChild(row);

    updateStorage();

    alert("File uploaded successfully!");

    input.value = "";
}

// Delete a file
function deleteFile(button, size) {
    const row = button.closest("tr");

    row.remove();

    usedStorage -= size;

    if (usedStorage < 0) {
        usedStorage = 0;
    }

    updateStorage();
}

// Format file size
function formatFileSize(bytes) {
    if (bytes < 1024) {
        return bytes + " B";
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + " KB";
    }

    if (bytes < 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    }

    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
}

// Scroll to files section
function scrollToFiles() {
    document.getElementById("files").scrollIntoView({
        behavior: "smooth"
    });
}

// Initialize storage
updateStorage();
```
