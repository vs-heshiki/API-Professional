export interface Hasher {
    genHash: (value: string) => Promise<string>
}
