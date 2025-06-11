document.addEventListener("DOMContentLoaded", () => {
    const coffeeContainer = document.querySelector(".coffee-cup-container");
    const spillArea = document.querySelector(".spill-area");
    const iceCubes = document.querySelectorAll(".ice-cube");
    const projectBox = document.querySelector(".project-box");
    const overlay = document.querySelector(".project-overlay");
    const overlayClose = document.querySelector(".overlay-close");
  
    coffeeContainer.addEventListener("click", () => {
      coffeeContainer.classList.remove("fade-out", "fade-down");
      void coffeeContainer.offsetWidth;
      coffeeContainer.classList.add("fade-out");
  
      setTimeout(() => {
        coffeeContainer.style.display = "none";
        spillArea.classList.remove("hidden", "slide-out");
        void spillArea.offsetWidth;
        spillArea.classList.add("show");
        spillArea.style.display = "block";
      }, 1000);
    });
  
    spillArea.addEventListener("click", () => {
      spillArea.classList.remove("show");
      void spillArea.offsetWidth;
      spillArea.classList.add("slide-out");
  
      setTimeout(() => {
        spillArea.style.display = "none";
        coffeeContainer.style.display = "block";
        coffeeContainer.classList.remove("fade-out", "fade-down");
        void coffeeContainer.offsetWidth;
        coffeeContainer.classList.add("fade-down");
      }, 1000);
    });
  
    iceCubes.forEach((cube) => {
      cube.addEventListener("click", (e) => {
        e.stopPropagation();
  
        spillArea.classList.add("fade-out");
        setTimeout(() => {
          spillArea.style.display = "none";
        }, 500);
  
        iceCubes.forEach((ic) => {
          if (ic !== cube) {
            ic.style.display = "none";
          }
        });
  
        cube.classList.add("clicked");
  
        const overlayCube = document.getElementById("activeCube");
        const projectTitle = document.getElementById("projectTitle");
        const projectText = document.getElementById("projectText");
        const projectVideo = document.getElementById("projectVideo");
  
        setTimeout(() => {
          overlay.classList.remove("hidden");
          overlay.classList.add("show");
  
          overlayCube.src = cube.src;
          overlayCube.style.display = "block";
  
          if (projectTitle && projectText && projectVideo) {
            projectTitle.textContent = cube.getAttribute("data-title") || "";
            projectText.innerHTML = cube.getAttribute("data-text") || "";
            const videoSource = projectVideo.querySelector("source");
            if (videoSource) {
              videoSource.src = cube.getAttribute("data-video") || "";
              projectVideo.load();
            }
          }
        }, 500);
      });
    });
  
    const overlayCube = document.getElementById("activeCube");
    overlayCube.addEventListener("click", () => {
      overlay.classList.remove("show");
      overlay.classList.add("hidden");
  
      const clickedCube = document.querySelector(".ice-cube.clicked");
      if (clickedCube) {
        clickedCube.classList.remove("clicked");
      }
  
      iceCubes.forEach((ic) => {
        ic.style.display = "block";
      });
  
      setTimeout(() => {
        spillArea.classList.remove("slide-out", "fade-out");
        spillArea.classList.add("show");
        spillArea.style.display = "block";
      }, 500);
    });
  
    overlayClose.addEventListener("click", () => {
      overlay.classList.remove("show");
      overlay.classList.add("hidden");
  
      const clickedCube = document.querySelector(".ice-cube.clicked");
      if (clickedCube) {
        clickedCube.classList.remove("clicked");
      }
  
      iceCubes.forEach((ic) => {
        ic.style.display = "block";
      });
  
      setTimeout(() => {
        overlay.classList.remove("show");
        projectBox.classList.remove("show");
        spillArea.classList.remove("slide-out");
        spillArea.classList.remove("fade-out");
        spillArea.classList.add("show");
        spillArea.style.display = "block";
      }, 500);
    });
  
    const hint = document.querySelector(".overlay-hint");
    if (hint) {
      const text = hint.textContent.trim();
      hint.innerHTML = text
        .split("")
        .map((char, i) => `<span style="animation-delay:${i * 0.05}s">${char}</span>`)
        .join("");
    }
  });
  