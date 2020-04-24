module.exports = (knex, UserMessage) => {
  return async (params) => {
    console.log("params:", params);
    const fromId = params.fromId;
    // return Promise.resolve([]); // fix me!

    const allMsgsFromAUser = await knex
      .select(
        "user_messages.id",
        "users_messages.from_id",
        "message",
        { to: "channels.name" },
        { from: "users.username" }
      )
      .from("user_messages")
      .where({ from: fromId })
      .innerJoin("users", "users_messages.from_id", "=", "users.id")
      .innerJoin("channels", "channel_messages.to_id", "=", "channels.id");

    const result = [];

    // console.log("allChannelsMessages:", allChannelsMessages);
    allMsgsFromAUser.forEach((msg) => {
      console.log(msg, "<----- Each Machine");
      result.push(new UserMessage(msg));
    });

    return result;
  };
};
