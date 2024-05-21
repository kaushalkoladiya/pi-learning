

##### If you want to use SWC despite the presence of a .babelrc file you can force it in your next.config.js file. [Link](https://nextjs.org/docs/messages/swc-disabled)

next.config.js
```
module.exports = {
  experimental: {
    forceSwcTransforms: true,
  },
}
```