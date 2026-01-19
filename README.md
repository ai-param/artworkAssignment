# Artworks DataTable with Custom Selection (PrimeReact)

A React + TypeScript application that displays artworks from the **Art Institute of Chicago API** using **PrimeReact DataTable**.
It supports **server-side pagination**, **checkbox row selection**, and a **custom “select N rows” feature** across paginated data.

---

## ✨ Features

* 📦 Fetches real-time artwork data from a public API
* 📊 PrimeReact DataTable with:

  * Lazy (server-side) pagination
  * Checkbox-based multi-row selection
  * Striped rows and loading states
* 🔢 Custom row selection:

  * Select a specific number of rows using an input overlay
  * Maintains selection across pages
* 🧠 Intelligent selection handling to avoid duplicates
* 💙 Clean UI using PrimeReact’s Lara Light Blue theme
* 🧾 Displays selected artwork count dynamically

---

## 🛠️ Tech Stack

* **React**
* **TypeScript**
* **PrimeReact**
* **PrimeIcons**
* **Art Institute of Chicago Public API**

---

## 📸 Preview

> Displays paginated artwork data with selectable rows and a custom selection control in the table header.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/artworks-datatable.git
cd artworks-datatable
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Run the development server

```bash
npm run dev
```

or

```bash
yarn dev
```

---

## 🌐 API Used

**Art Institute of Chicago API**

```text
https://api.artic.edu/api/v1/artworks
```

Fields fetched:

* `id`
* `title`
* `place_of_origin`
* `artist_display`
* `inscriptions`
* `date_start`
* `date_end`

---

## 🧩 Key Implementation Details

* **Lazy Pagination**
  Data is fetched page-by-page to improve performance.

* **Custom Row Selection**
  Users can input a number (e.g., 20), and the app will automatically select the first N artworks across paginated results.

* **Selection Persistence**
  Selected rows remain selected even when navigating between pages.

* **OverlayPanel Control**
  PrimeReact’s `OverlayPanel` is used to provide a compact custom selection UI inside the table header.

---

## 📁 Project Structure (Simplified)

```text
src/
├── App.tsx
├── main.tsx
├── index.css
```

---

## 🔮 Possible Improvements

* Add global search and column filters
* Persist selections in local storage
* Add sorting support
* Improve accessibility (ARIA labels)
* Extract table logic into reusable components

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Acknowledgements

* [PrimeReact](https://primereact.org/)
* [Art Institute of Chicago API](https://api.artic.edu/)

---
