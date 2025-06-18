# Studex Frontend

Интерфейсная часть проекта **Studex** — платформы  для оценки учебных дисциплин, позволяющий студентам оставлять отзывы и оценки по предметам, а администраторам управлять системой.

## 📦 Технологии

- **React**
- **Vite**
- **React Router**
- **Redux Toolkit**
- **RTK Query**
    

## 📁 Структура проекта

```plaintext
studex_frontend/
├── public/                        # Статические файлы
├── src/
│   ├── api/                       # Запросы к backend API
│   ├── app/                       # хранилище Redux
│   ├── assets/                    # Изображения
│   ├── components/                # Переиспользуемые UI-компоненты
│   ├── features/                  # Redux-слайсы
│   ├── hooks/                     # Кастомные React-хуки
│   ├── routes/                    # Файлы маршрутов (React Router)
│   ├── styles/                    # Глобальные css стили
│   ├── utils/                     # Утилиты и вспомогательные функции
│   ├── const.js                   # Константы
│   └── main.jsx                   # Точка входа в приложение
```


## 🚀 Быстрый старт

### 1. Клонируйте репозиторий

```bash
git clone git@github.com:Somnitelno-no-okeey/studex_frontend.git .
```

### 2. Установите зависимости

```bash
npm install
```

### 3. Запустите проект

```bash
npm run dev
```

Приложение будет доступно по адресу:  
👉 [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Переменные окружения

Создайте `.env` файл в корне проекта:

```env
VITE_API_URL=http://localhost:8000/
```

Если вы используете продакшен-сервер, укажите его URL вместо `localhost`.
