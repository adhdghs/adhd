document.addEventListener("DOMContentLoaded", () => {
    console.log("Asuogyaman Health Directorate website loaded");
});
/* Hero Slider
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 5000);
*/
const header = document.getElementById("mainHeader");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-bar ul");

let lastScrollY = window.scrollY;

// Header height compensation
function updateHeaderHeight() {
    document.documentElement.style.setProperty(
        "--header-height",
        header.offsetHeight + "px"
    );
}

updateHeaderHeight();
window.addEventListener("resize", updateHeaderHeight);

// Scroll behavior
window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 120) {
        header.classList.add("hide");
        navMenu.classList.remove("show");
    } else {
        header.classList.remove("hide");
    }
    lastScrollY = window.scrollY;
});

// Menu toggle
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});


//LATEST NEWS & UPDATES with Read More
fetch("data/news.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("newsContainer");

    data.forEach((item, index) => {
      const shortText = item.content.slice(0, 60);
      const isLong = item.content.length > 60;

      container.innerHTML += `
        <article class="news-links">
          <a href="${item.link}" class="news-link">
            <h4>${item.title}</h4>
            <small>${item.date}</small>
          </a>

          <!-- Insert Image -->
          <img src="${item.image}" alt="${item.title}" class="news-image" />
          
          <p>
            <span id="short-${index}">${shortText}${isLong ? "..." : ""}</span>
            <span id="full-${index}" style="display:none;">
              ${item.content}
            </span>
          </p>
          ${isLong ? `
            <button class="read-more" onclick="toggleReadMore(${index})">
              Read More
            </button>
          ` : ""}
        </article>
      `;
    });
  });

// Function to toggle "Read More" and "Read Less"
function toggleReadMore(index) {
  const shortText = document.getElementById(`short-${index}`);
  const fullText = document.getElementById(`full-${index}`);
  const button = event.target;

  const isOpen = fullText.style.display === "inline";

  fullText.style.display = isOpen ? "none" : "inline";
  shortText.style.display = isOpen ? "inline" : "none";
  button.textContent = isOpen ? "Read More" : "Read Less";
}

/* Hero Slider */
fetch("data/news.json")
  .then(res => res.json())
  .then(data => {
    const heroSlider = document.querySelector(".hero-slider");
    
    // Clear existing slides (if any)
    heroSlider.innerHTML = '';

    // Create slides dynamically for each news item
    data.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");

      // Set background image
      slide.style.backgroundImage = `url(${item.image})`;

      // Create overlay with title and subtitle
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");

      const title = document.createElement("h2");
      title.textContent = item.title;

      const subtitle = document.createElement("p");
      subtitle.textContent = item.content.slice(0, 100) + "...";  // Show first 100 characters

      // Create Read More button
      const readMoreButton = document.createElement("a");
      readMoreButton.classList.add("read-more");
      readMoreButton.href = item.link; // Link to full article
      readMoreButton.textContent = "Read More";

      // Append title, subtitle, and button to overlay
      overlay.appendChild(title);
      overlay.appendChild(subtitle);
      overlay.appendChild(readMoreButton);

      // Append overlay to slide
      slide.appendChild(overlay);

      // Append slide to hero slider
      heroSlider.appendChild(slide);
    });

    // Make the first slide active
    const slides = document.querySelectorAll(".hero-slider .slide");
    slides[0].classList.add('active');

    // Create dots based on the number of slides
    const sliderDotsContainer = document.querySelector(".slider-dots");
    sliderDotsContainer.innerHTML = ''; // Clear existing dots (if any)

    slides.forEach((slide, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.setAttribute("data-slide", index); // Set slide index to each dot
      if (index === 0) {
        dot.classList.add("active"); // Set the first dot as active
      }
      sliderDotsContainer.appendChild(dot);
    });

    // Function to update the active dot
    function updateDots() {
      const dots = document.querySelectorAll('.slider-dots .dot');
      dots.forEach(dot => dot.classList.remove('active')); // Remove active class from all dots
      dots[currentIndex].classList.add('active'); // Add active class to the current dot
    }

    let currentIndex = 0;

    // Slide change functions
    function changeSlide() {
      // Remove 'active' class from all slides
      slides.forEach(slide => slide.classList.remove("active"));
      
      // Add 'active' class to the next slide
      currentIndex = (currentIndex + 1) % slides.length;  // Loop back to 0 after the last slide
      slides[currentIndex].classList.add("active");

      // Update the dots
      updateDots();
    }

    // Manual navigation with prev and next buttons
    const prevButton = document.querySelector(".prev-slide");
    const nextButton = document.querySelector(".next-slide");

    function prevSlide() {
      // Remove 'active' class from all slides
      slides.forEach(slide => slide.classList.remove("active"));
      
      // Go to the previous slide
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      slides[currentIndex].classList.add("active");

      // Update the dots
      updateDots();
    }

    function nextSlide() {
      // Remove 'active' class from all slides
      slides.forEach(slide => slide.classList.remove("active"));
      
      // Go to the next slide
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");

      // Update the dots
      updateDots();
    }

    // Listen for manual slide changes (Prev and Next buttons)
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
    
    // Listen for dot clicks
    const dots = document.querySelectorAll('.slider-dots .dot');
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        currentIndex = parseInt(dot.getAttribute("data-slide"));
        slides.forEach(slide => slide.classList.remove("active"));
        slides[currentIndex].classList.add("active");

        // Update the dots
        updateDots();
      });
    });

    // Change slide every 5 seconds
    setInterval(changeSlide, 5000);
  })
  .catch(error => {
    console.error("Error loading news data:", error);
  });


/* Latest News & Update in news.html & index.html as draft
fetch("data/news.json")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("newsContainer");
        data.forEach(item => {
            container.innerHTML += `
                <article>
                    <h4>${item.title}</h4>
                    <small>${item.date}</small>
                    <p>${item.content}</p>
                </article>
            `;
        });
    });
*/
/*
fetch("data/news.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("newsContainer");

    data.forEach((item, index) => {
      const shortText = item.content.slice(0, 60);
      const isLong = item.content.length > 60;

      container.innerHTML += `
        <article class="news-item">
          <a href="${item.link}" class="news-link">
            <h4>${item.title}</h4>
            <small>${item.date}</small>
          </a>
          <p>
            <span id="short-${index}">${shortText}${isLong ? "..." : ""}</span>
            <span id="full-${index}" style="display:none;">
              ${item.content}
            </span>
          </p>
          ${isLong ? `
            <button class="read-more" onclick="toggleReadMore(${index})">
              Read More
            </button>
          ` : ""}
        </article>
      `;
    });
  });

// Function to toggle "Read More" and "Read Less"
function toggleReadMore(index) {
  const shortText = document.getElementById(`short-${index}`);
  const fullText = document.getElementById(`full-${index}`);
  const button = event.target;

  const isOpen = fullText.style.display === "inline";

  fullText.style.display = isOpen ? "none" : "inline";
  shortText.style.display = isOpen ? "inline" : "none";
  button.textContent = isOpen ? "Read More" : "Read Less";
}
*/


/*
fetch("data/news.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("newsContainer");

    data.forEach((item, index) => {
      const shortText = item.content.slice(0, 60);
      const isLong = item.content.length > 60;

      container.innerHTML += `
        <article class="news-links">
          <h4>${item.title}</h4>
          <small>${item.date}</small>
          <p>${shortText}${isLong ? "..." : ""}</p>
          <small><b><a href="${item.link}" class="read-more-link">Read More</a></b></small>
        </article>
      `;
    });
  });
  */
