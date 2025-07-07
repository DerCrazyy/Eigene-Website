// Bilder
const imageStack = document.querySelector('.image-stack');

const galleryImages = [
  '1.webp',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.webp'
];

// Bilder einfügen
galleryImages.forEach((filename, index) => {
  const img = document.createElement('img');
  img.src = `root/assets/pictures/${filename}`;
  img.alt = `Bild ${index + 1}`;
  img.classList.add('stacked');
  img.loading = 'lazy';
  imageStack.appendChild(img);
});

window.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.image-stack img.stacked'));
  let activeIndex = 0;

  function updateGallery() {
    images.forEach((img, i) => {
      img.classList.remove('focused', 'prev', 'next');

      if (i === activeIndex) {
        img.classList.add('focused');
      } else if (i === activeIndex - 1) {
        img.classList.add('prev');
      } else if (i === activeIndex + 1) {
        img.classList.add('next');
      }
    });
  }

  updateGallery();

  // Klick erlaubt nur auf das vorige/folgende Bild
  images.forEach((img, i) => {
    img.addEventListener('click', () => {
      if (i === activeIndex - 1 || i === activeIndex + 1) {
        activeIndex = i;
        updateGallery();
      }
    });
  });

  // Swipe-Unterstützung
  let touchStartX = 0;
  let touchEndX = 0;

  imageStack.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  imageStack.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 30) return;

    if (delta < 0 && activeIndex < images.length - 1) {
      activeIndex++;
      updateGallery();
    }

    if (delta > 0 && activeIndex > 0) {
      activeIndex--;
      updateGallery();
    }
  }
});
// Bilder
























let TRANSLATIONS = {};
let currentLang = "de";

// 🔁 Sprachdatei laden
async function loadTranslations(lang) {
  try {
    const res = await fetch("root/js/translations.json");
    const data = await res.json();
    TRANSLATIONS = data;
    currentLang = lang;
    applyTranslations();
  } catch (err) {
    console.error("Fehler beim Laden der translations.json:", err);
  }
}




function calculateSemester(startDate = "2023-10-01") {
    const now = new Date();
    const start = new Date(startDate);
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return Math.floor(months / 6) + 1;
  }

  
// 🧠 Translation anwenden
function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const value = TRANSLATIONS[currentLang]?.[key];
      if (!value) return;
  
      const parsed = typeof value === "string"
        ? value
            .replace("{{age}}", calculateAge("2004-02-08"))
            .replace("{{semester}}", calculateSemester())
        : value.map(item => `<li>${item}</li>`).join("");
  
      el.innerHTML = parsed; // ✅ DAS war bei dir gefehlt!
    });
  
    const title = TRANSLATIONS[currentLang]?.["page.title"];
    if (title) {
      document.title = title;
      const titleTag = document.getElementById("page-title");
      if (titleTag) titleTag.textContent = title;
    }
  }
  

// 📍 Sprache umschalten
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("preferredLang", lang);
  applyTranslations();
}

// 🎂 Alter berechnen
function calculateAge(birthDateStr) {
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

// 🚀 Hauptlogik
document.addEventListener("DOMContentLoaded", () => {
  const langSwitch = document.getElementById("lang-switch");
  const storedLang = localStorage.getItem("preferredLang") || "auto";
  const browserLang = navigator.language.split("-")[0];
  const autoLang = ["de", "at", "ch"].includes(browserLang) ? "de" : "en";
  const finalLang = storedLang === "auto" ? autoLang : storedLang;

  langSwitch.value = storedLang;
  loadTranslations(finalLang);
  langSwitch.addEventListener("change", () => {
    const selected = langSwitch.value;
    const lang = selected === "auto" ? autoLang : selected;
    switchLanguage(lang);
  });

  // 🌗 Theme wechseln
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    updateAmbient();
  });

  // 🎧 Ambient Sound
  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('ambient-sound');
  
    function playOnce() {
      audio.play().catch(err => {
        console.warn("Autoplay wurde vom Browser blockiert:", err);
      });
  
      document.removeEventListener('click', playOnce); // Nur 1x ausführen
    }
  
    document.addEventListener('click', playOnce);
  });
  



  // 📨 Formular
  const form = document.getElementById("contact-form");
  const success = document.getElementById("success-message");

  if (form && success) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      success.style.display = "block";
      setTimeout(() => {
        success.style.display = "none";
      }, 5000);
    });
  }

  
  
 
  
});
