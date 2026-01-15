import { Dexie, type EntityTable } from 'dexie';

export type AwsFileInfo = {
  id: string;
  key: string;
  url: string;
  expires: number;
}

const db = new Dexie('ai-agent-admin') as Dexie & {
  urls: EntityTable<AwsFileInfo, 'id'>;
};

db.version(1).stores({ 
  urls: '++id, key, url, expires' 
});

export default db;
