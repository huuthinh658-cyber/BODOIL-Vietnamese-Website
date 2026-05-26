const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

const gallery = document.querySelector("#image-gallery");
const galleryCount = document.querySelector("#gallery-count");

function createGalleryItem(image, index) {
  const figure = document.createElement("figure");
  figure.className = "gallery-item";

  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt || `BOD Racing Oil image ${index + 1}`;
  img.loading = "lazy";
  img.decoding = "async";

  const caption = document.createElement("figcaption");
  caption.textContent = image.alt || `BOD Racing Oil image ${index + 1}`;

  figure.append(img, caption);
  return figure;
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
      grid.append(createGalleryItem(image, index));
    });

    totalImages += category.images.length;
    section.append(header, grid);
    fragment.append(section);
  });

  gallery.append(fragment);
  galleryCount.textContent = `${window.galleryCategories.length} nhóm / ${totalImages} hình ảnh`;
}
