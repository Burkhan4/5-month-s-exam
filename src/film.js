document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    if (document.getElementById("desktop-h1")) {
      document.getElementById("desktop-h1").textContent = "Film topilmadi";
    }
    if (document.getElementById("desktop-p-2")) {
      document.getElementById("desktop-p-2").textContent =
        "ID parametri yo'q. Iltimos, ro'yxatdan tanlang.";
    }
    return;
  }

  const mobH1 = document.getElementById("mob-h1");
  const mobP1 = document.getElementById("mob-p-1");
  const mobP2 = document.getElementById("mob-p-2");
  const mobBg = document.getElementById("mob-bg");

  const apiUrl = `https://api.imdbapi.dev/titles/${movieId}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API xatosi: ${response.status} - Film topilmadi`);
      }
      return response.json();
    })
    .then((data) => {
      if (document.getElementById("desktop-h1")) {
        document.getElementById("desktop-h1").textContent =
          data.originalTitle || data.primaryTitle || "Noma'lum sarlavha";
      }

      if (document.getElementById("desktop-p-1")) {
        document.getElementById("desktop-p-1").textContent =
          ` ${data.startYear || "N/A"}`;
      }

      if (document.getElementById("desktop-p-2")) {
        document.getElementById("desktop-p-2").textContent =
          data.plot || "Syujet mavjud emas.";
      }

      const desktopSection = document.getElementById("desktop-section");
      if (desktopSection && data.primaryImage?.url) {
        desktopSection.style.backgroundImage = `url('${data.primaryImage.url}')`;
        desktopSection.style.backgroundRepeat = "repeat-x";
        desktopSection.style.backgroundSize = "auto 100%";
        desktopSection.style.backgroundPosition = "center top";
      }

      if (mobH1) {
        mobH1.textContent =
          data.originalTitle || data.primaryTitle || "Noma'lum";
      }

      if (mobP1) {
        mobP1.textContent = ` ${data.startYear || "N/A"}`;
      }

      if (mobP2) {
        mobP2.textContent = data.plot || "Syujet mavjud emas.";
      }

      if (mobBg && data.primaryImage?.url) {
        mobBg.style.backgroundImage = `url('${data.primaryImage.url}')`;
        mobBg.style.backgroundRepeat = "repeat-x";
        mobBg.style.backgroundSize = "auto 100%";
        mobBg.style.backgroundPosition = "center top";
      }

      document.title =
        (data.originalTitle || data.primaryTitle || "Film") + " | onAir";
    })
    .catch((err) => {
      console.error("Film yuklashda xato:", err);

      if (document.getElementById("desktop-h1")) {
        document.getElementById("desktop-h1").textContent = "Xato yuz berdi";
      }
      if (document.getElementById("desktop-p-2")) {
        document.getElementById("desktop-p-2").textContent =
          "Film ma'lumotlari yuklanmadi. Internet aloqasini tekshiring.";
      }

      if (mobH1) mobH1.textContent = "Xato";
      if (mobP2) mobP2.textContent = "Ma'lumot yuklanmadi.";
    });
});
