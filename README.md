# 🚀 Webpack_Config 🚀

## 🏁 Quick start 🏁

``` Terminal
# Download repository:
git clone *${url}*

# Install dependencies:
npm install (short - npm i)

# Server with live reload at http://localhost:4321/
npm start
```

> # `Base commands`
```
| npm              | actions                                              |
|------------------|------------------------------------------------------|
|`npm install`     | install all dependencies                             |
|`npm start`       | development dev-server                               |
|`npm run build`   | production       **build production mode**           |
|`npm run dev`     | development      **build development mode**          |
|`npm run deploy`  | deploy gh-pages  **no use**                          | 
|`npm run clean`   | clear folder - dist && cache                         |
|`npm run lint-fix`| ESLint - config AirBnB --fix all files in src folder |
|`npm run test`    | run jest **no use**                                  |
```

> `Rules:`
> - Rules pick up in the airbnb config file `.eslintrc.js`
> - Type `any` throws error - `any` is not allowed as the type of type parameter.
> - Throw error if variable is not used - `no-unused-vars`
> - Max lines per function && methods - 40 lines (airbnb)
> - Max lines per file - 120 symbols (airbnb)



