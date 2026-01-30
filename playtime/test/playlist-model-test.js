import { suite, test } from 'mocha';
import { assert } from 'chai';
import { userStore, playlistStore } from '../src/models/db.js';
import { testUser } from './fixtures.js';

suite('Playlist store', () => {
  let testUserId;

  setup(async () => {
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
    await playlistStore.addPlaylist({ userid: otherUser._id, title: 'Other List' });
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
