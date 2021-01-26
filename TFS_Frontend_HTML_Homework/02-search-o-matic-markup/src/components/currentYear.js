class CurrentYear extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.textContent = `${new Date().getFullYear()}`;
  }
}

customElements.define('current-year', CurrentYear);
