import { B as BaseElement, h as html } from './base-element-e0a9d6c8.js';
import { s as store, u as unsafeSVG, b as setFilter, r as removeEntry, a as clearFilters } from './enhanced-select-68546119.js';

/**
 * A simple debounce util for ensuring a function only gets called once during
 * a particular interval.
 * @param {!Function} func A function to debounce based on the wait time.
 * @param {!number} wait Time in milliseconds to wait before invoking function.
 * @return {() => void | Promise<void> | TODO} A debounced copy of the function.
 */
const debounce = (func, wait) => {
  if (!func) {
    throw new TypeError('func is a required argument.');
  }

  if (!wait) {
    throw new TypeError('wait is a required argument.');
  }

  let timeout;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

var caretIcon = "<svg width=\"14\" height=\"9\" viewBox=\"0 0 14 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M1.17468 0.325195L-0.000324249 1.5002L6.66634 8.16686L13.333 1.5002L12.158 0.325195L6.66634 5.80853\" fill=\"#000000\"/>\n</svg>";

/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @type {HTMLElement}
 */
class CheckboxGroup extends BaseElement {
  constructor() {
    super();

    this._handleMassSelect = this._handleMassSelect.bind(this);
    this._handleShowMore = this._handleShowMore.bind(this);
    this._checkOption = this._checkOption.bind(this);
    this._computeAllSelected = debounce(
      this._computeAllSelected.bind(this),
      10
    );

    this.setAttribute('enhanced', '');

    this.elements = {
      initialChildren: Array.from(this.children),
      checkboxes: this._getCheckboxes(),
    };

    this.name = this._getName();
    this.show = 4;
    this.i18n = {};
  }

  static get properties() {
    return {
      allSelected: {type: Boolean, reflect: true},
      show: {type: Number, reflect: true},
      i18n: {type: Object, reflect: true},
    };
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(this.onStoreUpdate.bind(this));

    this.elements.massSelectButton = this.querySelector(
      '.checkbox-group__mass-select'
    );

    this.elements.showMoreButton = this.querySelector(
      '.checkbox-group__show-more'
    );

    this.elements.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', this._checkOption);
      checkbox.addEventListener('change', this._computeAllSelected);
    });

    this._computeAllSelected();
  }

  /**
   * Checks if the app state contains entries for this select, and if so
   * sets the value to the entries.
   * @param {*} state
   */
  onStoreUpdate(state) {
    const filters = state.filters || {};
    const entries = filters[this.name] || [];

    for (const index in this.elements.checkboxes) {
      const checkbox = this.elements.checkboxes[index];
      checkbox.checked = entries.some(entry => entry.value === checkbox.value);
    }

    this._computeAllSelected();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.elements.checkboxes.forEach(checkbox => {
      checkbox.removeEventListener('change', this._computeAllSelected);
    });

    this.elements.massSelectButton.removeEventListener(
      'click',
      this._handleMassSelect
    );
  }

  render() {
    return html`
      <button
        class="checkbox-group__mass-select button button-text type--h6 color-primary"
        @click="${this._handleMassSelect}"
      >
        ${this.allSelected ? this.i18n.reset : this.i18n.select_all}
      </button>

      <div>${this.elements.initialChildren.slice(0, this.show)}</div>

      ${this._renderShowMoreButton()}
    `;
  }

  /**
   * @return {TemplateResult|undefined}
   */
  _renderShowMoreButton() {
    if (this.show >= this.elements.checkboxes.length) return;

    return html`
      <button
        class="checkbox-group__show-more button button-text type--h6 color-primary display-flex align-center"
        @click="${this._handleShowMore}"
      >
        ${unsafeSVG(caretIcon)} More
      </button>
    `;
  }

  _computeAllSelected() {
    const checked = this.elements.checkboxes
      .filter(checkbox => checkbox.disabled === false)
      .find(checkbox => checkbox.checked === false);

    this.allSelected = checked === undefined;
  }

  _checkOption() {
    const checked = this.elements.checkboxes
      .filter(checkbox => checkbox.checked === true)
      .map(checkbox => ({
        label: checkbox.nextSibling?.textContent,
        value: checkbox.value,
      }));
    setFilter(this.name, checked);
  }

  /**
   * @param {MouseEvent } e
   */
  _handleMassSelect(e) {
    e.preventDefault();

    const allSelected = this.allSelected;

    this.elements.checkboxes.forEach(checkbox => {
      if (
        (allSelected && !checkbox.checked) ||
        (!allSelected && checkbox.checked) ||
        checkbox.disabled
      )
        return;

      checkbox.checked = !allSelected;
      checkbox.dispatchEvent(new Event('change'));
    });

    this.show = this.elements.checkboxes.length;
  }

  /**
   * @param {MouseEvent }e
   */
  _handleShowMore(e) {
    e.preventDefault();

    this.show = this.elements.checkboxes.length;
  }

  /**
   * @returns {HTMLInputElement[]}
   */
  _getCheckboxes() {
    return Array.from(this.querySelectorAll('input[type="checkbox"]'));
  }

  /**
   * @returns {string}
   * @private
   */
  _getName() {
    return this.elements.checkboxes[0].name;
  }
}

customElements.define('checkbox-group', CheckboxGroup);

var closeIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z\" fill=\"#1967D2\"/>\n</svg>";

/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class TagPillList extends BaseElement {
  static get properties() {
    return {
      items: {type: Array, reflect: true},
    };
  }

  constructor() {
    super();
    this.items = [];
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(this.onStoreUpdate.bind(this));
  }

  onStoreUpdate(state) {
    const filters = state.filters || {};
    const items = [];
    for (const [name, entries] of Object.entries(filters)) {
      for (const item of entries) {
        items.push({
          name: name,
          value: item.value,
          label: item.label,
        });
      }
    }
    this.items = items;
  }

  _onClickPill(item) {
    removeEntry(item.name, item);
  }

  _onClickClearPills() {
    clearFilters();
  }

  render() {
    return [
      this.items.length > 0
        ? html`
            <span
              class="clear-filters tag-pill rounded-lg surface hairline type--small display-inline-flex align-center"
              @click="${() => this._onClickClearPills()}"
            >
              Clear filters
            </span>
          `
        : '',
      this.items.map(
        item => html`
          <span
            class="surface hairline rounded-lg tag-pill type--small display-inline-flex align-center "
            data-name="${item.name}"
            data-value="${item.value}"
            @click="${() => this._onClickPill(item)}"
          >
            ${item.label} ${unsafeSVG(closeIcon)}
          </span>
        `
      ),
    ];
  }
}

customElements.define('tag-pill-list', TagPillList);

export { TagPillList as T, debounce as d };
