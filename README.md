```shell

npm install tailwindcss @tailwindcss/cli
```

```css ./src/input.css
@import "tailwindcss";
```

```shell

npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

```html
<link href="./src/output.css" rel="stylesheet">
```