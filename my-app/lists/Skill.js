const { Text, Select } = require("@keystonejs/fields");

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    skillType: {
      type: Select,
      options: [
        { value: "Frontend", label: "Front End" },
        { value: "Backend", label: "Back End" },
        { value: "UI", label: "UI and UX Design" },
        { value: "CP", label: "Cloud Platform" },
        { value: "PM", label: "Project Management" },
        { value: "ML", label: "Machine Learning" },
        { value: "Language", label: "Language" },
        { value: "SEO", label: "SEO" },
        { value: "Other", label: "Other" }
      ],
      dataType: "string",
    },
  },
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};
