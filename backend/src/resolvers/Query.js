const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }

  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },

  async users(parent, args, ctx, info) {
    // check if user has permissions to query all users
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // if they do, query all users
    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    //make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You need to log in');
    }

    // query current order
    const order = await ctx.db.query.order(
      {
        where: {
          id: args.id
        }
      },
      info
    );

    // check if they have permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      'ADMIN'
    );

    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error('You cannot see this');
    }

    // return the order
    return order;
  }
};

module.exports = Query;
