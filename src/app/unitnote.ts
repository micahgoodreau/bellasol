export class UnitNote {
  constructor(
    public UnitNumber?: string,
    public NoteContent?: string,
    public id?: string,
    public CreatedAt?: number,
    public CreatedBy?: string,
    public CreatedByID?: string,
    public UpdatedBy?: string,
    public UpdatedByID?: string,
    public UpdatedAt?: number,
    public isPrivate?: boolean
  ) {}
}
