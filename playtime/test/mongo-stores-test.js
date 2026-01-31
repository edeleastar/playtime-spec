/**
 * Mongo store unit tests. Run with MONGO_URI set to test against MongoDB.
 * Example: MONGO_URI=mongodb://localhost:27017/playtime_test npm test
 */

import { suite, test } from 'mocha';
import { assert } from 'chai';
import {
  userStore,
  playlistStore,
  trackStore,
  init,
} from '../src/models/db.js';
import { testUser } from './fixtures.js';

const runMongoTests = !!process.env.MONGO_URI;
const describeOrSkip = runMongoTests ? suite : suite.skip;

describeOrSkip('Mongo stores', () => {
  suite('User Mongo store', () => {
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

  suite('Playlist Mongo store', () => {
    let testUserId;

    setup(async () => {
      await init();
      await playlistStore.deleteAllPlaylists();
      await userStore.deleteAll();
      const user = await userStore.addUser(testUser);
      testUserId = user._id;
    });

    test('addPlaylist and getPlaylistById', async () => {
      const added = await playlistStore.addPlaylist({
        userid: testUserId,
        title: 'My List',
      });
      assert.isString(added._id);
      assert.equal(added.userid, testUserId);
      assert.equal(added.title, 'My List');
      const found = await playlistStore.getPlaylistById(added._id);
      assert.equal(found.title, added.title);
      assert.isArray(found.tracks);
      assert.equal(found.tracks.length, 0);
    });

    test('getUserPlaylists filters by owner', async () => {
      await playlistStore.addPlaylist({ userid: testUserId, title: 'List 1' });
      await playlistStore.addPlaylist({ userid: testUserId, title: 'List 2' });
      const otherUser = await userStore.addUser({
        firstName: 'Other',
        lastName: 'User',
        email: 'other@test.com',
        password: 'x',
      });
      await playlistStore.addPlaylist({
        userid: otherUser._id,
        title: 'Other List',
      });
      const userPlaylists = await playlistStore.getUserPlaylists(testUserId);
      assert.equal(userPlaylists.length, 2);
      assert.isTrue(userPlaylists.every((p) => p.userid === testUserId));
    });

    test('deletePlaylistById removes playlist', async () => {
      const added = await playlistStore.addPlaylist({
        userid: testUserId,
        title: 'To Delete',
      });
      await playlistStore.deletePlaylistById(added._id);
      const found = await playlistStore.getPlaylistById(added._id);
      assert.isNull(found);
    });

    test('deleteAllPlaylists removes all', async () => {
      await playlistStore.addPlaylist({ userid: testUserId, title: 'A' });
      await playlistStore.addPlaylist({ userid: testUserId, title: 'B' });
      await playlistStore.deleteAllPlaylists();
      const all = await playlistStore.getAllPlaylists();
      assert.equal(all.length, 0);
    });
  });

  suite('Track Mongo store', () => {
    let testPlaylistId;

    setup(async () => {
      await init();
      await trackStore.deleteAllTracks();
      await playlistStore.deleteAllPlaylists();
      await userStore.deleteAll();
      const user = await userStore.addUser(testUser);
      const playlist = await playlistStore.addPlaylist({
        userid: user._id,
        title: 'Test Playlist',
      });
      testPlaylistId = playlist._id;
    });

    test('addTrack and getTrackById', async () => {
      const added = await trackStore.addTrack(testPlaylistId, {
        title: 'Song One',
        artist: 'Artist A',
        duration: 180,
      });
      assert.isString(added._id);
      assert.equal(added.playlistid, testPlaylistId);
      assert.equal(added.title, 'Song One');
      assert.equal(added.artist, 'Artist A');
      assert.equal(added.duration, 180);
      const found = await trackStore.getTrackById(added._id);
      assert.deepEqual(found, added);
    });

    test('getTracksByPlaylistId filters by playlist', async () => {
      await trackStore.addTrack(testPlaylistId, { title: 'A', artist: 'X' });
      await trackStore.addTrack(testPlaylistId, { title: 'B', artist: 'Y' });
      const user = await userStore.getUserByEmail(testUser.email);
      const otherList = await playlistStore.addPlaylist({
        userid: user._id,
        title: 'Other List',
      });
      await trackStore.addTrack(otherList._id, { title: 'C', artist: 'Z' });
      const tracks = await trackStore.getTracksByPlaylistId(testPlaylistId);
      assert.equal(tracks.length, 2);
      assert.isTrue(tracks.every((t) => t.playlistid === testPlaylistId));
    });

    test('deleteTrack removes track', async () => {
      const added = await trackStore.addTrack(testPlaylistId, {
        title: 'To Delete',
        artist: 'X',
      });
      await trackStore.deleteTrack(added._id);
      const found = await trackStore.getTrackById(added._id);
      assert.isNull(found);
    });

    test('deleteAllTracks removes all', async () => {
      await trackStore.addTrack(testPlaylistId, { title: 'A', artist: 'X' });
      await trackStore.addTrack(testPlaylistId, { title: 'B', artist: 'Y' });
      await trackStore.deleteAllTracks();
      const all = await trackStore.getAllTracks();
      assert.equal(all.length, 0);
    });
  });
});
