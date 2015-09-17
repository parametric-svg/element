 /**
  * Register the `<parametric-svg>` element with custom settings
  *
  * In most cases you’ll just import the main module and be fine with the
  * default settings (see [getting started](#/getting-started)). But if you want
  * fine control, you can `require('parametric-svg-element/register')`. The
  * function you get back takes a single argument `options` with the following
  * properties:
  *
  * - `document` – A custom implementation of `document` – for headless tests
  *   or something. Default: `window.document`
  *
  * @jsig
  *   register(options: {
  *     document?  : Document
  *   }) => void
  */
export default () => {};
