const validateChannelName = (channelName) =>
  typeof channelName === "string" && channelName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    const name = params.name;

    //check if valid channel name
    if (!validateChannelName(name)) {
      return Promise.reject(
        new Error(
          "Channel name must be provided, and be at least four characters"
        )
      );
    }

    return knex("channels")
      .insert({ name: name.toLowerCase() })
      .then(() => {
        return knex("channels")
          .where({ name: name.toLowerCase() })
          .select();
      })
      .then((channels) => {
        return new Channel(channels.pop()); // create a user model out of the plain database response
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
