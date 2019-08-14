const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
          // title: args.title,
          // description: args.description
        }
      },
      info
    );

    return item;
  }
};

module.exports = Mutations;
