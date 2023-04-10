/**
 * @see https://blog.josedromero.com/create-sitemap-for-your-react-app/
 */

require("babel-register")({
  presets: ["es2015", "react"]
})

const router = require("./router/Router").default
const Sitemap = require("react-router-sitemap").default

(
    new Sitemap(router)
        .build('https://lakeside-client.vercel.app')
        .save('./public/sitemap.xml')
);

// new Sitemap(router)
//   .build("https://mi-awesome-website.com")
//   .save("./public/sitemap.xml")
