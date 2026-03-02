import { log } from '@logtail/next';

export async function register() {
  // Better Stack log ingestion is initialized via withLogtail in next.config.ts.
  // This hook ensures the logger is active in all runtimes.
  if (process.env.BETTER_STACK_SOURCE_TOKEN) {
    log.info('sqwr-site started', { env: process.env.NODE_ENV });
  }
}
