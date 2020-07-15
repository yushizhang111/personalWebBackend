const {
  Text,
  CalendarDay,
  CloudinaryImage,
  Relationship,
} = require("@keystonejs/fields");
const { CloudinaryAdapter } = require("@keystonejs/file-adapters");

const cloudinaryAdapter = new CloudinaryAdapter({
  cloudName: "c-plus-lab",
  apiKey: "476969147681262",
  apiSecret: "FnsDYpPtIQjo7GO2DSTyp3CpnGg",
  folder: "personal-website-projects"
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

module.exports = {
  fields: {
    position: {
      type: Text,
      isRequired: true,
    },
    company: {
      type: Text,
      isRequired: true,
    },
    start: {
      type: Text,
    },
    end: {
      type: Text,
    },
    description: {
      type: Text,
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
