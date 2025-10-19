$(document).ready(function () {
  let clickCount = 0;

  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });

  $(".card-container").on("click", function (e) {
    if (!$(e.target).hasClass("next-page")) {
      clickCount++;

      if (clickCount === 1) {
        $(this).addClass("flipped");

        setTimeout(function () {
          $(".card-front .text").css("opacity", "0");
        }, 150);
      }
    }
  });

  $(".next-page").on("click", function (e) {
    e.stopPropagation();
    $(".card-container").addClass("folded");
    onFolded();
  });

  $("#arrow").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $("#imgs").offset().top,
      },
      800
    );
    $("#scroll-indicator").removeClass("show");
    setTimeout(function () {
      $("#scroll-indicator").hide();
    }, 500);
  });

  function onFolded() {
    $("#scroll-indicator").addClass("show");
    generateImageGallery();
  }

  function generateImageGallery() {
    const galleryGrid = $(".gallery-grid");
    const imageCount = 6;

    const pinColors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
    ];

    let loadedImages = 0;

    function calculateImageSize(naturalWidth, naturalHeight, isMobile) {
      const aspectRatio = naturalWidth / naturalHeight;

      if (isMobile) {
        // Mobile - smaller max dimensions
        const maxWidth = 280;
        const maxHeight = 350;

        let width = maxWidth;
        let height = width / aspectRatio;

        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        return { width, height };
      } else {
        // Desktop - larger max dimensions
        const maxWidth = 380;
        const maxHeight = 450;

        let width = maxWidth;
        let height = width / aspectRatio;

        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        return { width, height };
      }
    }

    function checkViewport() {
      return window.innerWidth >= 768; // 768px is our mobile breakpoint
    }

    for (let i = 1; i <= imageCount; i++) {
      const randomRotation = Math.floor(Math.random() * 21) - 10;

      const randomColor =
        pinColors[Math.floor(Math.random() * pinColors.length)];

      const frame = $("<div>", {
        class: "picture-frame",
        "data-aos": "fade-in",
        css: {
          transform: `rotate(${randomRotation}deg)`,
        },
      });

      const pin = $("<div>", {
        class: "picture-pin",
        css: {
          backgroundColor: randomColor,
        },
      });

      const imageContainer = $("<div>", {
        class: "image-container",
      });

      const img = new Image();
      img.className = "frame-image";
      img.alt = `Image ${i}`;

      img.onload = function () {
        const isDesktop = checkViewport();
        const { width, height } = calculateImageSize(
          this.naturalWidth,
          this.naturalHeight,
          !isDesktop
        );

        $(this).css({
          width: width + "px",
          height: height + "px",
        });

        // Also adjust the frame padding based on image size for better visual balance
        const framePaddingHorizontal = Math.max(30, width * 0.08);
        const framePaddingBottom = Math.max(45, height * 0.15);

        frame.css({
          padding: `30px ${framePaddingHorizontal}px ${framePaddingBottom}px ${framePaddingHorizontal}px`,
        });

        loadedImages++;
        if (loadedImages === imageCount) {
          AOS.refresh();
        }
      };

      img.onerror = function () {
        // Fallback to placeholder with appropriate size
        const isDesktop = checkViewport();
        const { width, height } = calculateImageSize(400, 300, !isDesktop);

        $(this).attr("src", "https://picsum.photos/400/300");
        $(this).css({
          width: width + "px",
          height: height + "px",
        });

        loadedImages++;
        if (loadedImages === imageCount) {
          AOS.refresh();
        }
      };

      img.src = `./imgs/${i}.JPG`;

      imageContainer.append(img);
      frame.append(pin, imageContainer);
      galleryGrid.append(frame);
    }

    // Handle window resize to adjust image sizes
    let resizeTimeout;
    $(window).on("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        $(".frame-image").each(function () {
          const $img = $(this);
          const naturalWidth = $img[0].naturalWidth || 400;
          const naturalHeight = $img[0].naturalHeight || 300;
          const isDesktop = checkViewport();
          const { width, height } = calculateImageSize(
            naturalWidth,
            naturalHeight,
            !isDesktop
          );

          $img.css({
            width: width + "px",
            height: height + "px",
          });

          // Adjust frame padding
          const frame = $img.closest(".picture-frame");
          const framePaddingHorizontal = Math.max(30, width * 0.08);
          const framePaddingBottom = Math.max(45, height * 0.15);

          frame.css({
            padding: `30px ${framePaddingHorizontal}px ${framePaddingBottom}px ${framePaddingHorizontal}px`,
          });
        });

        AOS.refresh();
      }, 250);
    });
  }
});
