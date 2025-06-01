// Обработчик сообщений от content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === "online") {
    console.log("Обнаружена активность, отправка данных в Google Apps Script");

    const url =
      "https://script.google.com/macros/s/AKfycbyHjlTywejudR-tU7V8IP5gA6xOza85UNWP-v1aO9v4QeV51ItZrVKdD_9bFtt6gquaKA/exec";
    const params = {
      messenger: "Telegram",
      timestamp: new Date(),
      status: "ONLINE",
    };

    // Используем fetch с mode: 'no-cors' для обхода CORS
    fetch(`${url}?${new URLSearchParams(params)}`, {
      method: "GET",
      mode: "no-cors",
    })
      .then(() => {
        console.log(
          `${params.timestamp} : Данные успешно отправлены в Google Apps Script`
        );
        // Обновляем статус в popup
        updatePopupStatus(true);
      })
      .catch((error) => {
        console.error(
          "Ошибка при отправке данных в Google Apps Script:",
          error
        );
        updatePopupStatus(false, error.message);
      });
  } else if (message.action === "updateStatus") {
    // Пересылаем статус в popup
    updatePopupStatus(message.isOnline, message.message);
  }

  // Возвращаем true для асинхронного ответа, если нужно
  return true;
});

// Функция для обновления статуса в popup
function updatePopupStatus(isOnline, errorMessage = "") {
  // Отправляем сообщение всем popup'ам
  chrome.runtime
    .sendMessage({
      action: "updateStatus",
      isOnline,
      message: errorMessage || (isOnline ? "Онлайн" : "Оффлайн"),
      timestamp: new Date().toISOString(),
    })
    .catch((error) => {
      console.info("Ошибка при обновлении статуса в popup:", error);
    });
}

// Обработчик обновления вкладки
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Если вкладка полностью загружена и это Telegram
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("web.telegram.org")
  ) {
    console.log("Вкладка Telegram обновлена, проверяем активность");
    // Отправляем сообщение content script для проверки активности
    chrome.tabs.sendMessage(tabId, { action: "checkStatus" });
  }
});
