import { MongoClient, Db } from "mongodb";

// 使用环境变量或默认值
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // 开发模式下，使用全局变量避免重复连接
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // 生产模式
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// 获取数据库实例的辅助函数
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB_NAME || "next-tailwind-template");
}

