module.exports = function renameAcessPoint(client, mac, name) {
  return client
    .post('/configuration/object/ap_rename')
    .send({
      'wired-mac': mac,
      'new-name': name,
    });
};
