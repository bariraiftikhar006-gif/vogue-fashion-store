# VOGUE — Luxury Fashion Store

A responsive fashion retail storefront built with Next.js 14, React, TypeScript and plain CSS.

## Features
- Luxury editorial storefront with responsive desktop and mobile layouts
- Product catalogue with category filters, search and price sorting
- Add-to-bag, quantity controls, remove items and cart persistence via localStorage
- Demo checkout flow (no real payment processing)
- Newsletter interaction demo

## Run locally
1. Install Node.js 18.17 or later.
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev`
5. Visit http://localhost:3000

## Deploy to Vercel
### Recommended: GitHub import
1. Create a GitHub account if you do not already have one.
2. Create a new repository named `vogue-fashion-store`.
3. Upload the contents of this folder to the repository (the `app` folder and `package.json` must be at the repository root).
4. Sign in at https://vercel.com using GitHub.
5. Select **Add New → Project**, import `vogue-fashion-store`, and keep the detected Next.js settings.
6. Click **Deploy**. Vercel will build the site and provide a public `*.vercel.app` URL.

### Deploy from your computer with Vercel CLI
1. Install Node.js, then run `npm install` in this folder.
2. Run `npx vercel` and follow the prompts to sign in and create the project.
3. For the production deployment, run `npx vercel --prod`.

## Before submitting
- Open the deployed URL on desktop and mobile.
- Test category filters, search, sort, add-to-bag, quantity changes, and demo checkout.
- Replace sample products, prices and image URLs with your own if your assignment requires original inventory.
- Add your name/course details to the README if required by your instructor.

## Notes
- Product photos load from Unsplash and require an internet connection.
- Cart contents are stored in the visitor's browser only.
- Checkout is a demonstration; it does not collect payment or create real orders.
- This is a frontend coursework project. A production store needs a backend, inventory/order management, secure payment provider integration, and privacy/terms pages.
