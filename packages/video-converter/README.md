@the-/video-converter
==========

<!---
This file is generated by the-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/the-labo/the
[bd_travis_url]: http://travis-ci.org/the-labo/the
[bd_travis_shield_url]: http://img.shields.io/travis/the-labo/the.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/the-labo/the
[bd_travis_com_shield_url]: https://api.travis-ci.com/the-labo/the.svg?token=
[bd_license_url]: https://github.com/the-labo/the/blob/master/LICENSE
[bd_npm_url]: http://www.npmjs.org/package/@the-/video-converter
[bd_npm_shield_url]: http://img.shields.io/npm/v/@the-/video-converter.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Video file converter

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>




<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/readme/01.Installation.md.hbs" Start -->

<a name="section-doc-readme-01-installation-md"></a>

Installation
-----

```bash
$ npm install @the-/video-converter --save
```


<!-- Section from "doc/readme/01.Installation.md.hbs" End -->

<!-- Section from "doc/readme/02.Usage.md.hbs" Start -->

<a name="section-doc-readme-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const { TheVideoConverter } = require('@the-/video-converter')

async function tryExample() {
  const converter = new TheVideoConverter()
  await converter.convertIntoMP4('src01.wav', 'dest01.mp4')
}

tryExample().catch((err) => console.error(err))

```


<!-- Section from "doc/readme/02.Usage.md.hbs" End -->


<!-- Sections Start -->

<a name="api"></a>

## API Guide


- module:@the-/video-converter
  - [.create(args)](./doc/api/api.md#module_@the-/video-converter.create)
  - [.default()](./doc/api/api.md#module_@the-/video-converter.default)
  - [.filenameFor(config)](./doc/api/api.md#module_@the-/video-converter.filenameFor)
  - [.isVideoSrc()](./doc/api/api.md#module_@the-/video-converter.isVideoSrc)
  - [.TheVideoConverter](./doc/api/api.md#module_@the-/video-converter.TheVideoConverter)
- module:@the-/video-converter.mixins
  - [.mp4Mix()](./doc/api/api.md#module_@the-/video-converter.mixins.mp4Mix)
- module:@the-/video-converter.mixins.mp4Mix
  - [~MP4Mixed](./doc/api/api.md#module_@the-/video-converter.mixins.mp4Mix~MP4Mixed)
- module:@the-/video-converter.TheVideoConverter
  - [#convert(src,dest,options)](./doc/api/api.md#module_@the-/video-converter.TheVideoConverter#convert)
  - [#inspect(filename,options)](./doc/api/api.md#module_@the-/video-converter.TheVideoConverter#inspect)
  - [#isVideoSrc(src)](./doc/api/api.md#module_@the-/video-converter.TheVideoConverter#isVideoSrc)
  - [#process(src,options)](./doc/api/api.md#module_@the-/video-converter.TheVideoConverter#process)
- MP4Mixed
  - [#convertIntoMP4(src,dest,options)](./doc/api/api.md#MP4Mixed#convertIntoMP4)

See [API Guide](./doc/api/api.md) for more detail


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/the-labo/the/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [THE Labo][the_labo_url]

[the_labo_url]: https://github.com/the-labo

<!-- Links End -->