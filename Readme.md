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




<a                                                 id="/example"></a>&nbsp;

```html
<parametric-svg>
  <svg><rect
    parametric:x="2 * (5 + 3)"
  /></svg>
</parametric-svg>
```

<p align="center"><b>➔</b></p>

```html
<parametric-svg>
  <svg><rect
    parametric:x="2 * (5 + 3)"
               x="16"
  /></svg>
</parametric-svg>
```




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

Otherwise you can drop our `<script>` from the fantastic *[wzrd.in][]* CDN anywhere in your HTML document:

```html
<script src="https://wzrd.in/standalone/parametric-svg-element@latest"></script>
```

If you’re going the `<script>` way, remember to swap `latest` with a concrete version number in production. You can also download the script from https://wzrd.in/standalone/parametric-svg-element@latest and serve it yourself.

[webpack]:  http://webpack.github.io
[wzrd.in]:  http://wzrd.in





<a                                                        id="/usage"></a>&nbsp;

Usage
-----

*Work in progress…*




<a                                                          id="/api"></a>&nbsp;

API
---

<!-- @doxie.inject start -->
<!-- Don’t remove or change the comment above – that can break automatic updates. -->
#####  Register the `<parametric-svg>` element with custom settings

```js
register(options: {
  document?  : Document
}) => void
```
<div align="right"><sup>JSIG SIGNATURE <a href="http://jsig.biz/">(?)</a></sup></div>

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
