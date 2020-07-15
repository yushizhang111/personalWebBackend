const {
  Text,
  CalendarDay,
  CloudinaryImage,
  Relationship
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
    uni: {
      type: Text,
      isRequired: true
    },
    degree: {
      type: Text,
      isRequired: true
    },
    description: {
      type: Text
    },
    project: {
      type: Relationship,
      ref: "Project",
      many: true
    },
    skills: {
      type: Relationship,
      ref: "Skill",
      many: true
    },
    brandImage: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    thumbnailImage: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    start: {
      type: CalendarDay,
      format: "Do MMMM YYYY",
      yearRangeFrom: "2000",
      yearRangeTo: "2029",
      isRequired: false,
      defaultValue: new Date().toISOString("YYYY-MM-DD").substring(0, 10)
    },
    end: {
      type: CalendarDay,
      format: "Do MMMM YYYY",
      yearRangeFrom: "2000",
      yearRangeTo: "2029",
      isRequired: false,
      defaultValue: new Date().toISOString("YYYY-MM-DD").substring(0, 10)
    }
  },
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true
  }
};
