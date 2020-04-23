module.exports = (knex, ChannelMessage) => {
  return (params) => {
    console.log("params:", params);
    const fromId = params.fromId;
    const channelId = params.channelId;
    const message = params.message;
    const sentAt = params.sent_at;

    return knex("channel_messages")
      .insert({
        from: fromId,
        to: channelId,
        message: message,
        sent_at: sentAt,
      })
      .then(() => {
        return knex("channel_messages")
          .where({ to: channelId })
          .select();
      })
      .then((messages) => {
        const result = [];
        messages.map((msg) => {
          const temp = new ChannelMessage(msg);
          result.push(temp);
        });
        return result;
      })
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(
            new Error("A channel with that name already exists.")
          );

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
