module.exports = {
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      );
  },
  editIcon: function (productUser, loggedUser, productId, floating = true) {
    if (productUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/products/edit/${productId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/stories/edit/${productId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return "";
    }
  },
  number_format: (product_amount) => {
    return parseFloat(product_amount);
  },
  stripTags: (product_description) => {
    return product_description.replace(/<(?:.|\n)*?>/gm, "");
  },
  truncate: (product_description) => {
    return product_description.substring(0, 50) + "...";
  },
};
