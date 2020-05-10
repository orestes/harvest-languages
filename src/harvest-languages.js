(function($) {
    'use strict';

    var select, spinner, updated, manifest;

    // This changes every once in a while
    var selector = '#invoice_header > div > div:nth-child(2)';

    init();

    ///

    function init() {
        top.loaded = loadLanguages()
            .then(insertUIElements)
            .catch(function(e) {
                console.warn(manifest.name, manifest.version, 'Could not load languages', e);
            });
        loadManifest()
            .then(displayReadyMessage)
            .catch(function(e) {
                console.warn(manifest.name, manifest.version, 'Could not display ready message', e);
            });
    }
    function loadManifest() {
        return new Promise(function(resolve, reject) {
            return resolve(manifest = chrome.runtime.getManifest());
        });
    }

    function loadLanguages() {
        return new Promise(function(resolve, reject) {
            fetch(chrome.extension.getURL('/languages.json'))
                .then(function(response) {
                    response.json()
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    function loadLanguage(locale) {
        return new Promise(function(resolve, reject) {
            fetch(chrome.extension.getURL('/languages/' + locale + '.json'))
                .then(function(response) {
                    response.json()
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    function addEventListeners(select) {
        select.on('change', changeLanguage);
    }

    function appendSelect(select) {
        var target = $(selector);

        if (target.length !== 1) {
            throw new Error('Cannot attach UI elements');
        }

        target.prepend(select);
    }

    function getSpinner() {
        return spinner = $('<img id="harvest-language-loading" ' +
                           'src="' + chrome.extension.getURL('/content/images/spinner.gif') + '">')
            .hide();
    }

    function insertUIElements(languages) {
        var select = getSelect(languages);
        var spinner = getSpinner();
        var wrapper = getSelectWrapper(spinner, select);

        addEventListeners(select);
        appendSelect(wrapper);
    }

    function displayReadyMessage() {
        console.info(manifest.name, manifest.version, 'loaded');
    }

    function addOption(select, value, label) {
        select.append('<option value="' + value + '">' + label + '</option>');
    }

    function getSelectWrapper(spinner, select) {
        var wrapper = $('<span ' +
            'title="Change language" ' +
            'id="harvest-language-selector" ' +
            'class="btn-action btn-pill btn-invoice-action" ' +
            '></span>');

        return wrapper.append(spinner).append(select);
    }

    function getSelect(languages) {
        select = $('<select>');
        addOption(select, '*', 'Language');

        languages.forEach(function(language) {
            addOption(select, language.locale, language.name + ' - ' + language.localeName);
        });

        return select;
    }

    function getIframe(url) {
        return $('<iframe src="' + url + '"></iframe>').hide().get()[0];
    }

    function getTranslationSettingsUrl(section) {
        return 'https://' + location.hostname + '/' + section + '/translations';
    }

    function changeValues(section, document, language) {
        _.forEach(language[section], function (value, key) {
            var field = document.getElementById(key);

            if (!field) {
                return console.warn('Could not find field for translation. ' +
                    'Is this module enabled in your Harvest settings?. ' +
                    'Field:', key, 'Translation:', value);
            }

            field.value = value;
        });

        document.querySelector("form#edit_profile").submit();
        updated = true;
    }

    function getSelectedLocale() {
        return select.val();
    }

    function attachIframe(iframe) {
        $(document.body).append(iframe);
    }

    function iframeLoaded(iframe, section, language, resolve) {
        if (!updated) {
            return changeValues(section, iframe.contentDocument, language);
        }

        // When the iframe fires this event for the second time it does because of the form submit being done
        resolve();
    }

    function changeLanguage() {
        $(spinner).show();
        select.hide();

        loadLanguage(getSelectedLocale()).then(translateInPlace);
    }

    function getTranslationIframe(url, section, language, resolve) {
        var iframe = getIframe(url);
        iframe.addEventListener('load', function () {
            iframeLoaded(iframe, section, language, resolve)
        });

        return iframe;
    }

    function translate(section, language) {
        return new Promise(function (resolve, reject) {
            var url    = getTranslationSettingsUrl(section);
            var iframe = getTranslationIframe(url, section, language, resolve);

            attachIframe(iframe); // Kicks-off url loading
        });
    }

    function translateInPlace(language) {
        // /invoices/1234567 -> invoices
        // /estimates/1234567 -> estimates
        var section = location.pathname.match(/[^/]+/)[0];

        translate(section, language)
            .then(function () {
                // We're done
                location.reload();
            })
    }

})(Zepto);
