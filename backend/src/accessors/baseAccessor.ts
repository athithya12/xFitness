import { db } from "../configs";
import { BaseModelFields } from "../models/baseModel";

class BaseAccessor<Model> {
  userId: number;
  table: string;

  constructor(userId: number, table: string) {
    this.userId = userId;
    this.table = table;
  }

  protected _userAware() {
    return db<Model>(this.table).where("userId", this.userId);
  }

  protected _userKdAware() {
    return this._userAware().whereNull("knowledgeEndDate");
  }

  protected _getRecordById(id: number) {
    return this._userKdAware().where("id", id);
  }

  protected _invalidateRecord(id: number) {
    const currentTimestamp = db.fn.now();
    return this._getRecordById(id).update(
      "knowledgeEndDate",
      currentTimestamp
    );
  }

  public async getAllRecords() {
    const records = await this._userKdAware();

    return records;
  }

  public async getRecordById(id: number) {
    const records = await this._userKdAware().where("id", id);

    if (records.length === 0) {
      throw new Error("Record not found");
    }

    return records[0];
  }

  public create(fields: Omit<Model, BaseModelFields>) {
    // @ts-ignore
    fields["userId"] = this.userId;
    // @ts-ignore
    fields["knowledgeBeginDate"] = db.fn.now();
    // @ts-ignore
    return db<Model>(this.table).insert(fields);
  }

  public async update(
    existingRecordId: number,
    fields: Partial<Omit<Model, BaseModelFields>>
  ) {
    let existingRecord = await this.getRecordById(existingRecordId);

    for (const [key, value] of Object.entries(fields)) {
      // @ts-ignore
      existingRecord[key] = value;
    }

    const {
      // @ts-ignore
      id,
      // @ts-ignore
      userId,
      // @ts-ignore
      knowledgeBeginDate,
      // @ts-ignore
      knowledgeEndDate,
      // @ts-ignore
      ...newFields
    } = existingRecord;

    // @ts-ignore
    await this._invalidateRecord(id);

    await this.create(newFields);
  }

  public async deleteRecord(id: number) {
    await this._invalidateRecord(id);
  }
}

export default BaseAccessor;
