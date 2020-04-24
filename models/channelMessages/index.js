const moment = require("moment");

const ChannelMessage = function(dbChannelMessage) {
  this.id = dbChannelMessage.id;
  this.from = dbChannelMessage.from;
  this.to = dbChannelMessage.to;
  this.message = dbChannelMessage.message;
  this.sentAt = new Date(dbChannelMessage.sent_at);
};

ChannelMessage.prototype.serialize = function() {
  return {
    id: this.id,
    from: this.fromUser,
    to: this.toChannel,
    message: this.message,
    sentAt: moment(this.sentAt).fromNow(),
  };
};

module.exports = (knex) => ({
  create: require("./create")(knex, ChannelMessage),
  list: require("./list")(knex, ChannelMessage),
});
