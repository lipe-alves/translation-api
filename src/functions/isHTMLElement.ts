function isHTMLElement(value: any): value is HTMLElement {
    return value?.nodeType === 1;
}

export default isHTMLElement;
export { isHTMLElement };
