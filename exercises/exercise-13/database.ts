import * as fs from 'fs'
import { stringify } from 'querystring';

type FindType = {
    [key: string]: {
        [key: string]: string | number | number[]
    }
} | {
    [key: string]: {
            [key: string]: {
                [key: string]: string | number
            }
        }[]
} | {
    [key: string]: string | number[]
}

type ObjectInArrayType = {
    [key: string]: {
        [key: string]: string | number
    }
}

type AtomicObjectType = { 
    [key: string]: string | number 
}

export class Database<T> {
    protected filename: string;
    protected fullTextSearchFieldNames: string[];

    constructor(filename: string, fullTextSearchFieldNames: string[]) {
        this.filename = filename;
        this.fullTextSearchFieldNames = fullTextSearchFieldNames;
    }

    async find(arg: FindType): Promise<T[]> {
        let fileContent: string = fs.readFileSync(this.filename, 'utf-8');
        let filteredContent = fileContent.split('\n').filter((item: string) => item.charAt(0) === 'E').map((item: string) => item.substr(1)).join(',');
        filteredContent = '[' + filteredContent + ']';
        let persons: T[] = JSON.parse(filteredContent);

        let condition: string = '';

        Object.keys(arg).forEach(key => {
            if (key.includes('$or') || key.includes('$and')) {
                Object.values(arg).forEach((obj: ObjectInArrayType) => {
                    let localKey: string = Object.keys(obj)[0]
                    let localValueAsObject: AtomicObjectType = Object.values(obj)[0]
                    let [localCondition, localValue] = Object.entries(localValueAsObject)[0]
                    
                    condition += `person[${localKey}] `;

                    switch(localCondition) {
                        case "$qt":
                            condition += '> '
                            break;
                        case "$lt":
                            condition += '< '
                            break;
                    }

                    switch(key) {
                        case '$or':
                            condition += `${localValue} || `;
                            break;
                        case '$and':
                            condition += `${localValue} && `;
                            break;
                    }
                    
                });
            } else {

            }
        })

        // Object.keys(arg).forEach(key => {
        //     if (key.includes('$')) {
        //         Object.values(arg).forEach((obj: ObjectInArrayType) => {
        //             let localKey: string = Object.keys(obj)[0]
        //             let objValue: AtomicObjectType = Object.values(obj)[0]
        //             let localValue: number = (Object.values(objValue) as number[])[0]

        //             if (key.includes('or'))
        //                 condition += `person[${localKey}] === ${localValue} || `;

        //             if (key.includes('add'))
        //                 condition += `person[${localKey}] === ${localValue} && `;
        //         });
        //     } else {
        //         let localKey: string = key;
        //         let localValue: string | number | number[] = Object.values(arg[key])[0]
        //     }
        // })

        //persons.filter(person => person[property] === value)

        return [];
    }
}
