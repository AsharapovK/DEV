let isExtensionActive = false;
let checkInterval;
let activityDetected = false;
const CHECK_INTERVAL_MS = 60000; // 1 минута

// Функция для отправки статуса в background
function sendStatusToBackground(isOnline, message = "") {
  chrome.runtime
    .sendMessage({
      action: "updateStatus",
      isOnline,
      message:
        message ||
        (isOnline ? "Обнаружена активность" : "Активность не обнаружена"),
    })
    .catch((error) => {
      console.error("Ошибка при отправке статуса:", error);
    });
}

// Функция для проверки статуса
function checkForActivity() {
  try {
    const elements = document.querySelectorAll("span");
    for (const el of elements) {
      if (el.classList.contains("status") && el.classList.contains("online")) {
        if (!activityDetected) {
          console.log("Активность обнаружена");
          activityDetected = true;
          sendStatusToBackground(true);
        }
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Ошибка при проверке активности:", error);
    sendStatusToBackground(false, `Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для запуска проверки активности
function startActivityCheck() {
  if (!checkInterval) {
    console.log("Запуск ежеминутной проверки активности");

    // Проверяем активность каждую секунду
    const fastCheckInterval = setInterval(() => {
      if (
        isExtensionActive &&
        window.location.href.includes("web.telegram.org")
      ) {
        checkForActivity();
      }
    }, 1000);

    // Раз в минуту проверяем, была ли активность и отправляем данные
    checkInterval = setInterval(() => {
      if (activityDetected) {
        console.log("Отправка данных о найденной активности");
        chrome.runtime.sendMessage({ status: "online" });
        activityDetected = false; // Сбрасываем флаг после отправки
      } else {
        console.log("Активность не обнаружена за последнюю минуту");
        sendStatusToBackground(false, "Активность не обнаружена");
      }
    }, CHECK_INTERVAL_MS);

    // Очищаем быструю проверку при остановке
    return () => {
      clearInterval(fastCheckInterval);
      clearInterval(checkInterval);
      checkInterval = null;
    };
  }
  return () => {}; // Пустая функция, если проверка не запускалась
}

// Обработчик сообщений от popup и background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkStatus") {
    if (!window.location.href.includes("web.telegram.org")) {
      const errorMsg = "Not on Telegram";
      sendStatusToBackground(false, errorMsg);
      sendResponse({ status: "error", message: errorMsg });
      return true;
    }

    const isActive = checkForActivity();
    const status = isActive ? "online" : "offline";
    sendStatusToBackground(isActive);
    sendResponse({ status });
    return true;
  } else if (request.action === "toggleExtension") {
    isExtensionActive = request.isActive;
    let cleanup = () => {};

    if (isExtensionActive) {
      cleanup = startActivityCheck();
      sendStatusToBackground(false, "Проверка активности запущена");
    } else {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      console.log("Проверка активности остановлена");
      sendStatusToBackground(false, "Проверка активности остановлена");
    }

    // Сохраняем функцию очистки для вызова при остановке
    if (window.activityCleanup) {
      window.activityCleanup();
    }
    window.activityCleanup = cleanup;

    sendResponse({ success: true });
    return true;
  }
});

// Инициализация при загрузке
chrome.storage.sync.get(["isActive"], function (result) {
  isExtensionActive = result.isActive !== false;
  if (isExtensionActive) {
    console.log("Расширение активировано, запускаем проверку");
    window.activityCleanup = startActivityCheck();
    sendStatusToBackground(false, "Расширение активировано");
  }
});

// Очистка при выгрузке страницы
window.addEventListener("unload", () => {
  if (window.activityCleanup) {
    window.activityCleanup();
  }
  if (checkInterval) {
    clearInterval(checkInterval);
  }
});
