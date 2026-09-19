# 🎵 Album-Search App

A modern, responsive, and type-safe Music Album Search Application built with **React**, **TypeScript**, and **Vite**. The application integrates directly with the **Discogs API** to provide comprehensive music discographies, release details, and server-side pagination with clean error handling.

---

## 🛠️ Tech Stack & Libraries

![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/axios-%233178C6.svg?style=for-the-badge&logo=axios&logoColor=white)
![Formik](https://img.shields.io/badge/formik-%230052CC.svg?style=for-the-badge&logo=formik&logoColor=white)

- **State Management / Data Fetching:** TanStack Query (`@tanstack/react-query`)
- **Notifications:** `react-hot-toast`
- **Pagination:** `react-paginate`
- **Styling:** CSS Modules (Light Theme)

---

## 🚀 Key Features

- 🔍 **Smart Live Search:** Search thousands of artists and albums seamlessly using the comprehensive Discogs database.
- 📄 **Server-Side Pagination:** Efficient data loading with a clean navigation block placed perfectly above the grid.
- 🔄 **"Album-Search" Reset:** Interactive branding logo that instantly wipes all inputs, queries, and server states, resetting the app to its hero view.
- 📦 **Dynamic Modal Popups:** Responsive layout modal overlays featuring inner description auto-scrolling and key focus controls (`Escape` key & overlay click close).
- 🎨 **Modern Light Theme:** Polished minimal aesthetic with lightweight CSS spinner loading indicators.
- 🚨 **Toast Notifications:** Flash user alerts via `react-hot-toast` for handling invalid or empty search criteria.

---

## 💻 Local Setup & Installation

Follow these steps to run the project locally on your machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com
   cd music-album-search
   ```

2. **Install all dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and append your Discogs Developer Token:

   ```env
   VITE_DISCOGS_TOKEN=your_personal_access_token_here
   ```

4. **Launch the Development Server:**

   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:5173` to explore the application!
