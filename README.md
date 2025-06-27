# PixelSec Village

> Navigate a retro 2D pixel town’s cybersecurity dilemmas—your choices forge your fate and determine the house you call home

### Instructions

1. Change the following files

   - In .env file change the followings

     VITE_BASE_URL=<the offical url>
     VITE_API_BASE_URL=<the api endpoint>
     VITE_API_KEY=<if any api key required else empty>

   - In public/html change the followings

     - In strawhut.html change the followings

       - in meta property="canonical_url" change the content attribute from https://pixelsec-village.onrender.com -> <the offical url>
       - in meta property="og:image" change the content attribute from https://pixelsec-village.onrender.com/images/strawhut.jpg -> <the offical url>/images/strawhut.jpg
       - in meta property="og:url" change the content attribute from https://pixelsec-village.onrender.com -> <the offical url>
       - in meta property="twitter:image" change the content attribute from https://pixelsec-village.onrender.com/images/strawhut.jpg -> <the offical url>/images/strawhut.jpg
       - in meta property="twitter:url" change the content attribute from https://pixelsec-village.onrender.com -> <the offical url>

     - In loghouse.html change the followings

       - Do the above steps in strawhut.html

     - In townhouse.html change the followings

       - Do the above steps in strawhut.html

     - In mansion.html change the followings

       - Do the above steps in strawhut.html

2. In src dir file App.vue remove line 77 to 89 for removing the version number

3. Run the commend `npm run build-only`

4. Upload the dist
