## 1.Task

[Task link](https://docs.google.com/document/d/1K79_NA4lMYfqQiIJGqLDek1K9z-oc2qg8n4AvrN1PXE/edit)

[Demo on gh-pages](https://NataliaKirik.github.io/Innowise-Lab-Internship-Level-2-Mini-paint)

## 2.How to run the app

1.Clone the develop branch.
> $git clone https://github.com/NataliaKirik/Innowise-Lab-Internship-Level-2-Mini-paint.git

2.Go to the directory
> $ cd Mini-paint

3.Install the npm modules
> $ npm install

4.Add the .env.local file with the firebase config

5.Run the app
> $ npm start

## 3.Database snapshot

```
 artCollection
    └── artRef
      ├── canvasDataUrl
      ├── userEmail
      └── userId

```

## 4.Application stack

* react
* redux
* redux-toolkit
* typescript
* firebase
* react-router-dom
* Material UI
* react-hook-form
* eslint
* husky
* prettier

## 5.Folder structure

```
public
src
├── app
│    ├── app
│    └── store
├── assets
│   └── img
├── common
│   ├── components
│   │   ├── Canvas
│   │   ├── ErrorSnackbar
│   │   ├── form
│   │   ├── Header
│   │   ├── LogInOutButton
│   │   ├── Preloader
│   │   └── Toolbar
│   └── constants
│       ├── style
│       └──routes
├── features
│  
├── firebase
│  
└── pages 
     ├── Gallery
     ├── Login
     ├── Paint
     └── Register    
```
