
export class StyleModel {
    property: string;
    type: StylePropertiesTypes;
    isPx?: boolean | null;
    value: string | null;
    id: number;
    [key: string]: any;
    constructor(property: string, type = StylePropertiesTypes.value, value = '',  isPx: boolean | null = null) {
        this.property = property;
        this.type = type;
        this.isPx = isPx;
        this.value = value;
        this.id = new Date().getMilliseconds();
    }
}

export enum StylePropertiesTypes {
    value = 1,
    size,

}