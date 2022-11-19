export interface HashCompare {
    compare: (password: string, hash: string) => Promise<boolean>
}
