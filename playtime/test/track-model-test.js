import { suite, test } from 'mocha';
import { assert } from 'chai';
import {
  userStore,
  playlistStore,
  trackStore,
  init,
} from '../src/models/db.js';
import { testUser } from './fixtures.js';

suite('Track store', () => {
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
