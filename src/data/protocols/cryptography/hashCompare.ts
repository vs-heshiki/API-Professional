export interface HashCompare {
    compareHash: (value: string, hash: string) => Promise<boolean>
}
