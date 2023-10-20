import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  getHelp(): string {
    return 'AAAAA HELP';
  }

  private supabase = createClient(
    'https://hyagbaoifhjhwugdmohb.supabase.com',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YWdiYW9pZmhqaHd1Z2Rtb2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2OTg3MzksImV4cCI6MjAxMzI3NDczOX0.z3_mXsmg6Ojv_NN0Tl0tND9dTXNdNPZsDeHvt7K2EEo',
  );

  async queryData() {
    console.log('data');
  }
}
