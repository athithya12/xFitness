export interface BaseModel {
  id: number;
  userId: number;
  knowledgeBeginDate: Date;
  knowledgeEndDate: Date | null;
}

export type BaseModelFields =
  | "id"
  | "userId"
  | "knowledgeBeginDate"
  | "knowledgeEndDate";
