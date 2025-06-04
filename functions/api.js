const { Client } = require('pg');
const { onRequest } = require('firebase-functions/v2/https');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });

const app = express();
app.use(cors);
app.use(express.json());

let usersPool;
let estimateRequestsPool;

async function getUsersPool() {
  if (!usersPool) {
    const host = await functions.secrets.USERS_DB_HOST.value();
    const port = await functions.secrets.USERS_DB_PORT.value();
    const user = await functions.secrets.USERS_DB_USER.value();
    const password = await functions.secrets.USERS_DB_PASSWORD.value();
    const database = await functions.secrets.USERS_DB_DATABASE.value();

    usersPool = new Client({
      host,
      port,
      user,
      password,
      database,
    });
  }
  return usersPool;
}

async function getEstimateRequestsPool() {
  if (!estimateRequestsPool) {
    const host = await functions.secrets.ESTIMATE_REQUESTS_DB_HOST.value();
    const port = await functions.secrets.ESTIMATE_REQUESTS_DB_PORT.value();
    const user = await functions.secrets.ESTIMATE_REQUESTS_DB_USER.value();
    const password = await functions.secrets.ESTIMATE_REQUESTS_DB_PASSWORD.value();
    const database = await functions.secrets.ESTIMATE_REQUESTS_DB_DATABASE.value();

    estimateRequestsPool = new Client({
      host,
      port,
      user,
      password,
      database,
    });
  }
  return estimateRequestsPool;
}

// --- Users API Endpoints ---

app.post('/users', async (req, res) => {
  try {
    const pool = await getUsersPool();
    const client = await pool.connect();
    const { userId, email, role, firstName, lastName, phoneNumber } = req.body;
    await client.query(
      'INSERT INTO users (userId, email, role, firstName, lastName, phoneNumber) VALUES ($1, $2, $3, $4, $5, $6)',
      [userId, email, role, firstName, lastName, phoneNumber],
    );
    client.release();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ error: 'Failed to create user' });
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const pool = await getUsersPool();
    const client = await pool.connect();
    const { userId } = req.params;
    const result = await client.query('SELECT * FROM users WHERE userId = $1', [userId]);
    client.release();
    if (result.rows.length > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).send({ error: 'Failed to get user' });
  }
});

app.put('/users/:userId', async (req, res) => {
  try {
    const pool = await getUsersPool();
    const client = await pool.connect();
    const { userId } = req.params;
    const { email, role, firstName, lastName, phoneNumber } = req.body;
    await client.query(
      'UPDATE users SET email = $1, role = $2, firstName = $3, lastName = $4, phoneNumber = $5 WHERE userId = $6',
      [email, role, firstName, lastName, phoneNumber, userId],
    );
    client.release();
    res.send({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ error: 'Failed to update user' });
  }
});

app.delete('/users/:userId', async (req, res) => {
  try {
    const pool = await getUsersPool();
    const client = await pool.connect();
    const { userId } = req.params;
    await client.query('DELETE FROM users WHERE userId = $1', [userId]);
    client.release();
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ error: 'Failed to delete user' });
  }
});

// --- Estimate Requests API Endpoints ---

app.post('/estimate-requests', async (req, res) => {
  try {
    const pool = await getEstimateRequestsPool();
    const client = await pool.connect();
    const { userId, estimateData, images, scopeOfWork } = req.body;
    await client.query(
      'INSERT INTO estimate_requests (userId, estimateData, images, scopeOfWork) VALUES ($1, $2, $3, $4)',
      [userId, JSON.stringify(estimateData), images, scopeOfWork],
    );
    client.release();
    res.status(201).send({ message: 'Estimate request created successfully' });
  } catch (error) {
    console.error('Error creating estimate request:', error);
    res.status(500).send({ error: 'Failed to create estimate request' });
  }
});

app.get('/estimate-requests', async (req, res) => {
  try {
    const pool = await getEstimateRequestsPool();
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM estimate_requests');
    client.release();
    res.send(result.rows);
  } catch (error) {
    console.error('Error getting estimate requests:', error);
    res.status(500).send({ error: 'Failed to get estimate requests' });
  }
});

app.get('/estimate-requests/:id', async (req, res) => {
  try {
    const pool = await getEstimateRequestsPool();
    const client = await pool.connect();
    const { id } = req.params;
    const result = await client.query('SELECT * FROM estimate_requests WHERE id = $1', [id]);
    client.release();
    if (result.rows.length > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({ message: 'Estimate request not found' });
    }
  } catch (error) {
    console.error('Error getting estimate request:', error);
    res.status(500).send({ error: 'Failed to get estimate request' });
  }
});

app.put('/estimate-requests/:id', async (req, res) => {
  try {
    const pool = await getEstimateRequestsPool();
    const client = await pool.connect();
    const { id } = req.params;
    const { userId, estimateData, images, scopeOfWork } = req.body;
    await client.query(
      'UPDATE estimate_requests SET userId = $1, estimateData = $2, images = $3, scopeOfWork = $4 WHERE id = $5',
      [userId, JSON.stringify(estimateData), images, scopeOfWork, id],
    );
    client.release();
    res.send({ message: 'Estimate request updated successfully' });
  } catch (error) {
    console.error('Error updating estimate request:', error);
    res.status(500).send({ error: 'Failed to update estimate request' });
  }
});

app.delete('/estimate-requests/:id', async (req, res) => {
  try {
    const pool = await getEstimateRequestsPool();
    const client = await pool.connect();
    const { id } = req.params;
    await client.query('DELETE FROM estimate_requests WHERE id = $1', [id]);
    client.release();
    res.send({ message: 'Estimate request deleted successfully' });
  } catch (error) {
    console.error('Error deleting estimate request:', error);
    res.status(500).send({ error: 'Failed to delete estimate request' });
  }
});

exports.api = onRequest(app);
