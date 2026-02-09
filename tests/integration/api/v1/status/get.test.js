test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);

  console.log("Response body:", responseBody);

  const fakeResponseDatabase = {
    dependencies: {
      database: {
        database_version: "18.1",
        max_connections: 100,
        active_connections: 1,
      },
    },
  };

  expect(responseBody.dependencies.database.database_version).toBe(
    fakeResponseDatabase.dependencies.database.database_version,
  );

  expect(responseBody.dependencies.database.max_connections).toBe(
    fakeResponseDatabase.dependencies.database.max_connections,
  );

  expect(responseBody.dependencies.database.active_connections).toBe(
    fakeResponseDatabase.dependencies.database.active_connections,
  );
});
