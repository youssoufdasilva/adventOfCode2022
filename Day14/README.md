# Setup

Commands:

`npm init -y`

`npm i ts-node typescript rimraf`

Package.json Script:

```
"scripts": {
    "build": "rimraf ./build && tsc",
    "dev": "nodemon",
    "puzzle1": "npm run build && node build/puzzle01.js",
    "puzzle2": "npm run build && node build/puzzle02.js"
  },
```


# How to Run the Puzzles

For the First Puzzle
`npm run puzzle1`

For the Second Puzzle
`npm run puzzle2`
