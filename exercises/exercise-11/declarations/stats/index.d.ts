// how to remove duplicates in function signatures
declare module 'stats' {
    export function getMaxIndex(input: any[], comparator: (a: any, b: any) => number): number;
    export function getMaxElement(input: any[], comparator: (a: any, b: any) => number): any;
    export function getMinIndex(input: any[], comparator: (a: any, b: any) => number): number;
    export function getMinElement(input: any[], comparator: (a: any, b: any) => number): any;
    export function getMedianIndex(input: any[], comparator: (a: any, b: any) => number): number;
    export function getMedianElement(input: any[], comparator: (a: any, b: any) => number): any;
    export function getAverageValue(input: any[], comparator: (a: any, b: any) => number): number;
}
