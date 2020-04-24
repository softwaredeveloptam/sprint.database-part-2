module.exports = (knex, UserMessage) => {
  return async (params) => {
    const fromUser = params.fromId;
    const channelId = params.toId;
    const message = params.message;
    const sentAt = params.sentAt;

    return knex("user_messages")
      .insert({
        from_id: fromUser,
        to_id: channelId,
        message: message,
        sent_at: sentAt,
      })
      .then(async () => {
        const correctMessages = await knex("user_messages")
          .where({ from_id: fromUser })
          .select(
            "user_messages.id",
            "message",
            { fromUser: "users.username" }
            // { toChannel: "channels.name" }
          )
          .innerJoin("users", "user_messages.from_id", "=", "users.id");
        //.innerJoin("channels", "user_messages.to_id", "=", "channels.id");

        return correctMessages;
      })
      .then((messages) => {
        const result = [];
        // messages.map((msg) => {
        const temp = new UserMessage(messages[0]);
        result.push(temp);
        // });
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
