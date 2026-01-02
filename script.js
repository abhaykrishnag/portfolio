function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

  function toggleCertifications() {
    var moreCerts = document.getElementById("moreCerts");
    var btn = document.getElementById("seeMoreBtn");
    if (moreCerts.style.display === "none") {
      moreCerts.style.display = "block";
      btn.innerText = "See Less";
    } else {
      moreCerts.style.display = "none";
      btn.innerText = "See More";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links li a");
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 50, 
            behavior: "smooth",
          });
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); 
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", function () {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
});

  