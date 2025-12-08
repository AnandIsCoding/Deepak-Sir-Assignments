// Every item must have an id
export interface HasId {
  id: string | number;
}

export class DataStorage<T extends HasId> {
  private data: T[] = [];

  save(item: T) {
    this.data.push(item);
  }

  findById(id: string | number) {
    return this.data.find(item => item.id === id);
  }

  list() {
    return this.data;
  }
}
