export interface HashCompare {
    hashCompare: (value: string, hash: string) => Promise<boolean>
}
