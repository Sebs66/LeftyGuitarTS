export abstract class HtmlConstructor{
    constructor(public parent: HTMLElement){}
    
    addElement(tagName:string, attributes: {[key:string]: string} | null): HTMLElement {
        const element = document.createElement(tagName);
        if (attributes){
            Object.keys(attributes).forEach(attribute =>{
                if (attribute === 'innerText'){
                    element.innerText = attributes[attribute]
                } else {
                    element.setAttribute(attribute,attributes[attribute]);
                }
            })
        }
        this.parent.append(element)
        return element
    }
    
    addSubElement(localParent:HTMLElement, tagName:string, attributes: {[key:string]: string} | null): HTMLElement {
        const element = this.addElement(tagName,attributes);
        localParent.append(element)
        return element
    }
}

/**
 * An extention on HTMLConstructor class only for classes that have the behaviour of toggle selected buttons.
 */
export class HTMLSelectionConstructor extends HtmlConstructor {
    constructor(public parent: HTMLElement){
        super(parent)
    }

    updateSelected(elements: Element[], booleans: boolean[]): void {
        const selected = 'seleccionado'
        elements.forEach((element,index)=>{
            element.classList.remove(selected);
            if (booleans[index]){
                element.classList.add(selected)
            }
        });
    }

    toggleElement(element:HTMLElement): void {
        const selected = 'seleccionado'
        element.classList.toggle(selected)
    }

    changeColor(element:HTMLElement,colorClass:string): void {
        element.classList.forEach(className=>{
            if (className.includes('color')){
                element.classList.remove(className)
            }  
        });
        element.classList.add(colorClass)
    }

    resetColors(elementArray:Element[],colorClass:string): void{
        elementArray.forEach(element=>{
            element.classList.forEach(className=>{
                if (className.includes('color')){
                    element.classList.remove(className)
                }  
            });
            element.classList.add(colorClass) 
        })
    }
} 
