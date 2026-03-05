import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'heritageflow',
});

const sites = [
  { name: 'Médina de Tunis', location: 'Tunis, Tunisie', category: 'archaeology', description: 'Ancienne médina avec souks traditionnels et mosquées historiques', latitude: 36.7969, longitude: 10.1669, currentVisitors: 4500, maxCapacity: 8000 },
  { name: 'Amphithéâtre d\'El Djem', location: 'El Djem, Tunisie', category: 'monument', description: 'Amphithéâtre romain du 3e siècle, le plus grand d\'Afrique du Nord', latitude: 35.2969, longitude: 10.7347, currentVisitors: 3200, maxCapacity: 7000 },
  { name: 'Dougga', location: 'Dougga, Tunisie', category: 'archaeology', description: 'Site archéologique romain avec temples, théâtre et maisons anciennes', latitude: 36.4617, longitude: 9.2267, currentVisitors: 2800, maxCapacity: 6000 },
  { name: 'Kairouan', location: 'Kairouan, Tunisie', category: 'monument', description: 'Ville sainte avec la Grande Mosquée et médina historique', latitude: 35.6711, longitude: 10.0967, currentVisitors: 3500, maxCapacity: 7500 },
  { name: 'Musée du Bardo', location: 'Tunis, Tunisie', category: 'museum', description: 'Musée national avec mosaïques romaines et artefacts archéologiques', latitude: 36.8033, longitude: 10.1658, currentVisitors: 5600, maxCapacity: 10000 },
  { name: 'Carthage', location: 'Carthage, Tunisie', category: 'archaeology', description: 'Ruines de l\'ancienne cité punique et romaine', latitude: 36.8621, longitude: 10.3268, currentVisitors: 4200, maxCapacity: 8500 },
  { name: 'Île de Djerba', location: 'Djerba, Tunisie', category: 'monument', description: 'Île historique avec synagogues anciennes et forteresses', latitude: 33.8869, longitude: 10.9369, currentVisitors: 6800, maxCapacity: 12000 },
  { name: 'Sidi Bou Saïd', location: 'Sidi Bou Saïd, Tunisie', category: 'monument', description: 'Village côtier pittoresque avec architecture traditionnelle bleue et blanche', latitude: 36.8689, longitude: 10.3597, currentVisitors: 5200, maxCapacity: 9000 },
  { name: 'Tozeur', location: 'Tozeur, Tunisie', category: 'monument', description: 'Oasis du désert avec architecture traditionnelle et palmeraie', latitude: 33.9197, longitude: 8.1347, currentVisitors: 2900, maxCapacity: 6000 },
  { name: 'Sbeitla', location: 'Sbeitla, Tunisie', category: 'archaeology', description: 'Site archéologique romain avec temples et basiliques byzantines', latitude: 35.7833, longitude: 9.7833, currentVisitors: 1800, maxCapacity: 4500 },
];

for (const site of sites) {
  await connection.execute(
    'INSERT INTO heritageSites (name, location, category, description, latitude, longitude, currentVisitors, maxCapacity, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [site.name, site.location, site.category, site.description, site.latitude, site.longitude, site.currentVisitors, site.maxCapacity]
  );
}

console.log('✅ 10 sites patrimoniaux tunisiens insérés avec succès!');
await connection.end();
