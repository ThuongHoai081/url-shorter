import { runSeeder } from 'typeorm-extension';
import { AppDataSource } from '../data-source';
import { UserSeed } from './user.seed';
import { UrlSeed } from './url.seed';

async function main() {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    await runSeeder(AppDataSource, UserSeed);
    await runSeeder(AppDataSource, UrlSeed);
  } catch (err) {
    console.error(err instanceof Error ? err.stack : err);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

void main();
