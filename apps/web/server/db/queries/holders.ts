// Imports
// ========================================================
import { db } from "../";
import { eq } from 'drizzle-orm';
import { holders } from "../schema";

// Types
// ========================================================
export interface Holder {
  id: string;
  walletAddress: string;
  nftId: string;
  bHoney?: string;
  mutablelUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Query
// ========================================================
export const QUERY_HOLDERS = {
  /**
   * @dev Lists all holders
   * @returns 
   */
  LIST: async (filter: { filterKey: any, filterValue: any } | undefined) => {
    if (filter?.filterKey !== undefined && filter?.filterValue !== undefined) {
      return db.query.holders.findMany({
        where: eq((holders as any)[filter.filterKey], filter.filterValue)
      });
    }
    return db.query.holders.findMany();
  },
  /**
   * @dev Creates new holders
   * @param payload 
   * @returns 
   */
  CREATE: async (payload: Omit<Holder, 'id' | 'createdAt' | 'updatedAt'>) => {
    const date = new Date();
    return db.insert(holders).values({
      ...payload,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    } as Holder).returning({ id: holders.id })
  },
  /**
   * @dev Finds holder by uuid
   * @param id 
   * @returns 
   */
  READ: async (id: string) => {
    return db.query.holders.findFirst({
      where: eq(holders.id, id)
    });
  },
  /**
   * @dev Finds holder by key value
   * @param id 
   * @returns 
   */
  FIND: async ({ key, value }: { key: any, value: any }) => {
    return db.query.holders.findFirst({
      where: eq((holders as any)[key], value)
    });
  },
  /**
   * @dev Updates holder by uuid and payload
   * @param id 
   * @param payload 
   * @returns 
   */
  UPDATE: async (id: string, payload: Partial<Omit<Holder, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const date = new Date();
    return db.update(holders).set({
      ...payload,
      updatedAt: date.toISOString(),
    }).returning({
      id: holders.id
    })
  },
  /**
   * @dev Deletes holder by uuid
   * @param id 
   * @returns 
   */
  DELETE: async (id: string) => {
    return db.delete(holders).where(eq(holders.id, id)).returning({ id: holders.id });
  }
};