# Инструкция по запуску и описанию кода

## Запуск проекта через localhost

### 1. Требования
- Веб-сервер (Apache, Nginx, или встроенный сервер PHP/Python)
- Современный браузер с поддержкой ES6+

### 3. Способы запуска

**Способ 1: Встроенный PHP сервер**
```bash
php -S localhost:8000
```

**Способ 2: Встроенный Python сервер**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Способ 3: Node.js сервер**
```bash
npx http-server -p 8000
```

**Способ 4: Live Server (VS Code extension)**
- Установите расширение "Live Server"
- Правой кнопкой на index.html → "Open with Live Server"

### 4. Проверка работы
Откройте в браузере: `http://localhost:8000`, либо на любом другом свободном



#### SCSS структура:

**Основные файлы:**
- `fonts.scss` - настройки шрифтов
- `variables.scss` - переменные цветов, размеров
- `reboot.scss` - сброс стилей браузера
- `mixins.scss` - миксины для адаптива
- `buttons.scss` - стили кнопок
- `utilities.scss` - вспомогательные классы
- `adaptive.scss` - адаптивные стили

**Брейкпоинты:**
- `@include mobile` - до 620px
- `@include tablet` - до 820px  
- `@include small-mobile` - до 520px
- `@include extra-small-mobile` - до 377px

### Данные в data.json


### Поддерживаемые браузеры

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Проект готов к использованию в production-среде после минификации и оптимизации ресурсов
sass --style=compressed scss/style.scss css/style.min.css