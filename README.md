# React Fast Grid (+ Hidden)
![CI](https://github.com/mathew-kurian/react-fast-grid/workflows/CI/badge.svg)

[![Edit React Fast Grid](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/grid-layout-wrc4q?fontsize=14&hidenavigation=1&theme=dark)

Useful algorithm extracted from [Material-UI Grid](https://material-ui.com/components/grid/#grid) and [Material-UI Hidden](https://material-ui.com/components/hidden/)

```
npm install react-fast-grid react-jss@^8.6.1 --save
```

## Known Issues

### direction: column | column-reverse

Though the Grid component has a direction property that allows values of row, row-reverse, column, and column-reverse, there are some features that are not supported within column and column-reverse containers. The properties which define the number of grids the component will use for a given breakpoint (xs, sm, md, lg, and xl) are focused on controlling width and do not have similar effects on height within column and column-reverse containers. If used within column or column-reverse containers, these properties may have undesirable effects on the width of the Grid elements.

### Negative margin

There is one limitation with the negative margin we use to implement the spacing between items.
A horizontal scroll will appear if a negative margin goes beyond the `<body>`.
There are 3 available workarounds:

1. Not using the spacing feature and implementing it in user space `spacing={0}` (default).
2. Applying padding to the parent with at least half the spacing value applied to the child:

```jsx
<body>
  <div style={{ padding: 20 }}>
    <Grid container spacing={5}>
      //...
    </Grid>
  </div>
</body>
```

3. Adding `overflow-x: hidden;` to the parent.

### white-space: nowrap;

The initial setting on flex items is `min-width: auto`.
It's causing a positioning conflict when the children is using `white-space: nowrap;`.
You can experience the issue with:

```jsx
<Grid item xs>
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`.
In practice, you can set the `zeroMinWidth` property:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```
