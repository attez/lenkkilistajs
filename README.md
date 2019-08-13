# lenkkilista
A basic Vue application that displays information about a workout that has been recorded using a smart phone or any other GPS-receivers. Currently workouts can be only added as GPX-files. Application show statistics such as distance, time and avarage speed. The workout route can also be viewed on a map.

Uses Google Firebases services for server side operations (authentication, db, hosting) and [lenkkilistapy cloud function](https://github.com/attez/lenkkilistapy) for adding new workouts.

## Demo
Demo available [here](https://lenkkilista.web.app)

## Screenshots
![Login](https://attez.github.io/lenkkilistajs/screenshots/login.png)
![Workouts](https://attez.github.io/lenkkilistajs/screenshots/workouts.png)
![Map](https://attez.github.io/lenkkilistajs/screenshots/map.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
