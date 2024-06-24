export const formatCategoryName = (name: string): string => {
    return name
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toUpperCase();
};


export const convertWordToMap = (str: string): { [key: string]: boolean } => {
    return str.replace(/[ .,.]/g, '').split('').reduce<{ [key: string]: boolean }>((acc, letter) => {
        acc[letter.toUpperCase()] = false;
        return acc;
    }, {});
};

export const allValuesTrue = (obj: { [key: string]: boolean }): boolean => {
    return Object.values(obj).every(value => value === true);
};