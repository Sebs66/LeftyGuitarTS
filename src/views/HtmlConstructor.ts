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
        if (element.classList.contains(selected)){
            element.classList.remove(selected);
        } else {
            element.classList.add(selected);
        }
    }

    changeColor(element:HTMLElement,colorClass:string): void {
        element.classList.forEach(className=>{
            if (className.includes('color')){
                element.classList.remove(className)
            }  
        });
        element.classList.add(colorClass)
    }
} 

/*

 * change the color of the specific botton and its relatives in the scale.
 * @param select 

function changeColor(select:HTMLSelectElement):void {
    const index = Number(select.getAttribute('position'));
    const color = select.value;
    buttonsNotes[index].setAttribute('class','boton seleccionado') // removes previous color class.
    buttonsNotes[index].classList.add(color);
    select.setAttribute('class',`seleccionado ${color}`);
    buttonsInterval[index].setAttribute('class','intervalos seleccionado');
    buttonsInterval[index].classList.add(color);
}
*/