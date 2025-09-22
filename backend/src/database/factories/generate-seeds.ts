import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, basename } from 'path';

// const factoriesDir = join(__dirname);
// const seedsDir = join(__dirname, '../seeds');
const factoriesDir = join(process.cwd(), 'src/database/factories');
const seedsDir = join(process.cwd(), 'src/database/seeds');

if (!existsSync(seedsDir)) {
  try {
    mkdirSync(seedsDir, { recursive: true });
  } catch (err) {
    throw new Error(`Failed to create seeds directory: ${err}`);
  }
}

const args = process.argv.slice(2);
const targetFactory = args[0] ?? '';
const recordCount = parseInt(args[1] ?? '10');
if (isNaN(recordCount) || recordCount <= 0) {
  throw new Error(`Invalid record count: ${args[1]}`);
}

let factoryFiles: string[];
try {
  factoryFiles = readdirSync(factoriesDir).filter((f) =>
    f.endsWith('.factory.ts'),
  );
} catch (err) {
  throw new Error(`Failed to read factories directory: ${err}`);
}

if (targetFactory) {
  factoryFiles = factoryFiles.filter(
    (f) => basename(f, '.factory.ts') === targetFactory,
  );
}

if (factoryFiles.length === 0) {
  throw new Error(
    `No factory file found to generate seed${targetFactory ? ` for "${targetFactory}"` : ''}`,
  );
}

factoryFiles.forEach((file) => {
  const factoryName = basename(file, '.factory.ts');
  const seedClassName =
    factoryName.charAt(0).toUpperCase() + factoryName.slice(1) + 'Seed';
  const entityImport = `../../modules/${factoryName}/entities/${factoryName}.entity`;
  const factoryImport = `../factories/${factoryName}.factory`;

  const seedFileName = `${factoryName}.seed.ts`;
  const seedFilePath = join(seedsDir, seedFileName);

  const content = `import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ${seedClassName.replace('Seed', 'Entity')} } from '${entityImport}';
import { ${factoryName}Factory } from '${factoryImport}';

export class ${seedClassName} implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(${seedClassName.replace('Seed', 'Entity')});
    const itemsPromises = Array.from({ length: ${recordCount} }, () => ${factoryName}Factory());
    const items = await Promise.all(itemsPromises);
    await repo.insert(items);
  }
}
`;

  try {
    writeFileSync(seedFilePath, content);
  } catch (err) {
    throw new Error(`Failed to write seed file "${seedFileName}": ${err}`);
  }
});
