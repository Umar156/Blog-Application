export const USER_TABLE_COLUMNS = [
  {
    title: "ID",
    key: "id",
    type: "string",
  },
  {
    title: "Name",
    key: "name",
    type: "string",
  },
  {
    title: "Username",
    key: "username",
    type: "string",
  },
  {
    title: "Email",
    key: "email",
    type: "string",
  },
  {
    title: "Role",
    key: "role",
    type: "string",
  },
  {
    title: "Created",
    key: "created_at",
    type: "date",
  },
];

export const ADMINS_TABLE_COLUMNS = [
  {
    title: "ID",
    key: "id",
    type: "string",
  },
  {
    title: "Name",
    key: "name",
    type: "string",
  },
  {
    title: "Username",
    key: "username",
    type: "string",
  },
  {
    title: "Email",
    key: "email",
    type: "string",
  },
  {
    title: "Role",
    key: "role",
    type: "string",
  },
  {
    title: "Created",
    key: "created_at",
    type: "date",
  },
];

export const ARTICLES_TABLE_COLUMNS = [
  {
    title: "ID",
    key: "id",
    type: "string",
  },
  {
    title: "Title",
    key: "title",
    type: "string",
  },
  {
    title: "Body",
    key: "body",
    type: "string",
  },
  {
    title: "User",
    key: "user.name",
    type: "string",
  },
  {
    title: "Created",
    key: "created_at",
    type: "date",
  },
];
