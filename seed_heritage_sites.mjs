import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'heritageflow',
});

const sites = [
  { name: 'Colosseum', location: 'Rome, Italy', category: 'monument', description: 'Ancient Roman amphitheater', latitude: 41.8902, longitude: 12.4924, currentVisitors: 5234, maxCapacity: 10000 },
  { name: 'Sagrada Familia', location: 'Barcelona, Spain', category: 'monument', description: 'Basilica under construction since 1883', latitude: 41.4036, longitude: 2.1744, currentVisitors: 3421, maxCapacity: 8000 },
  { name: 'Louvre Museum', location: 'Paris, France', category: 'museum', description: 'Worlds largest art museum', latitude: 48.8606, longitude: 2.3352, currentVisitors: 8932, maxCapacity: 15000 },
  { name: 'Great Wall', location: 'China', category: 'monument', description: 'Ancient defensive wall', latitude: 40.4319, longitude: 116.5704, currentVisitors: 12000, maxCapacity: 20000 },
  { name: 'Taj Mahal', location: 'Agra, India', category: 'monument', description: 'Mausoleum of white marble', latitude: 27.1751, longitude: 78.0421, currentVisitors: 6543, maxCapacity: 12000 },
  { name: 'British Museum', location: 'London, UK', category: 'museum', description: 'Museum of human history and culture', latitude: 51.5194, longitude: -0.1270, currentVisitors: 7654, maxCapacity: 14000 },
  { name: 'Acropolis', location: 'Athens, Greece', category: 'archaeology', description: 'Ancient Greek citadel', latitude: 37.9715, longitude: 23.7267, currentVisitors: 4321, maxCapacity: 9000 },
  { name: 'Statue of Liberty', location: 'New York, USA', category: 'monument', description: 'Colossal neoclassical sculpture', latitude: 40.6892, longitude: -74.0445, currentVisitors: 2543, maxCapacity: 5000 },
  { name: 'Uffizi Gallery', location: 'Florence, Italy', category: 'museum', description: 'Renaissance art museum', latitude: 43.7674, longitude: 11.2556, currentVisitors: 5432, maxCapacity: 10000 },
  { name: 'Angkor Wat', location: 'Cambodia', category: 'archaeology', description: 'Largest religious monument in the world', latitude: 13.3667, longitude: 103.8667, currentVisitors: 3210, maxCapacity: 8000 },
];

for (const site of sites) {
  await connection.execute(
    'INSERT INTO heritageSites (name, location, category, description, latitude, longitude, currentVisitors, maxCapacity, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [site.name, site.location, site.category, site.description, site.latitude, site.longitude, site.currentVisitors, site.maxCapacity]
  );
}

console.log('✅ 10 heritage sites inserted successfully!');
await connection.end();
