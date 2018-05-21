export class Task {
  constructor(
    public title: string,
    public description: string,
    public location: Object,
    public reward: number,
    public expires_at: string
  ) {}
}
