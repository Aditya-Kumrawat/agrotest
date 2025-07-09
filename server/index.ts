import { createServer } from './app';

export { createServer };

if (require.main === module) {
  const app = createServer();
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AgroSaarthi Backend running on port ${PORT}`)
  })
}