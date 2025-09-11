import { runSeeder } from 'typeorm-extension';
import { AppDataSource } from '../data-source';
import { UserSeed } from './user.seed';

async function main() {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    await runSeeder(AppDataSource, UserSeed);
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
