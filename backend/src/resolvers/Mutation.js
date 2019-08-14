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
  },

  async updateItem(parent, args, ctx, info) {
    // first take a copy of the update
    const updates = { ...args };

    // remove ID from update
    delete updates.id;

    // run the update method
    const newItem = await ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );

    return newItem;
  },

  async deleteItem(parent, args, ctx, info) {
    const where = {id: args.id};
    
    // find item
    const item = await ctx.db.query.item({where}, `{id, title}`)
    // check if they own that item or have permission
    // TODO

    // delete it
    return ctx.db.mutation.deleteItem({where}, info);
  }
};

module.exports = Mutations;
