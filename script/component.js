class SentenceElement extends HTMLElement {
  connectedCallback() {
    const liElement = document.createElement("li");
    const text =
      (this.getAttribute("text") && "main." + this.getAttribute("text")) ||
      "error.noSentence";
    liElement.dataset.detect = text;

    this.id =
      this.getAttribute("text") && this.getAttribute("text").split(".")[1];

    if (this.firstChild && this.firstChild.localName === "li") {
    } else {
      this.insertBefore(liElement, this.firstChild);
    }
  }
}

customElements.define("rule-sentence", SentenceElement);

class GroupElement extends HTMLElement {
  connectedCallback() {
    const olElement = document.createElement("ol");

    Array.from(this.children).forEach((child) => {
      olElement.appendChild(child);
    });

    const groupTypeDict = {
      category: "content-category-container",
      subcategory: "content-subcategory-container",
      article: "content-article-container",
      paragraph: "content-paragraph-container",
    };
    const groupType = groupTypeDict[this.getAttribute("type")];

    olElement.className = groupType;

    this.appendChild(olElement);
  }
}

customElements.define("rule-group", GroupElement);
