declare function mergeStringMapList<T>(ms: {
    [name: string]: T;
}[]): {
    [name: string]: T;
};
export = mergeStringMapList;
