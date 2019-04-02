<img align="right" width="100" height="100" src="/src/content/images/harvest-languages-128.png">

# Harvest Languages

[![Analytics](https://ga-beacon.appspot.com/UA-62371785-2/harvest-languages/readme)](https://github.com/igrigorik/ga-beacon)

I love Harvest, but they're missing something  I need: multi-language invoices. They currently support a very rudimentary "translations" configuration that accepts a single set of translated texts. That means switching between languages requires you to change your translations every time. After reaching their support and being told they didn't have any better options, I decided I'd implement a quick workaround.

The result is this Google Chrome extension. You get a language selector that changes the translations and then reloads the invoice page for you.

## Disclaimer

I do not work for Harvest nor am I affiliated with them in any way. This is not an officially supported solution, just a hack.

## Demo

[![Harvest Languages in action](/demo.gif)](http://www.youtube.com/watch?v=yf-_BjTsKxc)

## Installation

 Install [Harvest Languages at the Chrome Web Store](https://chrome.google.com/webstore/detail/harvest-language-support/icnfiaaikmceeffekddmbjhgojnkppac).

Optionally, hide the button in your browser toolbar by right-clicking it and selecting 'Hide in Chrome menu'. The button does nothing, this extension adds the language selector to Harvest's user interface.

## Usage

1. Navigate to the Invoice
2. Use the language selector to change your translations
3. Wait for the page to be refreshed with the new translations

## How it works

When you select a language, the extension adds an invisible `iframe` which loads the "translations" settings page for your Harvest account. Then, it changes the translated texts and saves the changes. When it's done, reloads the current invoice page so the invoice is generated again with the new language translation.

Hacky? You bet. Effective? Damn right. This was done in 3 hours late at night, so I did cut some corners.

## Supported languages

* [en-US] English (United States)
* [fr-CH] Français - French (Switzerland) thanks to [@mr-deamon](https://github.com/mr-deamon)
* [de-CH] Deutsche - German (Switzerland) thanks to [@mr-deamon](https://github.com/mr-deamon)
* [es-ES] Español - Spanish (Spain)
* [sv-SE] Svenska - Swedish (Sweden) thanks to [@calmh](https://github.com/calmh)
* [pt-BR] Português - Portuguese (Brazil) thanks to [@renatonascalves](https://github.com/renatonascalves)
* [nl-NL] Dutch (Netherlands) thanks to [@Harjo](https://github.com/Harjo)
* [fr-CA] French (Canada/Quebec) thanks to [@Baelx](https://github.com/Baelx)
* [el-GR] Greek (Greece) thanks to [@tasoskakour](https://github.com/tasoskakour)

## Adding more languages

You can provide a set of translated texts in an [issue](/issues) and I'll add it to the extension.

If you want to, you can add a new language yourself:

1. Clone this repository
2. Add your language to `languages.json`.
3. Add your language file to the `languages` directory.
4. Add yourself to the readme file
5. Send a pull request

Or if you don't want to contribute

4. Remove the Harvest Languages extension from Chrome.
5. Load the unpacked extension containing the new language into Google Chrome.

## Issues
Please report any [issues](https://github.com/orestes/harvest-languages/issues). New features and ideas that you'd like
 to see implemented will be welcome.

## Contributing

Feel free to send in any pull requests

## Libraries

This extension makes use of [Zepto](http://zeptojs.com) and [lodash](https://lodash.com).

## License

The MIT License (MIT)

Copyright (c) 2016-2019 Orestes Carracedo - [https://orestes.io](https://orestes.io) - [@OrestesCA](http://twitter.com/orestesca)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
