const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

const gallery = document.querySelector("#image-gallery");
const galleryCount = document.querySelector("#gallery-count");
const lightbox = document.querySelector("#image-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const flattenedImages = [];
let activeImageIndex = 0;

function createGalleryItem(image, index) {
  const figure = document.createElement("figure");
  figure.className = "gallery-item";
  figure.tabIndex = 0;
  figure.setAttribute("role", "button");
  figure.setAttribute("aria-label", `Xem ảnh lớn: ${image.alt || `BOD Racing Oil image ${index + 1}`}`);

  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt || `BOD Racing Oil image ${index + 1}`;
  img.loading = "lazy";
  img.decoding = "async";

  const caption = document.createElement("figcaption");
  caption.textContent = image.alt || `BOD Racing Oil image ${index + 1}`;

  figure.append(img, caption);
  figure.addEventListener("click", () => openLightbox(image.lightboxIndex));
  figure.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image.lightboxIndex);
    }
  });
  return figure;
}

function showLightboxImage(index) {
  if (!flattenedImages.length) return;
  activeImageIndex = (index + flattenedImages.length) % flattenedImages.length;
  const image = flattenedImages[activeImageIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || "BOD Racing Oil";
  lightboxCaption.textContent = image.alt || "";
}

function openLightbox(index) {
  if (!lightbox) return;
  showLightboxImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
}

if (gallery && Array.isArray(window.galleryCategories)) {
  const fragment = document.createDocumentFragment();
  let totalImages = 0;

  window.galleryCategories.forEach((category) => {
    const section = document.createElement("section");
    section.className = "gallery-category";

    const header = document.createElement("div");
    header.className = "gallery-category-header";

    const titleWrap = document.createElement("div");
    const major = document.createElement("p");
    major.className = "gallery-major";
    major.textContent = category.major || "BOD Racing Oil";

    const title = document.createElement("h3");
    title.textContent = category.title || "Hình ảnh";

    const count = document.createElement("span");
    count.textContent = `${category.images.length} hình`;

    titleWrap.append(major, title);
    header.append(titleWrap, count);

    const grid = document.createElement("div");
    grid.className = "image-gallery";

    category.images.forEach((image, index) => {
      image.lightboxIndex = flattenedImages.length;
      flattenedImages.push(image);
      grid.append(createGalleryItem(image, index));
    });

    totalImages += category.images.length;
    section.append(header, grid);
    fragment.append(section);
  });

  gallery.append(fragment);
  galleryCount.textContent = `${window.galleryCategories.length} nhóm / ${totalImages} hình ảnh`;
}

if (lightbox) {
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => showLightboxImage(activeImageIndex - 1));
  lightboxNext.addEventListener("click", () => showLightboxImage(activeImageIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showLightboxImage(activeImageIndex - 1);
    if (event.key === "ArrowRight") showLightboxImage(activeImageIndex + 1);
  });
}
