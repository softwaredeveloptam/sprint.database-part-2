module.exports = (knex, ChannelMessage) => {
  return async (params) => {
    const channel = params.channelId;
    console.log("params:", params);
    const allChannelsMessages = await knex
      .select("id", "from", "message", "to")
      .where({ to: channel })
      .from("channel_messages");
    const result = [];
    allChannelsMessages.forEach((msg) => {
      result.push(new ChannelMessage(msg));
    });
    return result;
  };
};
