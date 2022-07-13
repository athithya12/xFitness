import { db } from "../configs";

class BaseAccessor<Model> {
  userId: number;
  table: string;

  constructor(userId: number, table: string) {
    this.userId = userId;
    this.table = table;
  }

  public clientAware() {
    return db<Model>(this.table).where("userId", this.userId);
  }

  public async clientKdAware() {
    return this.clientAware().whereNull("knowledgeEndDate");
  }
}

export default BaseAccessor;
