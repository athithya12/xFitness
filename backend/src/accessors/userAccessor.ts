import { db } from "../configs";
import { UserModel } from "../models";

class UserAccessor {
  userId: number;
  table: string;

  constructor(userId: number) {
    this.userId = userId;
    this.table = "users";
  }

  public clientAware() {
    return db<UserModel>(this.table).where("id", this.userId);
  }

  public async clientKdAware() {
    return this.clientAware().whereNotNull("knowledgeEndDate");
  }
}

export default UserAccessor;
