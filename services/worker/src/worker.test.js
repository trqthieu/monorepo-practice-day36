const { emailQueue, reportQueue } = require('./worker');

describe('Worker Service', () => {
  it('should add jobs to queue', async () => {
    const job = await emailQueue.add({ to: 'test@example.com', subject: 'Test' });
    expect(job).toHaveProperty('id');
    expect(job.status).toBe('pending');
  });
});
