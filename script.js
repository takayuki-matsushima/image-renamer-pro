
function renameFiles() {
  const input = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  let count = 1;
  for (const file of input.files) {
    const padded = String(count).padStart(5, '0');
    const newName = `photo${padded}.webp`;
    const li = document.createElement("li");
    li.textContent = `${file.name} → ${newName}`;
    fileList.appendChild(li);
    count++;
  }
}
