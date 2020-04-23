module.exports = (knex, User) => {
  return async () => {
    const allUsers = await knex.select("id", "username").from("users");
    const result = [];
    allUsers.forEach((user) => {
      result.push(new User(user));
    });
    return result;
  };
};
