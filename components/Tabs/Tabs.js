class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
  }

  select() {
    // should use classList
    this.element.classList.add("Tabs__item--selected");
  }

  deselect() {
    // should use classList
    this.element.classList.remove("Tabs__item--selected");
  }
}

class TabLink {
  constructor(element) {
    this.element = element; // attach dom element to object

    // add event listener to capture the click event when clicking tablink
    // and set the dataset value to event tabData
    this.element.addEventListener("click", (event) => {
      event.tabData = this.element.dataset.tab;
    });
  }

  select() {
    // select this link
    this.element.classList.add("Tabs__link--selected");
  }

  deselect() {
    // deselect this link
    this.element.classList.remove("Tabs__link--selected");
  }
}

class Tabs {
  constructor(element) {
    this.element = element; // attaches the dom node to the object as "this.element"

    // get all the links
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).reduce((obj, link) => {
      obj[link.dataset.tab] = new TabLink(link);
      return obj;
    }, {});

    // get all the items
    this.items = element.querySelectorAll(".Tabs__item");
    this.items = Array.from(this.items).reduce((obj, item) => {
      obj[item.dataset.tab] = new TabItem(item);
      return obj;
    }, {});
   
    // add event listener to capture the click event when clicking the tablink
    // and update the tabitem
    this.element.addEventListener("click", (event) => {
      if (event.tabData) {
        this.updateActive(event.tabData);
        event.stopPropagation();
      }
    });

    this.init();
  }
  
  init() {
    // select the first link and tab upon ititialization
    this.activeData = this.element.querySelector(".Tabs__link--default");
    this.activeData = this.activeData ? this.activeData.dataset.tab : this.links[0].dataset.tab;
    this.updateActive(this.activeData);
  }

  updateActive(data) {
    if (this.activeData !== null) {
      this.links[this.activeData].deselect();
      this.items[this.activeData].deselect();
    }
    this.links[data].select();
    this.items[data].select();
    this.activeData = data;
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
