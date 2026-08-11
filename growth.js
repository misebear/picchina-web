(() => {
  const playUrl =
    "https://play.google.com/store/apps/details?id=com.bodeum.chinesestudyhelper&utm_source=picchina_web&utm_medium=owned&utm_campaign=ko_school_launch";
  const footer = document.querySelector("footer");
  if (!footer) return;

  const band = document.createElement("aside");
  band.className = "play-install-band";
  band.setAttribute("aria-label", "Android 앱 설치");
  band.innerHTML = `
    <p><strong>교과서·학습지를 직접 찍고 복습하려면</strong><br />Android 앱에서 병음·뜻·발음·퀴즈 흐름을 이용하세요.</p>
    <a class="play-install-button" href="${playUrl}" target="_blank" rel="noopener noreferrer">Google Play에서 무료 설치</a>
  `;
  footer.before(band);

  band.querySelector("a")?.addEventListener("click", () => {
    const key = "picchina.growth.play_store_click";
    const count = Number.parseInt(localStorage.getItem(key) || "0", 10) + 1;
    localStorage.setItem(key, String(count));
    console.info(`[PicChinaGrowth] event=play_store_click count=${count}`);
  });
})();
