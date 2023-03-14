export class HtmlConstructor {
    constructor(parent) {
        this.parent = parent;
    }
    addElement(tagName, attributes) {
        const element = document.createElement(tagName);
        if (attributes) {
            Object.keys(attributes).forEach(attribute => {
                if (attribute === 'innerText') {
                    element.innerText = attributes[attribute];
                }
                else {
                    element.setAttribute(attribute, attributes[attribute]);
                }
            });
        }
        this.parent.append(element);
        return element;
    }
    addSubElement(localParent, tagName, attributes) {
        const element = this.addElement(tagName, attributes);
        localParent.append(element);
        return element;
    }
    updateSelected(elements, booleans) {
        const selected = 'seleccionado';
        elements.forEach((element, index) => {
            element.classList.remove(selected);
            if (booleans[index]) {
                element.classList.add(selected);
            }
        });
    }
    toggleElement(element) {
        const selected = 'seleccionado';
        if (element.classList.contains(selected)) {
            element.classList.remove(selected);
        }
        else {
            element.classList.add(selected);
        }
    }
}
