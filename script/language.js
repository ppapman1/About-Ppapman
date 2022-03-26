import Cookies from "../library/js.cookie.min.mjs";

window.onload = () => {
  const languageSelector = $("#lang-select");

  const getLanguage = () => {
    if (Cookies.get("language")) return Cookies.get("language");

    const clientLanguage = navigator.language || navigator.userLanguage;
    return clientLanguage === "ko-KR" ? "ko-KR" : "ja-JP";
  };

  const setLanguage = (languageName) => {
    Cookies.set("language", languageName);

    import(`../lang/${languageName}.js`)
      .then((lang) => {
        $("#loading").css("visibility", "visible");

        const changeNodeList = Array.prototype.slice.call(
          document.querySelectorAll("[data-detect]")
        );

        changeNodeList.map((v) => {
          try {
            let text;
            if (v.dataset.detect.includes(".")) {
              const [firstKey, secondKey, thirdKey] =
                v.dataset.detect.split(".");

              if (thirdKey) {
                text = lang.default[firstKey][secondKey][thirdKey];
              } else {
                text = lang.default[firstKey][secondKey];
              }
            } else {
              text = lang.default[v.dataset.detect];
            }

            v.textContent = text;
          } catch (e) {
            console.error(e);
            if (e instanceof TypeError) {
              v.textContent =
                lang.default.error.noSentence + "(" + v.dataset.detect + ")";
            }
          }
        });
      })
      .then(() => {
        $("#loading").css("visibility", "hidden");
      });

    languageSelector.val(languageName);
  };

  const initLanguage = () => {
    window.getLanguage = getLanguage;
    window.setLanguage = setLanguage;

    setLanguage(getLanguage());

    languageSelector.on("change", (e) => {
      setLanguage(e.target.value);
    });
  };

  initLanguage();
};
