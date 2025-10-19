$(document).ready(function () {
  let t = 0;
  AOS.init({ duration: 800, once: !0, offset: 100 }),
    $(".card-container").on("click", function (e) {
      $(e.target).hasClass("next-page") ||
        (t++,
        1 === t &&
          ($(this).addClass("flipped"),
          setTimeout(function () {
            $(".card-front .text").css("opacity", "0");
          }, 150)));
    }),
    $(".next-page").on("click", function (t) {
      t.stopPropagation(),
        $(".card-container").addClass("folded"),
        $("#scroll-indicator").addClass("show"),
        (function () {
          const t = $(".gallery-grid"),
            e = 6,
            i = [
              "#ff6b6b",
              "#4ecdc4",
              "#45b7d1",
              "#96ceb4",
              "#feca57",
              "#ff9ff3",
            ];
          let n,
            a = 0;
          function s(t, e, i) {
            const n = t / e;
            if (i) {
              const t = 350;
              let e = 280,
                i = e / n;
              return i > t && ((i = t), (e = i * n)), { width: e, height: i };
            }
            {
              const t = 450;
              let e = 380,
                i = e / n;
              return i > t && ((i = t), (e = i * n)), { width: e, height: i };
            }
          }
          function o() {
            return window.innerWidth >= 768;
          }
          for (let n = 1; n <= e; n++) {
            const c = Math.floor(21 * Math.random()) - 10,
              r = i[Math.floor(Math.random() * i.length)],
              h = $("<div>", {
                class: "picture-frame",
                "data-aos": "fade-in",
                css: { transform: `rotate(${c}deg)` },
              }),
              d = $("<div>", {
                class: "picture-pin",
                css: { backgroundColor: r },
              }),
              l = $("<div>", { class: "image-container" }),
              f = new Image();
            (f.className = "frame-image"),
              (f.alt = `Image ${n}`),
              (f.onload = function () {
                const t = o(),
                  { width: i, height: n } = s(
                    this.naturalWidth,
                    this.naturalHeight,
                    !t
                  );
                $(this).css({ width: i + "px", height: n + "px" });
                const c = Math.max(30, 0.08 * i),
                  r = Math.max(45, 0.15 * n);
                h.css({ padding: `30px ${c}px ${r}px ${c}px` }),
                  a++,
                  a === e && AOS.refresh();
              }),
              (f.onerror = function () {
                const t = o(),
                  { width: i, height: n } = s(400, 300, !t);
                $(this).attr("src", "https://picsum.photos/400/300"),
                  $(this).css({ width: i + "px", height: n + "px" }),
                  a++,
                  a === e && AOS.refresh();
              }),
              (f.src = `./imgs/${n}.JPG`),
              l.append(f),
              h.append(d, l),
              t.append(h);
          }
          $(window).on("resize", function () {
            clearTimeout(n),
              (n = setTimeout(function () {
                $(".frame-image").each(function () {
                  const t = $(this),
                    e = t[0].naturalWidth || 400,
                    i = t[0].naturalHeight || 300,
                    n = o(),
                    { width: a, height: c } = s(e, i, !n);
                  t.css({ width: a + "px", height: c + "px" });
                  const r = t.closest(".picture-frame"),
                    h = Math.max(30, 0.08 * a),
                    d = Math.max(45, 0.15 * c);
                  r.css({ padding: `30px ${h}px ${d}px ${h}px` });
                }),
                  AOS.refresh();
              }, 250));
          });
        })(),
        $(".surprise-container").addClass("show"),
        AOS.refresh();
    }),
    $("#arrow").on("click", function (t) {
      t.preventDefault(),
        $("html, body").animate({ scrollTop: $("#imgs").offset().top }, 800),
        $("#scroll-indicator").removeClass("show"),
        setTimeout(function () {
          $("#scroll-indicator").hide();
        }, 500);
    });
});
