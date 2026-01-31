import { suite, test } from 'mocha';
import { assert } from 'chai';
import { userStore, init } from '../src/models/db.js';
import { testUser } from './fixtures.js';

suite('User store', () => {
  setup(async () => {
    await init();
    await userStore.deleteAll();
  });

  test('create user and get by id', async () => {
    const added = await userStore.addUser(testUser);
    assert.isString(added._id);
    assert.equal(added.firstName, testUser.firstName);
    assert.equal(added.email, testUser.email);
    const found = await userStore.getUserById(added._id);
    assert.deepEqual(found, added);
  });

  test('get user by email', async () => {
    const added = await userStore.addUser(testUser);
    const found = await userStore.getUserByEmail(testUser.email);
    assert.deepEqual(found, added);
  });

  test('deleteAll removes all users', async () => {
    await userStore.addUser(testUser);
    await userStore.deleteAll();
    const all = await userStore.getAllUsers();
    assert.equal(all.length, 0);
  });

  test('deleteUserById removes one user', async () => {
    const added = await userStore.addUser(testUser);
    await userStore.deleteUserById(added._id);
    const found = await userStore.getUserById(added._id);
    assert.isNull(found);
  });
});
