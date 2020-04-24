module.exports = (knex, ChannelMessage) => {
  return async (params) => {
    console.log("params in list:", params);
    const channel = params.channelId;
    const allChannelsMessages = await knex
      .select(
        "channel_messages.id",
        "message",
        { to: "channels.name" },
        { from: "users.username" }
      )
      .from("channel_messages")
      .where({ to: channel })
      .innerJoin("users", "channel_messages.from", "=", "users.id")
      .innerJoin("channels", "channel_messages.to", "=", "channels.id");

    const result = [];

    allChannelsMessages.forEach((msg) => {
      result.push(new ChannelMessage(msg));
    });

    /*
   SELECT users.username, channel_messages.message
   FROM channel_messages
   INNER JOIN users ON channel_messages.from = users.id;
    */

    console.log("result:", result);
    return result;
  };
};
