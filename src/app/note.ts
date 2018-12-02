export class UnitNote {
  constructor(
    public UnitNumber?: string,
    public NoteContent?: string,
    public id?: string,
    public CreatedTimeStamp?: number,
    public CreatedByDisplayName?: string,
    public CreatedByID?: string,
    public UpdatedByDisplayName?: string,
    public UpdatedByID?: string,
    public UpdatedTimeStamp?: number,
    public isPrivate?: boolean
  ) {}
}
