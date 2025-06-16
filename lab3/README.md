
# 📚 Lab3 – Aplikacja Biblioteka z React, Firebase i Reducerem

**Lab3** to nowoczesna aplikacja webowa typu biblioteka, zbudowana w oparciu o **React**, **React Router**, **Firebase Firestore**, i **Cypress** do testów. Projekt wspiera logowanie Google, zarządzanie książkami, filtrowanie, edycję, usuwanie, a także dodawanie do ulubionych przy użyciu Reducera i kontekstu globalnego.

---

## ✨ Funkcje

- 🔐 **Logowanie Google** – dzięki Firebase Authentication
- 📘 **Dodawanie, edycja i usuwanie książek** – z synchronizacją do Firestore
- 🔍 **Filtrowanie książek** – po autorze, liczbie stron, cenie, opisie
- ❤️ **Ulubione książki (reducer)** – zarządzane w globalnym stanie
- 🔁 **Reducer + Context API** – do obsługi ulubionych
- ✅ **Testy E2E z Cypress** – automatyczne sprawdzanie funkcjonalności UI
- 🖼️ **Placeholder okładki** – jeśli brak obrazu książki
- 🔄 **Obsługa ładowania użytkownika** – z komunikatem lub opóźnieniem renderowania
- 🎯 **SSR-ready Router stack** – z fallbackiem 404 (NotFound)

---

## 🚀 Jak uruchomić aplikację

1. Zainstaluj zależności:

npm install

2. Uruchom dev-serwer:

npm run dev

3. Aplikacja będzie dostępna pod:

http://localhost:5173

---

## 🧪 Testowanie (Cypress)

1. Otwórz interfejs graficzny Cypress:

npx cypress open

2. Lub uruchom testy w trybie headless:

npx cypress run

3. Główne testy znajdują się w:

cypress/e2e/book_store_spec.cy.js

Zakres testów:
- filtrowanie książek
- dodawanie książki
- usuwanie książki
- zmiana ulubionych
- sprawdzanie obecności login buttona

---

## 🗂️ Struktura katalogów

.
├── app
│   ├── blocks/              # Komponenty jak NavBar, BookListItem
│   ├── assets/              # Obrazy i zasoby statyczne
│   ├── engine/              # Firebase init, UserService
│   ├── hooks/               # Konteksty (BookList, Favorite)
│   ├── views/               # Widoki: home, addBook, notFound, welcome
│   ├── map.jsx              # React Router mapowanie
│   └── app.jsx              # Entry point + wrapper
│
├── cypress/                 # Testy Cypress
│
├── firebase/                # Konfiguracja Firestore
└── README.md                # Ten plik

---

## 🔐 Firebase

Upewnij się, że masz skonfigurowaną usługę Firebase:

- Authentication → Google
- Firestore Database z regułami np.:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

---

## 🛒 Ulubione książki (Reducer)

Ulubione książki zarządzane są za pomocą `FavoriteContext` (React Context + useReducer).

Funkcjonalności:

- Dodanie/Usunięcie książki do/z ulubionych
- Licznik ulubionych w pasku nawigacji
- Zachowanie stanu w całej aplikacji

---

## 🔧 Przyszłe rozszerzenia

- 🗃️ Podział na kategorie
- 🔍 Wyszukiwanie pełnotekstowe
- 📦 Koszyk z lokalnym przechowywaniem

---

## 👨‍💻 Autor

> Projekt stworzony w ramach kursu **Programowanie interfejsów webowych**  
> 🧠 Maksymilian Moskwytyn

---

## 🧼 Licencja

MIT © 2025
