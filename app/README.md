# Next Generation Hermo App


### Import Resolver
- Using [babel-plugin-root-import](https://www.npmjs.com/package/babel-plugin-root-import)
- .flowconfig with `module.name_mapper='^{@}/\(.*\)$' -> '<PROJECT_ROOT>{app}/\1'`
- .babelrc with
```
    "plugins": [
        ["babel-plugin-root-import", {
            "rootPathPrefix": "@",
            "rootPathSuffix": "app"
        }]
    ]
```

### Pre-Commit Requirements
- 4 Spaces
- Relative imports should be last
- No double spacing

### Realm Storage
- Should not be connected to the Store



### Documentation for plugin
- global variable using `react-native-dotenv`
- api call using `apisauce`
- local db using `realm`

### things to know
- route configuration is in /app/routeConfig.js

### To generate sourcemap for bugsnag
* Android
    * Debug
        - yarn android-dev:sourcemap
        - cd "sourcemap path"
        - bugsnag-sourcemaps upload --api-key d37792ed3f8c68b62dd998e9f1e247bc --app-version 2.0.1 --minified-file android-debug.bundle --source-map android-debug.bundle.map --minified-url "http://localhost:8081/index.android.bundle?platform=android&dev=true&minify=false"
    * Release
        - yarn android-live:sourcemap
        - cd "sourcemap path"
        - bugsnag-sourcemaps upload --api-key d37792ed3f8c68b62dd998e9f1e247bc --app-version 2.0.1 --minified-file android-release.bundle --source-map android-release.bundle.map --minified-url index.android.bundle --upload-sources
* IOS
    * Debug
        - yarn ios-dev:sourcemap
        - cd "sourcemap path"
        - bugsnag-sourcemaps upload --api-key d37792ed3f8c68b62dd998e9f1e247bc --app-version 2.0.1 --minified-file ios-debug.bundle --source-map ios-debug.bundle.map --minified-url "http://localhost:8081/index.ios.bundle?platform=ios&dev=true&minify=false"
    * Release
        - yarn ios-live:sourcemap
        - cd "sourcemap path"
        - bugsnag-sourcemaps upload --api-key d37792ed3f8c68b62dd998e9f1e247bc --app-version 2.0.1 --minified-file ios-release.bundle --source-map ios-release.bundle.map --minified-url main.jsbundle --upload-sources