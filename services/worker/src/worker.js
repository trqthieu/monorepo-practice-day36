class JobQueue {
  constructor(name) {
    this.name = name;
    this.jobs = [];
  }

  async add(jobData) {
    const job = {
      id: Date.now(),
      data: jobData,
      status: 'pending',
      createdAt: new Date(),
    };
    this.jobs.push(job);
    console.log(`[${this.name}] Job added:`, job.id);
    return job;
  }

  async process(handler) {
    console.log(`[${this.name}] Worker started`);
    setInterval(async () => {
      const job = this.jobs.find(j => j.status === 'pending');
      if (job) {
        job.status = 'processing';
        try {
          await handler(job);
          job.status = 'completed';
          console.log(`[${this.name}] Job ${job.id} completed`);
        } catch (error) {
          job.status = 'failed';
          console.error(`[${this.name}] Job ${job.id} failed:`, error);
        }
      }
    }, 2000);
  }
}

// Job processors
const emailQueue = new JobQueue('email');
const reportQueue = new JobQueue('report');

async function sendEmail(job) {
  const { to, subject } = job.data;
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`📧 Email sent to ${to}: ${subject}`);
}

async function generateReport(job) {
  const { reportType, userId } = job.data;
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(`📊 Report generated: ${reportType} for user ${userId}`);
}

// Start workers
emailQueue.process(sendEmail);
reportQueue.process(generateReport);

// Add sample jobs
setTimeout(() => {
  emailQueue.add({ to: 'user@example.com', subject: 'Welcome!' });
  reportQueue.add({ reportType: 'monthly-sales', userId: 123 });
}, 1000);

console.log('🚀 Worker service started');

module.exports = { emailQueue, reportQueue };
