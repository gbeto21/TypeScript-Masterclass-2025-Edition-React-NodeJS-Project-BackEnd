import { checkSchema } from "express-validator";

export const createTaskValidator = checkSchema({
  title: {
    in: ["body"], //query
    notEmpty: true,
    errorMessage: "Title is required",
    isString: true,
    isLength: {
      options: {
        max: 100,
      },
      errorMessage: "Title should at least be 100 chars",
    },
    trim: true,
  },
  description: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    trim: true,
  },
  status: {
    in: ["body"],
    notEmpty: true,
    isIn: {
      options: [["todo", "inProgress", "completed"]],
    },
  },
  priority: {
    in: ["body"],
    notEmpty: true,
    isIn: {
      options: [["high", "low", "normal"]],
    },
  },
  duedate: {
    in: ["body"],
    notEmpty: true,
    isISO8601: true,
  },
});
