import fs from 'fs';
import path from 'path';

export const LOCALE_OPTIONS = ['en', 'cy'];

const fetchGlobalLocales = (option: string) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, 'globals', `${option}.json`),
      'utf-8'
    );
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

const findLocaleFolders = (route: string) => {
  const localeFolders: string[] = [];
  const items = fs.readdirSync(route);
  items.forEach(item => {
    const itemPath = path.join(route, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // If the item is a directory, check if it contains "locales"
      if (item.toLowerCase() === 'locales') {
        localeFolders.push(itemPath);
      } else {
        // If not, recursively search within this directory
        const nestedLocaleFolders = findLocaleFolders(itemPath);
        localeFolders.push(...nestedLocaleFolders);
      }
    }
  });
  return localeFolders;
};

const createJSONFiles = (localesFolders: string[]) => {
  const langs: { [x: string]: { [v: string]: string } } = {};

  LOCALE_OPTIONS.forEach(option => {
    // load the global locales into memory
    langs[option] = fetchGlobalLocales(option);

    // read each locale in routes and put into memory
    localesFolders.forEach(localeFolder => {
      try {
        const data = fs.readFileSync(
          path.join(`${localeFolder}/${option}.json`),
          'utf-8'
        );
        langs[option] = { ...langs[option], ...JSON.parse(data) };
      } catch (error: any) {
        console.error(`${error.message} in ${localeFolder}`);
      }
    });

    // write data back into file with all localed merged into one file
    if (langs[option]) {
      fs.writeFileSync(
        `${__dirname}/${option}.json`,
        JSON.stringify(langs[option])
      );
    }
  });
};

export const buildLocaleJSONFiles = () => {
  createJSONFiles(findLocaleFolders(path.join(__dirname, '../routes')));
};
