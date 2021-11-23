const RULES = {
  STATUS: [
    { value: 1, text: "Active" },
    { value: 2, text: "Anonymous" },
    { value: 3, text: "Created" },
    { value: 4, text: "Deactivated" },
  ],
  ACTIONS: [
    { value: 2, text: "Anonymous" },
    { value: 4, text: "Deactivated" },
    { value: 5, text: "Delete" },
  ],
  PERIODS: [
    {
      value: 1,
      text: "X days fater",
      selectedText: "days after",
    },
    {
      value: 2,
      text: "Users's first day",
      selectedText: "On users's first day",
      children: [
        {
          value: 4,
          text: "X days before user's first day",
          selectedText: "days before user's first day",
          showSlot: true,
        },
        {
          value: 5,
          text: "X days after user's first day",
          selectedText: "days after user's first day",
          showSlot: true,
        },
      ],
    },
    {
      value: 3,
      text: "User's last day ",
      children: [
        {
          value: 6,
          text: "X days before user's last day",
          selectedText: "days before user's last day",
          showSlot: true,
        },
        {
          value: 7,
          text: "X days after user's last day",
          selectedText: "days after user's last day",
          showSlot: true,
        },
      ],
    },
  ],
}

module.exports = {
  RULES: RULES,
};