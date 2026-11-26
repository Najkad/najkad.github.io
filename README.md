# NAJKAD website

Static HTML, CSS and vanilla JS. No build step, no backend. Fonts are self-hosted, so the site makes no third-party requests. All paths are relative, so it works on a GitHub Pages project URL and on a custom domain.

## Folder
- `index.html` (all nine sections), `404.html`, `robots.txt`, `sitemap.xml`, `.nojekyll`
- `css/styles.css` (design tokens at the top), `js/main.js` (service data, viewer, sliders, video compare, menu)
- `assets/img` (WebP, 640w and 1280w), `assets/video` (MP4), `assets/fonts` (woff2), `assets/icons`
- `MEDIA_MANIFEST.md` lists which asset appears where.

## Deploy to GitHub Pages
1. Create a new GitHub repository (public).
2. Upload everything inside this folder (not the folder itself) to the repository root: `index.html` must sit at the top level. Commit to `main`.
3. Repository Settings, Pages, Source: Deploy from a branch, Branch: `main`, folder `/ (root)`, Save.
4. Wait about a minute. The site will be at `https://USERNAME.github.io/REPOSITORY/`.

## Replace the URL placeholders (after the live address exists)
Placeholder: `https://YOUR-DOMAIN/` (keep the trailing slash). It appears only in `index.html`, `sitemap.xml` and `robots.txt`. Replace it with your live address, for example `https://USERNAME.github.io/REPOSITORY/` or later `https://www.yourdomain.com/`.
Terminal, run from the site root:
`sed -i 's#https://YOUR-DOMAIN/#https://USERNAME.github.io/REPOSITORY/#g' index.html sitemap.xml robots.txt`
Without a terminal: open those three files on GitHub, press the pencil icon, use find-and-replace, and commit. Until you do this the site works normally; only canonical, social previews, structured data and the sitemap are affected.

## Custom domain (later)
Settings, Pages, Custom domain, then add the DNS records GitHub lists, tick Enforce HTTPS, and repeat the placeholder replacement with the new domain. Then submit `sitemap.xml` in Google Search Console.

## Client logos
Bloocode Technology and Iseda Studio use the official logos supplied by the client (`assets/img/brands/`). Jasper Sterling Heights Estate has no official logo, so it is set in type and is not linked.

## Editing content
Service text and gallery images are in the `CATS` array at the top of `js/main.js`. Add an image by exporting 640w and 1280w WebP files to `assets/img` and adding `im('file-name','alt text')`.
