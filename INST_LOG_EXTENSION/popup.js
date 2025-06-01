document.addEventListener('DOMContentLoaded', function() {
    const checkNowBtn = document.getElementById('checkNow');
    const currentStatusEl = document.getElementById('currentStatus');
    const lastUpdateEl = document.getElementById('lastUpdate');
    const userStatusEl = document.getElementById('userStatus');
    
    // Функция для обновления времени последней проверки
    function updateLastUpdateTime() {
        const now = new Date();
        lastUpdateEl.textContent = now.toLocaleString();
    }
    
    // Функция для обновления статуса в интерфейсе
    function updateStatus(isOnline, message = '') {
        if (isOnline) {
            currentStatusEl.textContent = 'Онлайн';
            currentStatusEl.className = 'status-value online';
            userStatusEl.textContent = message || 'Пользователь онлайн';
            userStatusEl.className = 'status-value online';
        } else {
            currentStatusEl.textContent = 'Оффлайн';
            currentStatusEl.className = 'status-value offline';
            userStatusEl.textContent = message || 'Пользователь оффлайн';
            userStatusEl.className = 'status-value offline';
        }
        updateLastUpdateTime();
    }
    
    // Функция для проверки статуса
    function checkStatus() {
        currentStatusEl.textContent = 'Проверяем...';
        currentStatusEl.className = 'status-value';
        
        // Отправляем сообщение content script для проверки статуса
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const activeTab = tabs[0];
            
            // Проверяем, что находимся на сайте Instagram
            if (!activeTab.url.includes('instagram.com')) {
                updateStatus(false, 'Откройте страницу Instagram');
                return;
            }
            
            chrome.tabs.sendMessage(activeTab.id, {action: 'checkStatus'}, function(response) {
                if (chrome.runtime.lastError) {
                    console.error('Ошибка при проверке статуса:', chrome.runtime.lastError);
                    updateStatus(false, 'Ошибка: ' + chrome.runtime.lastError.message);
                    return;
                }
                
                if (response && response.status) {
                    updateStatus(response.status === 'online', 
                               response.status === 'online' ? 'Пользователь онлайн' : 'Пользователь оффлайн');
                }
            });
        });
    }
    
    // Обработчик кнопки проверки
    checkNowBtn.addEventListener('click', checkStatus);
    
    // Обработчик сообщений от background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'updateStatus') {
            updateStatus(message.isOnline, message.message);
        }
    });
    
    // Загружаем сохраненное состояние расширения
    chrome.storage.sync.get(['isActive'], function(result) {
        const isActive = result.isActive !== false; // По умолчанию включено
        if (isActive) {
            checkStatus();
        } else {
            updateStatus(false, 'Расширение отключено');
        }
    });
    
    // Обновляем время последней проверки при открытии
    updateLastUpdateTime();
});
