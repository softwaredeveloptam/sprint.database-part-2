module.exports = (knex, Channel) => {
  return async () => {
    const allChannels = await knex.select("id", "name").from("channels");
    const result = [];
    allChannels.forEach((channel) => {
      result.push(new Channel(channel));
    });
    return result;
  };
};
