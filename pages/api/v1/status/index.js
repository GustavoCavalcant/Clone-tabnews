import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const versionDatabase = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const activeConnections = await database.query(
    "SELECT count(*)::int FROM pg_stat_activity WHERE state = 'active';",
  );
  response.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        database_version: versionDatabase.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        active_connections: activeConnections.rows[0].count,
      },
    },
  });
}

export default status;
