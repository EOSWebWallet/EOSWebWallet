export class AdvensedPermissions {
  constructor (
        public weight: number,
        public permission: string,
        public parent: string,
        public threshold: number
    ) {}
}

export class Authorities{
    constructor (
    public authority: string
    ) {}
}