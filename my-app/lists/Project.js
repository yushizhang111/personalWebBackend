const { Text, CalendarDay, CloudinaryImage, Relationship, Select } = require("@keystonejs/fields");
const { Content } = require("@keystonejs/field-content");
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
    name: {
      type: Text,
      isRequired: true,
    },
    description: {
      type: Text,
      isRequired: true,
    },
    projectType: {
      type: Select,
      options: ["student", "apollo", "jr"],
      dataType: "string",
    },
    skills: {
      type: Relationship,
      ref: "Skill",
      many: true,
    },
    link: {
      type: Text,
    },
    brandImage: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    thumbnailImage: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    detailImageLeft: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    detailImageMiddle: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    detailImageRight: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    body: {
      type: Content,
    },
    start: {
      type: CalendarDay,
      format: "Do MMMM YYYY",
      yearRangeFrom: "2000",
      yearRangeTo: "2029",
      isRequired: false,
      defaultValue: new Date().toISOString("YYYY-MM-DD").substring(0, 10),
    },
    end: {
      type: CalendarDay,
      format: "Do MMMM YYYY",
      yearRangeFrom: "2000",
      yearRangeTo: "2029",
      isRequired: false,
      defaultValue: new Date().toISOString("YYYY-MM-DD").substring(0, 10),
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
