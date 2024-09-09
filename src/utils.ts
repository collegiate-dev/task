// Use regex to match <@id> and surrounding spaces, then replace with a single space
const formatMessage = (str) => {
  return str
    .replace(/<@[\d]+>|<@&[\d]+>\s*/g, "")
    .replace(/\s\s+/g, " ")
    .trim();
};

const { getRoleUsers, getUser } = require("./data");

const parseMentions = (message, channel) => {
  const mentionedUsers = message.mentions.users.map((user) =>
    getUser(user.username, "discord")
  );
  const mentionedRoleUsers = message.mentions.roles.reduce((acc, role) => {
    return acc.concat(getRoleUsers(role.name));
  }, []);
  let mentioned = [...new Set(mentionedRoleUsers.concat(mentionedUsers))];

  // filter for finance, admin channels
  // ex: in admin-todos, @Finance will not yield a task
  if (channel.name === "Admin") {
    const admin = getRoleUsers("Admin");
    mentioned = mentioned.filter((user) => admin.includes(user));
  } else if (channel.name === "Finance") {
    const finance = getRoleUsers("Finance").concat(getRoleUsers("Admin"));
    mentioned = mentioned.filter((user) => finance.includes(user));
  }

  return mentioned;
};

module.exports = { formatMessage, parseMentions };
