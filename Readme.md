[![Travis CI](https://img.shields.io/travis/parametric-svg/element/master.svg?style=flat-square)](https://travis-ci.org/parametric-svg/element)
 [![David DM](https://img.shields.io/david/parametric-svg/element.svg?style=flat-square)](http://david-dm.org/parametric-svg/element)




<h1 align="center"                                                       id="/">
  <img
    alt="&gt;parametric-svg&lt;"
    src="https://cdn.rawgit.com/parametric-svg/identity/v1.1.0/logo/html.svg"
    width="680"
    height="190"
  />
</h1>

**Parametric 2D graphics. As a custom HTML element.**

**Heads up!** This package is in an early development stage. Not ready for prime time yet.




<a                                              id="/getting-started"></a>&nbsp;

Getting started
---------------

If you’re building your app with *[webpack][]* or something:

```sh
$ npm install parametric-svg-element
```

```js
require('parametric-svg-element');
```

Or you can drop in a `<script>` from the fantastic http://wzrd.in CDN. In production just remember to swap `latest` with a concrete version number – or download the file and serve it yourself:

```html
<script src="https://wzrd.in/standalone/parametric-svg-element@latest"></script>
```

*Work in progress…*




<a                                                          id="/api"></a>&nbsp;

API
---

<!-- @doxie.inject start -->
<!-- Don’t remove or change the comment above – that can break automatic updates. -->
#####  Register the `<parametric-svg>` element with custom settings

<div align="right"><sub>JSIG SIGNATURE <a href="http://jsig.biz/">(?)</a></sub></div>
```js
register(options: {
  document?  : Document
}) => void
```

In most cases you’ll just import the main module and be fine with the
default settings (see [getting started](#/getting-started)). But if you want
fine control, you can `require('parametric-svg-element/register')`. The
function you get back takes a single argument `options` with the following
properties:

- `document` – A custom implementation of `document` – for headless tests
  or something. Default: `window.document`
<!-- Don’t remove or change the comment below – that can break automatic updates. More info at <http://npm.im/doxie.inject>. -->
<!-- @doxie.inject end -->




<a                                                      id="/license"></a>&nbsp;

License
-------

[MIT][] © [Tomek Wiszniewski][]

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
