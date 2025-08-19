# 🎥 VideoHub

A **Next.js 13 (App Router)** project that allows users to browse, upload, and watch videos — designed like Instagram Reels with authentication, video hosting via **ImageKit**, and **MongoDB** for storage.  

---

## 🚀 Features
- 🔑 **Authentication** with NextAuth.js
- 📹 **Video Uploads & Streaming** (via ImageKit)
- 🎞️ **Responsive UI** styled with TailwindCSS + DaisyUI
- ⚡ **Server-Side Rendering** for SEO-friendly video feeds
- 🖼️ **Reels-like Video Feed** with lazy loading support
- ☁️ **Deployed seamlessly on Vercel**  

---

## 🛠️ Tech Stack
- Next.js 13 (App Router)
- TypeScript
- TailwindCSS + DaisyUI
- NextAuth.js (Authentication)
- MongoDB (Database)
- ImageKit (Video Hosting & CDN)  

---

## ⚙️ Installation

Clone the repository:
```
git clone https://github.com/yourusername/videohub.git
cd videohub
```

Install dependencies:
```
npm install
# or
yarn install
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key

MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

---

## 🏃 Run Locally

Start the development server:
```
npm run dev
# or
yarn dev
```

Your app will be live at:
```
http://localhost:3000
```

Build for production:
```
npm run build
npm start
```

---


## 🤝 Contributing
Contributions are welcome! Feel free to fork, open issues, or submit PRs.  

---  