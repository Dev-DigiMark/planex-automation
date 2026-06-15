import { test } from '@playwright/test';
import fs from 'fs';

test('Check file path', async () => {

  const filePath = 'tests/test-data/Scintia Outreach Content (1).pdf';

  console.log('Path:', filePath);
  console.log('File Exists:', fs.existsSync(filePath));

});